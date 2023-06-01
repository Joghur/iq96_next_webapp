import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MarkerData } from '@components/map/Map';

export const FlyToSelector = ({ markers }: { markers: MarkerData[] }) => {
  const map = useMap();
  const [center, setCenter] = useState([
    markers[0].location.latitude || 0,
    markers[0].location.longitude || 0,
  ]);
  const [selection, setSelection] = useState('IQ96 steder');

  const handleSelectChange = (event: string) => {
    const selectedMarker = markers.filter(
      (d: MarkerData) => d.title === event,
    )[0];
    setCenter([
      selectedMarker.location.latitude,
      selectedMarker.location.longitude,
    ]);
    setSelection(() => event);
  };

  const centerLat = center[0];
  const centerLng = center[1];

  useEffect(() => {
    const latlng = L.latLng(centerLat, centerLng);
    map.flyTo(latlng, 18, {
      duration: 2,
    });
  }, [map, centerLat, centerLng]);

  const appMarkers = markers?.filter(o => o.madeBy === 'app');
  const userMarkers = markers?.filter(o => o.madeBy === 'user');
  const restaurantMarkers = userMarkers?.filter(o => o.type === 'restaurant');
  const barMarkers = userMarkers?.filter(o => o.type === 'bar');
  const restMarkers = userMarkers?.filter(
    o => o.type !== 'bar' && o.type !== 'restaurant',
  );

  return (
    <Select
      value={selection}
      onValueChange={value => handleSelectChange(value)}>
      <SelectTrigger className="w-[180px] bg-gray-50">
        <SelectValue placeholder="IQ96 steder" />
      </SelectTrigger>
      <SelectContent className="bg-gray-50">
        <SelectItem value="IQ96 steder" key={'iq-places'} disabled>
          IQ96 steder
        </SelectItem>
        {appMarkers.length > 0 &&
          appMarkers.map((item, index) => (
            <SelectItem key={`iq96-${index}`} value={item.title}>
              {item.nick}
            </SelectItem>
          ))}
        {barMarkers.length > 0 && (
          <>
            <SelectItem value={''} key={'empty1'} disabled></SelectItem>
            <SelectItem value={'Barer'} key={'bars'} disabled>
              Barer
            </SelectItem>
            {barMarkers.map((barItem, index) => (
              <>
                <SelectItem key={`bars-${index}`} value={barItem.title}>
                  {barItem.nick}
                </SelectItem>
              </>
            ))}
          </>
        )}
        {restaurantMarkers.length > 0 && (
          <>
            <SelectItem value={''} key={'restaurants'} disabled></SelectItem>
            <SelectItem value={'restaurants'} key={'restaurants'} disabled>
              Restauranter
            </SelectItem>
            {restaurantMarkers.map((restaurantItem, index) => (
              <>
                <SelectItem
                  key={`restaurants-${index}`}
                  value={restaurantItem.title}>
                  {restaurantItem.nick}
                </SelectItem>
              </>
            ))}
          </>
        )}
        {restMarkers.length > 0 && (
          <>
            <SelectItem value={''} key={'empty3'} disabled></SelectItem>
            <SelectItem value={'Andre steder'} key={'others'} disabled>
              Andre steder
            </SelectItem>
            {restMarkers.map((restItem, index) => (
              <>
                <SelectItem key={`others-${index}`} value={restItem.title}>
                  {restItem.nick}
                </SelectItem>
              </>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default FlyToSelector;
