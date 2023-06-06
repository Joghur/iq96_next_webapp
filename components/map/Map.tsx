"use client";

import L, { Icon, LatLngExpression } from "leaflet";
import { ChangeEvent, useContext } from "react";

import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdMyLocation } from "react-icons/md";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";

import FlyToSelector from "./FlyToSelector";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useFirestore } from "@lib/hooks/useFirestore";
import { authContext } from "@lib/store/auth-context";

interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MarkerData {
  id: string;
  location: Coordinate;
  description: string;
  madeBy: string;
  nick: string;
  title: string;
  type: string;
}

type MarkerType =
  | "bar"
  | "bus"
  | "cafe"
  | "hotel"
  | "museum"
  | "music"
  | "question"
  | "restaurant"
  | "sightseeing"
  | "tour"
  | "train";

const handleDocType = (docType: MarkerType, madeBy: string) => {
  switch (madeBy) {
    case "app":
      return `${docType}_red`;

    default:
      return docType;
  }
};

function UserMapButton() {
  const map = useMapEvents({
    locationfound: (location) => {
      map.flyTo(location.latlng, map.getZoom());
    },
  });

  const handleFlyToUserLocation = () => {
    map.locate();
  };

  return (
    <button
      className="z-1000 btn rounded-full shadow-xl ring-2"
      onClick={handleFlyToUserLocation}
    >
      <MdMyLocation />
    </button>
  );
}

