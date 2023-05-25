'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useContext } from 'react';
import { MdMyLocation, MdEdit, MdDelete } from 'react-icons/md';

import { authContext } from '@lib/store/auth-context';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L, { Icon, LatLngExpression } from 'leaflet';
import { useFirestore } from '@lib/hooks/useFirestore';
import SelectComponent, {
  FlyToSelector,
} from '@components/Map/SelectComponent';
import DynamicText from '@components/utility/DynamicText';

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
  | 'bar'
  | 'bus'
  | 'cafe'
  | 'hotel'
  | 'museum'
  | 'music'
  | 'question'
  | 'restaurant'
  | 'sightseeing'
  | 'tour'
  | 'train';

const handleDocType = (docType: MarkerType, madeBy: string) => {
  switch (madeBy) {
    case 'app':
      return `${docType}_red`;

    default:
      return docType;
  }
};

function UserMapButton() {
  const map = useMapEvents({
    locationfound: location => {
      map.flyTo(location.latlng, map.getZoom());
    },
  });

  const handleFlyToUserLocation = () => {
    map.locate();
  };

  return (
    <button className="btn" onClick={handleFlyToUserLocation}>
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
  } = useFirestore<MarkerData>('map', 'type');
  const router = useRouter();
  const [userPosition, setUserPosition] = useState<
    LatLngExpression | undefined
  >(undefined);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<MarkerData | undefined>(
    undefined,
  );

  const small = false;

  useEffect(() => {
    if (authUser && navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(permissionStatus => {
          if (permissionStatus.state !== 'denied') {
            navigator.geolocation.getCurrentPosition(
              position => {
                setUserPosition(
                  L.latLng(position.coords.latitude, position.coords.longitude),
                );
              },
              error => console.error(error),
            );
          }
        });
    }
  }, [authUser]);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <div className="py-10">
          <p>Henter...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    router.replace('/');
  }

  if (markerLoading) {
    return (
      <div className="flex flex-col items-center">
        <div className="py-10">
          <p>Henter Markører...</p>
        </div>
      </div>
    );
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
    console.log(' id, value ', id, value);
    setCurrentMarker(old => {
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
  const appMarkers = markers?.filter(o => o.madeBy === 'app');
  const userMarkers = markers?.filter(o => o.madeBy === 'user');
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
        style={{ height: `100vh`, width: '100wh', zIndex: 0 }}>
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
                  iconUrl: `/images/avatars/${
                    documentUser?.avatar || 'marker-icon'
                  }.png`,
                  iconSize: [25, 25],
                  iconAnchor: [18, 18],
                  popupAnchor: [0, -10],
                })
              }>
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1}>
                {documentUser?.nick}
              </Tooltip>
            </Marker>
            <div className="absolute top-[50vh] right-2 shadow-xl z-1000">
              <UserMapButton />
            </div>
          </>
        )}
        <div className="absolute top-2 right-2 shadow-xl">
          {appFirstMarkers.length > 0 && (
            <FlyToSelector markers={appFirstMarkers} />
          )}
        </div>
        {appFirstMarkers.length > 0 &&
          appFirstMarkers.map((marker, index) => (
            <div className="ring-3">
              <Marker
                key={index}
                position={[marker.location.latitude, marker.location.longitude]}
                icon={
                  new Icon({
                    iconUrl: `/images/markers/${handleDocType(
                      marker.type as MarkerType,
                      marker.madeBy,
                    )}.png`,
                    iconSize: [35, 35],
                    iconAnchor: [18, 18],
                    popupAnchor: [0, -10],
                  })
                }>
                <Popup
                  closeOnClick={false} // Do not remove
                  closeOnEscapeKey={true} // Do not remove
                  closeButton={true}
                  className="z-1000">
                  <div>
                    {!showEdit && !showDelete && (
                      <div>
                        <DynamicText>{marker.title}</DynamicText>
                        <DynamicText>{marker.description}</DynamicText>
                        <div className="stack_row gap-3 justify-center items-center">
                          {documentUser?.nick === 'Redacteur' && (
                            <button
                              onClick={() => handleOpenDeleteModal(marker)}
                              className="btn btn-xs btn-error">
                              <MdDelete />
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenEditMarker(marker)}
                            className="btn btn-sm btn-warning">
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
                            className="btn btn-sm btn-error btn-outline">
                            Fortryd
                          </button>
                          <button
                            onClick={handleDeleteMarker}
                            className="btn btn-success btn-sm">
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
                            className="block green_gradient font-medium mb-2">
                            Titel
                          </label>
                          <textarea
                            id="title"
                            value={currentMarker?.title}
                            onChange={handleChangeMarker}
                            placeholder={currentMarker?.title || 'Titel'}
                            className="textarea textarea-bordered text-white"
                          />
                        </div>
                        <div className="pt-5">
                          <label
                            htmlFor="password"
                            className="block green_gradient font-medium mb-2">
                            Nick
                          </label>
                          <textarea
                            id="nick"
                            value={currentMarker?.nick}
                            onChange={handleChangeMarker}
                            placeholder={currentMarker?.title || 'Nick'}
                            className="textarea textarea-bordered text-white"
                          />
                        </div>
                        <div className="pt-5">
                          <label
                            htmlFor="password"
                            className="block green_gradient font-medium mb-2">
                            Type
                          </label>
                          <textarea
                            id="madeBy"
                            value={currentMarker?.madeBy}
                            onChange={handleChangeMarker}
                            placeholder={
                              currentMarker?.madeBy || 'Type: app eller user'
                            }
                            className="textarea textarea-bordered text-white"
                          />
                        </div>
                        <div className="pt-5">
                          <label
                            htmlFor="password"
                            className="block green_gradient font-medium mb-2">
                            Beskrivelse
                          </label>
                          <textarea
                            id="description"
                            value={currentMarker?.description}
                            onChange={handleChangeMarker}
                            placeholder={
                              currentMarker?.description || 'Beskrivelse'
                            }
                            className="textarea textarea-bordered text-white"
                          />
                        </div>
                        <div className="stack_row justify-between pt-5">
                          <button
                            onClick={() => setShowEdit(false)}
                            color={'error'}
                            className="btn btn-sm btn-error btn-outline">
                            Fortryd
                          </button>
                          <button
                            onClick={handleSubmitMarker}
                            className="btn btn-info btn-sm">
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
