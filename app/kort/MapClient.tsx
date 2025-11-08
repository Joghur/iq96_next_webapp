"use client";

import LoadingSpinner from "@components/LoadingSpinner";
import dynamic from "next/dynamic";

// https://stackoverflow.com/questions/57704196/leaflet-with-next-js
// Update 2025-10-26
const MapClient = dynamic(() => import("@features/map/Map"), {
	loading: () => <LoadingSpinner />,
	ssr: false, // This line is important. It's what prevents server-side render
});

export default MapClient;
