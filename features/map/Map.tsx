'use client';

import L, { LatLngExpression } from 'leaflet';
import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { handleStartTheme } from '@features/member/ThemeToggle';
import { useCityData, useMapData } from '@lib/hooks/useFirestore';
import { authContext } from '@lib/store/auth-context';
import { compareNick } from '@lib/utils';

import AddCityButton, { MapCityType } from './AddCityButton';
import AddMarkerButton from './AddMarkerButton';
import CitySelect from './CitySelect';
import InfoButton from './InfoButton';
import ManualMarker from './ManualMarker';
import MarkerSelect from './MarkerSelect';
import MoiMarkers from './MoiMarkers';
import UserMapButton from './UserMapButton';
import UserMarker from './UserMarker';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from '@components/LoadingSpinner';
import { SavingBadgeStatusToLocalStorage } from '@components/BottomNav';

interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MarkerData {
  id?: string;
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
  const searchParams = useSearchParams();
  const [selectedCity, setSelectedCity] = useState<MapCityType>({
    city: '',
    year: '',
  });

  const { cities, loadingCities, addingCities } = useCityData('map');

  const {
    markers,
    loadingMarkers,
    addingMarker,
    updatingMarker,
    deletingMarker,
  } = useMapData<MarkerData>(
    'map',
    `${selectedCity.year}-${selectedCity.city}`
  );

  const [userPosition, setUserPosition] = useState<
    LatLngExpression | undefined
  >(undefined);

  useEffect(() => {
    if (cities && cities?.length > 0 && cities[0].includes('-')) {
      const yearCityParam = searchParams.get('aar-by');
      const initCity = yearCityParam?.split('-');
      if (initCity && initCity?.length > 1) {
        setSelectedCity(() => ({ city: initCity[1], year: initCity[0] }));
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const [year, city] = cities.reverse()[0]?.split('-');
        setSelectedCity(() => ({ city, year }));
      }
    }
  }, [cities]);

  useEffect(() => {
    handleStartTheme();
    SavingBadgeStatusToLocalStorage('kort');
  }, []);

  useEffect(() => {
    if (authUser && navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state !== 'denied') {
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
    return <LoadingSpinner text={'Henter byer...'} />;
  }

  if (loadingMarkers) {
    return <LoadingSpinner text={'Henter markører...'} />;
  }

  markers?.sort(compareNick);
  const appMarkers = markers?.filter((o) => o.madeBy === 'app');
  const userMarkers = markers?.filter((o) => o.madeBy === 'user');

  let appFirstMarkers: MarkerData[] = [];
  if (userMarkers && appMarkers) {
    appFirstMarkers = appMarkers.concat(userMarkers);
  }

  // const startLocation = paramPosition ||userPosition || L.latLng(55.6660739, 12.5256102);
  const startLocation = userPosition || L.latLng(55.6660739, 12.5256102);

  return (
    <div className="relative">
      <MapContainer
        center={startLocation}
        zoom={20}
        style={{ height: '100vh', width: '100wh', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="absolute right-2 top-[40vh]">
          <InfoButton documentUser={documentUser} />
        </div>
        {userPosition && (
          <>
            <UserMarker
              documentUser={documentUser}
              userPosition={userPosition}
            />
            <div className="absolute right-2 top-[50vh]">
              <UserMapButton />
            </div>
            <div className="absolute right-2 top-[70vh]">
              <AddMarkerButton
                addingMarker={addingMarker}
                userPosition={userPosition}
              />
            </div>
          </>
        )}

        {documentUser.isSuperAdmin && (
          <div className="absolute right-2 top-[60vh]">
            <AddCityButton
              selectedCity={selectedCity}
              addingCities={addingCities}
            />
          </div>
        )}
        <div className="z-10000 absolute right-2 top-2 shadow-xl">
          <div className="flex flex-col gap-1 sm:flex-row">
            {cities && cities?.length > 0 && (
              <CitySelect
                label="Vælg by"
                selected={selectedCity}
                cities={cities}
                onChange={setSelectedCity}
              />
            )}
            <MarkerSelect
              markers={appFirstMarkers}
              paramPlace={searchParams.get('sted')}
            />
          </div>
        </div>
        {appFirstMarkers.length > 0 &&
          appFirstMarkers.map((marker, index) => (
            <MoiMarkers
              key={index}
              index={index}
              marker={marker}
              documentUser={documentUser}
              updatingDoc={updatingMarker}
              deletingDoc={deletingMarker}
            />
          ))}
        <ManualMarker addingMarker={addingMarker} />
      </MapContainer>
    </div>
  );
};

export default MapPage;
