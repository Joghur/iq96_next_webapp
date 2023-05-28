import HeaderNavbar from '@components/layout/HeaderNavBar';
import PageLayout from '@components/layout/PageLayout';
import LoadingSpinner from '@components/utility/LoadingSpinner';
import dynamic from 'next/dynamic';

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
