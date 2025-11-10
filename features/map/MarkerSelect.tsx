"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@components/ui/select";
import type { MarkerData } from "@features/map/Map";
import { cn } from "@lib/utils";
import L from "leaflet";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

interface Props {
	markers: MarkerData[];
	paramPlace?: string | null;
}

export const MarkerSelect: FC<Props> = ({ markers, paramPlace }) => {
	const map = useMap();
	const [center, setCenter] = useState<[number, number]>([0, 0]);
	const [selection, setSelection] = useState<string | undefined>();

	// Find initial marker
	let initialMarker: MarkerData | undefined;
	if (markers.length > 0) {
		if (paramPlace) {
			initialMarker = markers.find((m) => m.nick === paramPlace) || markers[0];
		} else {
			initialMarker = markers[0];
		}
	}

	// Set initial center and selection
	useEffect(() => {
		if (initialMarker) {
			setCenter([
				initialMarker.location.latitude,
				initialMarker.location.longitude,
			]);
			setSelection(initialMarker.nick);
		}
	}, [initialMarker]);

	const handleSelectChange = (nick: string) => {
		const selectedMarker = markers.find((m) => m.nick === nick);
		if (selectedMarker) {
			setCenter([
				selectedMarker.location.latitude,
				selectedMarker.location.longitude,
			]);
			setSelection(nick);
		}
	};

	// Fly to selected marker
	useEffect(() => {
		if (center[0] !== 0 && center[1] !== 0) {
			map.flyTo(L.latLng(center[0], center[1]), 18, { duration: 2 });
		}
	}, [map, center]);

	// Update center if markers change
	useEffect(() => {
		if (markers.length > 0 && !paramPlace) {
			setCenter([markers[0].location.latitude, markers[0].location.longitude]);
			setSelection(markers[0].nick);
		}
	}, [markers, paramPlace]);

	// Group markers for select
	const appMarkers = markers.filter((o) => o.madeBy === "app");
	const userMarkers = markers.filter((o) => o.madeBy === "user");
	const restaurantMarkers = userMarkers.filter((o) => o.type === "restaurant");
	const barMarkers = userMarkers.filter((o) => o.type === "bar");
	const restMarkers = userMarkers.filter(
		(o) => o.type !== "bar" && o.type !== "restaurant",
	);

	const triggerClasses = cn(
		"bg-secondary text-secondary-foreground border-primary hover:bg-primary",
		"dark:bg-primary dark:text-primary-foreground dark:border-secondary dark:hover:bg-secondary"
	)
	return (
		<Select value={selection} onValueChange={handleSelectChange}>
			<SelectTrigger className={triggerClasses}>
				<SelectValue placeholder="IQ steder" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>IQ96 steder</SelectLabel>
					{appMarkers.map((marker) => (
						<SelectItem key={marker.nick} value={marker.nick}>
							{marker.nick}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Restauranter</SelectLabel>
					{restaurantMarkers.map((marker) => (
						<SelectItem key={marker.nick} value={marker.nick}>
							{marker.nick}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Barer</SelectLabel>
					{barMarkers.map((marker) => (
						<SelectItem key={marker.nick} value={marker.nick}>
							{marker.nick}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Andre steder</SelectLabel>
					{restMarkers.map((marker) => (
						<SelectItem key={marker.nick} value={marker.nick}>
							{marker.nick}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default MarkerSelect;
