import type { DocumentUser } from "@lib/hooks/useFirestore";
import { Icon } from "leaflet";
import { Tooltip as MapToolip, Marker } from "react-leaflet";

interface Props {
	documentUser: DocumentUser;
	userPosition: L.LatLngExpression;
}

const UserMarker = ({ documentUser, userPosition }: Props) => {
	return (
		<Marker
			position={userPosition}
			icon={
				new Icon({
					iconUrl: documentUser?.avatar
						? `/images/avatars/${documentUser.avatar}.png`
						: "/images/markers/marker-icon.png",
					iconSize: [25, 25],
					iconAnchor: [18, 18],
					popupAnchor: [0, -10],
				})
			}
		>
			<MapToolip direction="bottom" offset={[0, 20]} opacity={1}>
				{documentUser?.nick}
			</MapToolip>
		</Marker>
	);
};

export default UserMarker;
