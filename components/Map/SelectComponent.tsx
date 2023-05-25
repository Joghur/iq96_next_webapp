import { MarkerData } from '@components/Map/Map';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

export const FlyToSelector = ({ markers }: { markers: MarkerData[] }) => {
  const map = useMap();
  const [center, setCenter] = useState([
    markers[0].location.latitude,
    markers[0].location.longitude,
  ]);

  const handleSelectChange = (event: string) => {
    const selectedMarker = markers.filter(
      (d: MarkerData) => d.title === event,
    )[0];
    setCenter([
      selectedMarker.location.latitude,
      selectedMarker.location.longitude,
    ]);
  };

  useEffect(() => {
    const latlng = L.latLng(center[0], center[1]);
    map.flyTo(latlng, 18, {
      duration: 2,
    });
  }, [center[0]]);

  const appMarkers = markers?.filter(o => o.madeBy === 'app');
  const userMarkers = markers?.filter(o => o.madeBy === 'user');
  const restaurantMarkers = userMarkers?.filter(o => o.type === 'restaurant');
  const barMarkers = userMarkers?.filter(o => o.type === 'bar');
  const restMarkers = userMarkers?.filter(
    o => o.type !== 'bar' && o.type !== 'restaurant',
  );

  return (
    <select
      className="select select-bordered md:select-lg select-xs w-full max-w-xs"
      value={'IQ96 steder'}
      onChange={e => handleSelectChange(e.target.value)}>
      <option key={'iq-places'} disabled>
        IQ96 steder
      </option>
      {appMarkers.length > 0 &&
        appMarkers.map((option, index) => (
          <>
            <option key={`iq96-${index}`} value={option.title}>
              {option.nick}
            </option>
          </>
        ))}
      {barMarkers.length > 0 && (
        <>
          <option key={'empty1'} disabled></option>
          <option key={'bars'} disabled>
            Barer
          </option>
          {barMarkers.map((option, index) => (
            <>
              <option key={`bars-${index}`} value={option.title}>
                {option.nick}
              </option>
            </>
          ))}
        </>
      )}
      {restaurantMarkers.length > 0 && (
        <>
          <option key={'empty2'} disabled></option>
          <option key={'restaurants'} disabled>
            Restauranter
          </option>
          {restaurantMarkers.map((option, index) => (
            <>
              <option key={`restaurants-${index}`} value={option.title}>
                {option.nick}
              </option>
            </>
          ))}
        </>
      )}
      {restMarkers.length > 0 && (
        <>
          <option key={'empty3'} disabled></option>
          <option key={'others'} disabled>
            Andre steder
          </option>
          {restMarkers.map((option, index) => (
            <>
              <option key={`others-${index}`} value={option.title}>
                {option.nick}
              </option>
            </>
          ))}
        </>
      )}
    </select>
  );
};

export default FlyToSelector;
