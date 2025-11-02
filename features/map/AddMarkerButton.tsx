import type { NotificationDbType } from "@components/BottomNav";
import Modal from "@components/Modal";
import { Button } from "@components/ui/button";
import { useFirestore } from "@lib/hooks/useFirestore";
import L from "leaflet";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import type { MarkerData } from "./Map";

const initialMarker: MarkerData = {
	id: "",
	location: {
		latitude: 0,
		longitude: 0,
	},
	description: "Et hotel",
	madeBy: "app",
	nick: "Hotel",
	title: "test",
	type: "hotel",
};

interface Props {
	addingMarker: (document: MarkerData) => Promise<void>;
	userPosition: L.LatLngExpression;
}

const AddMarkerButton = ({ addingMarker, userPosition }: Props) => {
	const [open, setOpen] = useState(false);

	const toogleAddModal = async () => {
		console.log("Addbutton");
		setOpen((old) => !old);
	};

	return (
		<>
			<Button
				className="z-50 rounded-full shadow-xl ring-2"
				onClick={toogleAddModal}
			>
				<MdAdd fontSize="large" />
			</Button>
			<NewMarkerForm
				open={open}
				onClose={() => setOpen(() => false)}
				addingMarker={addingMarker}
				userPosition={userPosition}
			/>
		</>
	);
};

export default AddMarkerButton;

interface NewMarkerFormProps {
	open: boolean;
	onClose: () => void;
	addingMarker: (document: MarkerData) => Promise<void>;
	userPosition: L.LatLngExpression;
}

export const NewMarkerForm = ({
	open,
	onClose,
	addingMarker,
	userPosition,
}: NewMarkerFormProps) => {
	const [changedMarker] = useState<MarkerData>(initialMarker);

	const { addingDoc: addingMapBadge } = useFirestore<NotificationDbType>(
		"notification",
		"updatedAt",
	);

	const handleSubmit = async () => {
		const latLng = L.latLng(userPosition);
		await addingMarker({
			location: { latitude: latLng.lat, longitude: latLng.lng },
			description: changedMarker.description,
			madeBy: changedMarker.madeBy,
			nick: changedMarker.nick,
			title: changedMarker.title,
			type: changedMarker.type,
		});

		await addingMapBadge(
			{
				updatedAt: new Date(),
			},
			"kort",
		);
		onClose();
	};

	return (
		<Modal
			open={open}
			onOpenChange={onClose}
			title="Opret ny kort markør på din position"
		>
			<div>
				<div className="flex justify-between pt-5">
					<Button onClick={onClose} color={"error"} variant="destructive">
						Fortryd
					</Button>
					<Button onClick={handleSubmit} variant="outline">
						Opret
					</Button>
				</div>
			</div>
		</Modal>
	);
};