const MapPage = () => {
  const { authUser, documentUser, loading } = useContext(authContext);
  const {
    docs: markers,
    loading: markerLoading,
    updatingDoc,
    deletingDoc,
  } = useFirestore<MarkerData>("map", "type", "asc", 256);
  const [userPosition, setUserPosition] = useState<
    LatLngExpression | undefined
  >(undefined);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<MarkerData | undefined>(
    undefined
  );

  useEffect(() => {
    if (authUser && navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state !== "denied") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setUserPosition(
                  L.latLng(position.coords.latitude, position.coords.longitude)
                );
              },
              (error) => console.error(error)
            );
          }
        });
    }
  }, [authUser]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    return null;
    // router.replace('/');
  }

  if (markerLoading) {
    return <LoadingSpinner text={"Henter markører..."} />;
  }

  const handleOpenEditMarker = (marker: MarkerData) => {
    setShowEdit(true);
    setCurrentMarker(marker);
  };

  const handleOpenDeleteModal = (marker: MarkerData) => {
    setShowDelete(true);
    setCurrentMarker(marker);
  };

  const handleDeleteMarker = () => {
    if (currentMarker?.id) {
      deletingDoc(currentMarker.id);
    }
    setShowDelete(false);
    setCurrentMarker(undefined);
  };

  const handleChangeMarker = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;

    setCurrentMarker((old) => {
      if (old) {
        return {
          ...old,
          [id]: value,
        };
      }
    });
  };

  const handleSubmitMarker = () => {
    if (currentMarker?.id) {
      updatingDoc(currentMarker.id, { ...currentMarker });
    }
    setShowEdit(false);
    setCurrentMarker(undefined);
  };

  const canEdit = documentUser?.isSuperAdmin || false;

  function compare1(a: any, b: any) {
    if (a.nick < b.nick) {
      return -1;
    }
    if (a.nick > b.nick) {
      return 1;
    }
    return 0;
  }

  markers?.sort(compare1);
  const appMarkers = markers?.filter((o) => o.madeBy === "app");
  const userMarkers = markers?.filter((o) => o.madeBy === "user");
  let appFirstMarkers: MarkerData[] = [];
  if (userMarkers && appMarkers) {
    appFirstMarkers = appMarkers.concat(userMarkers);
  }

  const startLocation = userPosition || L.latLng(55.6660739, 12.5256102);

  return (
    <div className="relative">
      <MapContainer
        center={startLocation}
        zoom={20}
        style={{ height: `100vh`, width: "100wh", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userPosition && (
          <>
            <Marker
              position={userPosition}
              icon={
                new Icon({
                  iconUrl: documentUser?.avatar
                    ? `/images/avatars/${documentUser.avatar}.png`
                    : "/images/markers/marker-icon.png",
                  iconSize: [25, 25],
                  iconAnchor: [18, 18],
                  popupAnchor: [0, -10],
                })
              }
            >
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1}>
                {documentUser?.nick}
              </Tooltip>
            </Marker>
            <div className="absolute right-2 top-[50vh]">
              <UserMapButton />
            </div>
          </>
        )}
        <div className="z-10000 absolute right-2 top-2 shadow-xl">
          <div className="flex flex-col gap-1 sm:flex-row">
            {/* {appFirstMarkers.length > 0 && (
              <FlyToSelector label="Vælg by" markers={appFirstMarkers} />
            )} */}
            {appFirstMarkers.length > 0 && (
              <FlyToSelector label="IQ96 steder" markers={appFirstMarkers} />
            )}
          </div>
        </div>
        {appFirstMarkers.length > 0 &&
          appFirstMarkers.map((marker, index) => (
            <div key={`first${index}`} className="ring-3">
              <Marker
                key={index}
                position={[marker.location.latitude, marker.location.longitude]}
                icon={
                  new Icon({
                    iconUrl: `/images/markers/${handleDocType(
                      marker.type as MarkerType,
                      marker.madeBy
                    )}.png`,
                    shadowUrl: `/images/markers/marker-shadow.png`,
                    iconSize: [25, 35],
                    iconAnchor: [18, 27],
                    shadowSize: [25, 35],
                    shadowAnchor: [14, 26],
                    popupAnchor: [0, -10],
                  })
                }
              >
                <Popup
                  closeOnClick={false} // Do not remove
                  closeOnEscapeKey={true} // Do not remove
                  closeButton={true}
                  className="z-1000"
                >
                  <div>
                    {!showEdit && !showDelete && (
                      <div>
                        <p className="dynamic_text">{marker.title}</p>
                        <p className="dynamic_text">{marker.description}</p>
                        <div className="stack_row items-center justify-center gap-3">
                          {documentUser?.nick === "Redacteur" && (
                            <button
                              onClick={() => handleOpenDeleteModal(marker)}
                              className="btn-error btn-xs btn"
                            >
                              <MdDelete />
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenEditMarker(marker)}
                            className="btn-warning btn-sm btn"
                          >
                            <MdEdit />
                          </button>
                        </div>
                      </div>
                    )}
                    {showDelete && canEdit && currentMarker && (
                      <div>
                        <p className="text-lg">
                          Er du sikker på du vil slette markør?
                        </p>
                        <p>Denne handling kan ikke ændres.</p>
                        <div className="stack_row justify-between">
                          <button
                            onClick={() => setShowDelete(false)}
                            className="btn-error btn-outline btn-sm btn"
                          >
                            Fortryd
                          </button>
                          <button
                            onClick={handleDeleteMarker}
                            className="btn-success btn-sm btn"
                          >
                            Slet
                          </button>
                        </div>
                      </div>
                    )}
                    {showEdit && canEdit && currentMarker && (
                      <div>
                        <div className="pt-5">
                          <label
                            htmlFor="password"
                            className="dynamic_text green_gradient mb-2 block font-medium"
                          >
                            Titel
                          </label>
                          <textarea
                            id="title"
                            value={currentMarker?.title}
                            onChange={handleChangeMarker}
                            placeholder={currentMarker?.title || "Titel"}
                            className="dynamic_text textarea-bordered textarea"
                          />
                        </div>
                        <div className="pt-5">
                          <label
                            htmlFor="password"
                            className="dynamic_text green_gradient mb-2 block font-medium"
                          >
                            Nick
                          </label>
                          <textarea
                            id="nick"
                            value={currentMarker?.nick}
                            onChange={handleChangeMarker}
                            placeholder={currentMarker?.title || "Nick"}
                            className="dynamic_text textarea-bordered textarea"
                          />
                        </div>
                        <div className="pt-5">
                          <label
                            htmlFor="password"
                            className="dynamic_text green_gradient mb-2 block font-medium"
                          >
                            Type
                          </label>
                          <textarea
                            id="madeBy"
                            value={currentMarker?.madeBy}
                            onChange={handleChangeMarker}
                            placeholder={
                              currentMarker?.madeBy || "Type: app eller user"
                            }
                            className="dynamic_text textarea-bordered textarea"
                          />
                        </div>
                        <div className="pt-5">
                          <label
                            htmlFor="password"
                            className="dynamic_text green_gradient mb-2 block font-medium"
                          >
                            Beskrivelse
                          </label>
                          <textarea
                            id="description"
                            value={currentMarker?.description}
                            onChange={handleChangeMarker}
                            placeholder={
                              currentMarker?.description || "Beskrivelse"
                            }
                            className="dynamic_text textarea-bordered textarea"
                          />
                        </div>
                        <div className="stack_row justify-between pt-5">
                          <button
                            onClick={() => setShowEdit(false)}
                            color={"error"}
                            className="btn-error btn-outline btn-sm btn"
                          >
                            Fortryd
                          </button>
                          <button
                            onClick={handleSubmitMarker}
                            className="btn-info btn-sm btn"
                          >
                            Ændr
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Popup>
                <Tooltip direction="bottom" offset={[0, 20]} opacity={1}>
                  {marker.nick}
                </Tooltip>
              </Marker>
            </div>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
