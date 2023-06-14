import L from "leaflet";
import React, { FC, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { MarkerData } from "@components/map/Map";
import Select, { SelectGroup } from "@components/ui/Select";

interface Props {
  markers: MarkerData[];
}

export const MarkerSelect: FC<Props> = ({ markers }) => {
  const map = useMap();

  // TODO - logic needs some rewiring
  const [center, setCenter] = useState([
    markers.length > 0 ? markers[0].location.latitude : 0,
    markers.length > 0 ? markers[0].location.longitude : 0,
  ]);

  const [selection, setSelection] = useState<string | undefined>(
    markers[0]?.title
  );

  const handleSelectChange = (event: string) => {
    const selectedMarker = markers.filter(
      (d: MarkerData) => d.title === event
    )[0];
    setCenter(() => [
      selectedMarker.location.latitude,
      selectedMarker.location.longitude,
    ]);
    console.log("event", event);
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
        markers[0].location.latitude,
        markers[0].location.longitude,
      ]);
    }
  }, [markers, lat]);

  const appMarkers = markers
    ?.filter((o) => o.madeBy === "app")
    .map((s) => s.title);
  const userMarkers = markers?.filter((o) => o.madeBy === "user");
  const restaurantMarkers = userMarkers
    ?.filter((o) => o.type === "restaurant")
    .map((s) => s.title);
  const barMarkers = userMarkers
    ?.filter((o) => o.type === "bar")
    .map((s) => s.title);
  const restMarkers = userMarkers
    ?.filter((o) => o.type !== "bar" && o.type !== "restaurant")
    .map((s) => s.title);

  const selectGroups: SelectGroup[] = [
    { label: "IQ96 steder", groupItems: appMarkers },
    { label: "Restauranter", groupItems: restaurantMarkers },
    { label: "Barer", groupItems: barMarkers },
    { label: "Andre steder", groupItems: restMarkers },
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
