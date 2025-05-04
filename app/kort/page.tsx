import dynamic from 'next/dynamic';

import LoadingSpinner from '@features/ui/LoadingSpinner';
import PageLayout from '@features/ui/PageLayout';

// https://stackoverflow.com/questions/57704196/leaflet-with-next-js
function MapPage() {
  const Map = dynamic(() => import('@features/map/Map'), {
    loading: () => <LoadingSpinner />,
    ssr: false, // This line is important. It's what prevents server-side render
  });
  return (
    <PageLayout>
      <Map />
    </PageLayout>
  );
}

export default MapPage;
