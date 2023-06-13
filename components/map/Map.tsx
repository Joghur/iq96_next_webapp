"use client";

import L, { LatLngExpression } from "leaflet";
import { useContext } from "react";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import AddButton, { MapCityType } from "./AddButton";
import CitySelector from "./CitySelector";
import MarkerSelector from "./MarkerSelector";
import MoiMarkers from "./MoiMarkers";
import UserMapButton from "./UserMapButton";
import UserMarker from "./UserMarker";
import { handleStartTheme } from "@components/member/ThemeSelector";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useCityData, useMapData } from "@lib/hooks/useFirestore";
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

export interface CityData {
  city: string;
  year: string;
}

const MapPage = () => {
  const {
    authUser,
    documentUser,
    loading: loadingUser,
  } = useContext(authContext);

  const [selectedCity, setSelectedCity] = useState<MapCityType>({
    city: "",
    year: "",
  });

  const { cities, loadingCities, addingCities } = useCityData("map");

  const { markers, loadingMarkers, updatingMarker, deletingMarker } =
    useMapData<MarkerData>("map", `${selectedCity.year}-${selectedCity.city}`);

  const [userPosition, setUserPosition] = useState<
    LatLngExpression | undefined
  >(undefined);

  useEffect(() => {
    if (cities && cities?.length > 0 && cities[0].includes("-")) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [year, city] = cities.reverse()[0]?.split("-");
      setSelectedCity(() => ({ city, year }));
    }
  }, [cities]);

  useEffect(() => {
    handleStartTheme();
  }, []);

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

  if (loadingUser) {
    return <LoadingSpinner />;
  }

  if (!authUser || !documentUser) {
    return null;
  }

  if (loadingCities) {
    return <LoadingSpinner text={"Henter byer..."} />;
  }

  if (loadingMarkers) {
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

  console.log("cities", cities);
  console.log("markers", markers);

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

        {documentUser.isSuperAdmin && (
          <div className="absolute right-2 top-[60vh]">
            <AddButton
              selectedCity={selectedCity}
              addingCities={addingCities}
            />
          </div>
        )}
        <div className="z-10000 absolute right-2 top-2 shadow-xl">
          <div className="flex flex-col gap-1 sm:flex-row">
            {cities && cities?.length > 0 && (
              <CitySelector
                label="Vælg by"
                selected={selectedCity}
                cities={cities}
                onChange={setSelectedCity}
              />
            )}
            <MarkerSelector label="IQ96 steder" markers={appFirstMarkers} />
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
              updatingDoc={updatingMarker}
              deletingDoc={deletingMarker}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
