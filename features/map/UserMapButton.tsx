import { Button } from "@components/ui/button";
import { MdMyLocation } from "react-icons/md";
import { useMapEvents } from "react-leaflet";

const UserMapButton = () => {
	const map = useMapEvents({
		locationfound: (location) => {
			map.flyTo(location.latlng, map.getZoom());
		},
	});

	const handleFlyToUserLocation = () => {
		map.locate();
	};

	return (
		<Button
			className="z-50 rounded-full shadow-xl ring-2"
			onClick={handleFlyToUserLocation}
		>
			<MdMyLocation fontSize="large" />
		</Button>
	);
};

export default UserMapButton;
