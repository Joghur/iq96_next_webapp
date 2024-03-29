import React from 'react';
import { useMapEvents } from 'react-leaflet';
import { MarkerData } from './Map';

interface Props {
  addingMarker: (document: MarkerData) => Promise<void>;
}

function ManualMarker({ addingMarker }: Props) {
  function AddMarkerOnClick() {
    useMapEvents({
      dblclick: async (e) => {
        const { lat, lng } = e.latlng;
        await addingMarker({
          location: { latitude: lat, longitude: lng },
          description: '',
          madeBy: 'user',
          nick: `Kort titel - Dukker op når man hover med mus eller trykker på telefon - ${Math.floor(Math.random() * 10000)}`,
          title: 'Lang titel - Dukker op når man trykker på lokation',
          type: 'unknown',
        });
      },
    });

    return <></>;
  }

  return <AddMarkerOnClick />;
}

export default ManualMarker;
