"use client";

import L, { LatLngExpression } from "leaflet";
import { useContext } from "react";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import FlyToSelector from "./FlyToSelector";
import MoiMarkers from "./MoiMarkers";
import UserMapButton from "./UserMapButton";
import UserMarker from "./UserMarker";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useFirestore } from "@lib/hooks/useFirestore";
import { authContext } from "@lib/store/auth-context";
import { compareNick } from "@lib/utils";

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

  if (!authUser || !documentUser) {
    return null;
  }

  if (markerLoading) {
    return <LoadingSpinner text={"Henter markører..."} />;
  }
  const canEdit = documentUser?.isSuperAdmin || false;

  markers?.sort(compareNick);
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
            <UserMarker
              documentUser={documentUser}
              userPosition={userPosition}
            />
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
            <MoiMarkers
              key={index}
              index={index}
              marker={marker}
              documentUser={documentUser}
              canEdit={canEdit}
              updatingDoc={updatingDoc}
              deletingDoc={deletingDoc}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
