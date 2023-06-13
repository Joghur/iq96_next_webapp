import { Icon, LatLngExpression } from "leaflet";
import React, { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { MarkerData } from "./Map";

interface Props {
  addingMarker: (document: MarkerData) => Promise<void>;
}

function ManualMarker({ addingMarker }: Props) {
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(
    null
  );

  function AddMarkerOnClick() {
    useMapEvents({
      dblclick: async (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition(() => [lat, lng]);
        await addingMarker({
          location: { latitude: lat, longitude: lng },
          description: "",
          madeBy: "user",
          nick: "",
          title: "",
          type: "",
        });
      },
    });

    return markerPosition === null ? null : (
      <Marker
        position={markerPosition}
        icon={
          new Icon({
            iconUrl: `/images/markers/marker-icon.png`,
            shadowUrl: `/images/markers/marker-shadow.png`,
            iconSize: [25, 35],
            iconAnchor: [18, 27],
            shadowSize: [25, 35],
            shadowAnchor: [14, 26],
            popupAnchor: [0, -10],
          })
        }
      />
    );
  }

  return <AddMarkerOnClick />;
}

export default ManualMarker;
