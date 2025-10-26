"use client";

import type { NotificationDbType } from "@components/BottomNav";
import Select from "@components/Select";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { type DocumentUser, useFirestore } from "@lib/hooks/useFirestore";
import { Icon } from "leaflet";
import { type ChangeEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Tooltip as MapToolip, Marker, Popup } from "react-leaflet";
import type { MarkerData } from "./Map";

const markerTypes = [
	"bar",
	"bus",
	"cafe",
	"hotel",
	"museum",
	"music",
	"question",
	"restaurant",
	"sightseeing",
	"tour",
	"train",
	"unknown",
] as const;

export type MarkerType = (typeof markerTypes)[number];

const madeBys = ["app", "user"] as const;

type MadeByType = (typeof madeBys)[number];

const handleDocType = (docType: MarkerType, madeBy: MadeByType) => {
	switch (madeBy) {
		case "app":
			return `${docType}_red`;

		case "user":
			return `${docType}`;

		default:
			return "unknown";
	}
};

interface Props {
	index: number;
	marker: MarkerData;
	documentUser: DocumentUser;
	updatingDoc: (id: string, document: MarkerData) => Promise<void>;
	deletingDoc: (id: string) => Promise<void>;
}

const MoiMarkers = ({
	index,
	marker,
	documentUser,
	updatingDoc,
	deletingDoc,
}: Props) => {
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [currentMarker, setCurrentMarker] = useState<MarkerData | undefined>(
		undefined,
	);

	const { addingDoc: addingMapBadge } = useFirestore<NotificationDbType>(
		"notification",
		"updatedAt",
	);

	const handleOpenEditMarker = (marker: MarkerData) => {
		setShowEdit(() => true);
		setCurrentMarker(() => marker);
	};

	const handleOpenDeleteModal = (marker: MarkerData) => {
		setShowDelete(() => true);
		setCurrentMarker(() => marker);
	};

	const handleDeleteMarker = async () => {
		if (currentMarker?.id) {
			await deletingDoc(currentMarker.id);
		}
		setShowDelete(false);
		setShowEdit(false);
		setCurrentMarker(undefined);
	};

	const handleSubmitMarker = async () => {
		if (currentMarker?.id) {
			await updatingDoc(currentMarker.id, {
				...currentMarker,
				madeBy: !documentUser.isSuperAdmin ? "user" : currentMarker.madeBy,
				nick:
					currentMarker.nick ||
					`Kort label er påkrævet - ${Math.floor(Math.random() * 10000)}`,
			});
		}

		await addingMapBadge(
			{
				updatedAt: new Date(),
			},
			"kort",
		);
		setShowEdit(() => false);
		setCurrentMarker(() => undefined);
	};

	const handleChangeMarker = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const { id, value } = event.target;

		setCurrentMarker((old) => {
			if (old) {
				return {
					...old,
					nick: id === "title" ? old.title : old.nick,
					[id]: value,
				};
			}
		});
	};

	const handleChangeMadeBy = (event: MadeByType) => {
		setCurrentMarker((old) => {
			if (old) {
				return {
					...old,
					madeBy: event,
				};
			}
		});
	};

	const handleChangeMarkerIconType = (event: MarkerType) => {
		setCurrentMarker((old) => {
			if (old) {
				return {
					...old,
					type: event,
				};
			}
		});
	};

	const canEdit = true;
	const canDelete =
		documentUser.isAdmin || documentUser.isBoard || documentUser.isSuperAdmin;

	return (
		<div key={`first${index}`} className="ring-3">
			<Marker
				position={[marker.location.latitude, marker.location.longitude]}
				icon={
					new Icon({
						iconUrl: `/images/markers/${handleDocType(
							marker.type as MarkerType,
							marker.madeBy as MadeByType,
						)}.png`,
						shadowUrl: "/images/markers/marker-shadow.png",
						iconSize: [25, 35],
						iconAnchor: [18, 27],
						shadowSize: [25, 35],
						shadowAnchor: [14, 26],
						popupAnchor: [0, -10],
					})
				}
			>
				<Popup
					closeOnClick={false} // Do not remove
					closeOnEscapeKey={true} // Do not remove
					closeButton={true}
					className="z-30"
				>
					<div>
						{!showEdit && !showDelete && (
							<div>
								<p className="dynamic_text">{marker.title}</p>
								<p className="dynamic_text">{marker.description}</p>
								<div className="flex items-center justify-center gap-3">
									{canDelete && (
										<Button
											onClick={() => handleOpenDeleteModal(marker)}
											variant="destructive"
										>
											<MdDelete />
										</Button>
									)}
									{canEdit &&
										(documentUser.isSuperAdmin || marker.madeBy !== "app") && (
											<Button
												onClick={() => handleOpenEditMarker(marker)}
												variant="default"
											>
												<MdEdit />
											</Button>
										)}
								</div>
							</div>
						)}
						{showDelete && canDelete && currentMarker && (
							<div>
								<p className="text-lg">Er du sikker på du vil slette markør?</p>
								<p>Denne handling kan ikke ændres.</p>
								<div className="flex justify-between">
									<Button
										onClick={() => setShowDelete(false)}
										variant="secondary"
									>
										Fortryd
									</Button>
									<Button onClick={handleDeleteMarker} variant="destructive">
										Slet
									</Button>
								</div>
							</div>
						)}
						{showEdit && canEdit && currentMarker && (
							<div>
								<div className="pt-5">
									<label
										htmlFor="password"
										className="dynamic_text green_gradient mb-2 block font-medium"
									>
										Lang Titel
									</label>
									<Textarea
										id="title"
										value={currentMarker?.title}
										onChange={handleChangeMarker}
										placeholder={
											currentMarker?.title ||
											"Lang titel - Ses når man trykker på markør"
										}
										className="dynamic_text textarea-bordered textarea bg-white"
									/>
								</div>
								<div className="pt-5">
									<label
										htmlFor="password"
										className="dynamic_text green_gradient mb-2 block font-medium"
									>
										Kort Titel
									</label>
									<Textarea
										id="nick"
										value={currentMarker?.nick}
										onChange={handleChangeMarker}
										placeholder={
											currentMarker?.title || "Kort titel - Til dropdown menu"
										}
										className="dynamic_text textarea-bordered textarea bg-white"
									/>
								</div>
								<div className="pt-5">
									<label
										htmlFor="password"
										className="dynamic_text green_gradient mb-2 block font-medium"
									>
										Beskrivelse
									</label>
									<Textarea
										id="description"
										value={currentMarker?.description}
										onChange={handleChangeMarker}
										placeholder={currentMarker?.description || "Beskrivelse"}
										className="dynamic_text textarea-bordered textarea bg-white"
									/>
								</div>
								{documentUser.isSuperAdmin && (
									<div className="pt-5">
										<label
											htmlFor="password"
											className="dynamic_text green_gradient mb-2 block font-medium"
										>
											Lavet af
										</label>
										<Select
											value={currentMarker?.madeBy}
											placeholder={currentMarker?.madeBy}
											onChange={(e) => handleChangeMadeBy(e as MadeByType)}
											groups={[{ groupItems: madeBys }]}
										/>
									</div>
								)}
								<div className="pt-5">
									<label
										htmlFor="password"
										className="dynamic_text green_gradient mb-2 block font-medium"
									>
										Type
									</label>
									<Select
										value={currentMarker?.type}
										placeholder={currentMarker?.type}
										onChange={(e) =>
											handleChangeMarkerIconType(e as MarkerType)
										}
										groups={[{ groupItems: markerTypes }]}
									/>
								</div>
								<div className="flex justify-between pt-5">
									<Button onClick={() => setShowEdit(false)} variant="outline">
										Fortryd
									</Button>
									<Button onClick={handleSubmitMarker} variant="destructive">
										Ændr
									</Button>
								</div>
							</div>
						)}
					</div>
				</Popup>
				<MapToolip direction="bottom" offset={[0, 20]} opacity={1}>
					{marker.nick}
				</MapToolip>
			</Marker>
		</div>
	);
};

export default MoiMarkers;
