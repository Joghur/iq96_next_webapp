import dynamic from 'next/dynamic';

import LoadingSpinner from '@components/ui/LoadingSpinner';
import PageLayout from '@components/ui/PageLayout';

// https://stackoverflow.com/questions/57704196/leaflet-with-next-js
function MapPage() {
  const Map = dynamic(() => import('@components/map/Map'), {
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
