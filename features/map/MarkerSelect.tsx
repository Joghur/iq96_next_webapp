import L from 'leaflet';
import { FC, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

import { MarkerData } from '@features/map/Map';
import Select, { SelectGroup } from '@components/Select';

interface Props {
  markers: MarkerData[];
  paramPlace?: string | null;
}

export const MarkerSelect: FC<Props> = ({ markers, paramPlace }) => {
  const map = useMap();

  let marker: MarkerData | undefined;
  if (markers.length > 0) {
    if (paramPlace) {
      const paramMarker = markers.filter(
        (_marker) => _marker.nick === paramPlace
      );
      marker = paramMarker[0] || markers[0];
    } else {
      marker = markers[0];
    }
  }

  const [center, setCenter] = useState([
    marker ? marker.location.latitude : 0,
    marker ? marker.location.longitude : 0,
  ]);

  const [selection, setSelection] = useState<string | undefined>(
    marker && marker.nick
  );

  const handleSelectChange = (event: string) => {
    const selectedMarker = markers.filter(
      (d: MarkerData) => d.nick === event
    )[0];
    setCenter(() => [
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

  const lat = Boolean(markers.length > 0) && markers[0].location.latitude;

  useEffect(() => {
    if (markers.length > 0) {
      setCenter(() => [
        marker ? marker.location.latitude : 0,
        marker ? marker.location.longitude : 0,
      ]);
    }
  }, [markers, lat]);

  const appMarkers = markers
    ?.filter((o) => o.madeBy === 'app')
    .map((s) => s.nick);
  const userMarkers = markers?.filter((o) => o.madeBy === 'user');
  const restaurantMarkers = userMarkers
    ?.filter((o) => o.type === 'restaurant')
    .map((s) => s.nick);
  const barMarkers = userMarkers
    ?.filter((o) => o.type === 'bar')
    .map((s) => s.nick);
  const restMarkers = userMarkers
    ?.filter((o) => o.type !== 'bar' && o.type !== 'restaurant')
    .map((s) => s.nick);

  const selectGroups: SelectGroup[] = [
    { label: 'IQ96 steder', groupItems: appMarkers },
    { label: 'Restauranter', groupItems: restaurantMarkers },
    { label: 'Barer', groupItems: barMarkers },
    { label: 'Andre steder', groupItems: restMarkers },
  ];

  return (
    <Select
      value={selection}
      defaultValue={selection}
      placeholder="IQ steder"
      groups={selectGroups}
      onChange={handleSelectChange}
    />
  );
};

export default MarkerSelect;
