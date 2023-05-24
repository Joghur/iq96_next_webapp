import dynamic from 'next/dynamic';

// https://stackoverflow.com/questions/57704196/leaflet-with-next-js
function MapPage() {
  const Map = dynamic(() => import('@components/Map/Map'), {
    loading: () => <p>Henter....</p>,
    ssr: false, // This line is important. It's what prevents server-side render
  });
  return <Map />;
}

export default MapPage;
