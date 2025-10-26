'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';

// https://stackoverflow.com/questions/57704196/leaflet-with-next-js
// Update 2025-10-26
const Map = dynamic(() => import('@features/map/Map'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // This line is important. It's what prevents server-side render
});

const MapClient = () => <Map />;

export default MapClient;
