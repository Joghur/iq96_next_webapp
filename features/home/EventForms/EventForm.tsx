"use client";

import { CopyButton } from "@components/buttons/CopyButton";
import { SimpleDateTimePicker } from "@components/dates/SimpleDateTimePicker";
import CustomForm from "@components/form/CustomForm";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { confirmAction } from "@lib/utils";
import { type ChangeEvent, useState } from "react";
import DayEventsForm from "../DayEventForm";
import type { DayEvent, EventType } from "../EventsPage";
import { StatusSelect } from "../event-selects/StatusSelect";
import { TypeSelect } from "../event-selects/TypeSelect";

const initialEvent: EventType = {
	type: "tour",
	status: "pending",
	city: "Kokkedal",
	start: { date: "", time: "" },
	end: { date: "", time: "" },
	year: new Date().getFullYear(),
	dayEvents: [
		{
			dateString: "2025-09-28",
			entries: [
				{
					time: "11:00",
					label: "Mødes under uret, Hovedbanegården",
					type: "meetingPoint",
				},
				{ time: "12:30", label: "Hotel", type: "hotel" },
				{ time: "13:30", label: "Aktivitet", type: "activity" },
				{ time: "14:30", label: "Guided tour", type: "guidedTour" },
			],
		},
		{
			dateString: "2025-09-29",
			entries: [
				{ time: "16:30", label: "GF mødestart", type: "meeting" },
				{ time: "19:30", label: "Cantinos & Centerpubben", type: "bar" },
			],
		},
	],
};

interface Props {
	event?: EventType;
	editable?: boolean;
	onClose: () => void;
	onUpdate: (id: string, document: EventType) => Promise<void>;
	onAdding: (document: EventType) => Promise<void>;
	onDelete: (id: string) => Promise<void>;
}

const EventForm = ({
	event,
	onClose,
	editable = true,
	onUpdate,
	onAdding,
	onDelete,
}: Props) => {
	const [changedEvent, setChangingEvent] = useState<EventType>(
		event || initialEvent,
	);

	const isNew = !event?.id;

	const handleChange = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		if (event) {
			const { id, value } = event.target;

			setChangingEvent((oldEvent) => ({
				...oldEvent,
				[id]: value,
			}));
		}
	};

	// const handleDateTimeChange = (
	//   property: 'start' | 'end',
	//   dateTime: { date: string; time: string }
	// ) => {
	//   setChangingEvent((oldEvent) => ({
	//     ...oldEvent,
	//     [property]: dateTime,
	//   }));
	// };

	const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id } = event.target;

		setChangingEvent((prevData) => ({
			...prevData,
			[id]: !prevData[id as keyof EventType],
		}));
	};

	const handleDelete = async (id: string | undefined) => {
		if (!id) return;

		const confirmed = await confirmAction("Er du sikker på, at du vil slette?");
		if (confirmed) {
			await onDelete(id);
			onClose();
		}
	};

	const handleSubmit = async () => {
		if (!editable || !changedEvent) return;

		try {
			if (isNew && onAdding) {
				await onAdding?.(changedEvent);
			} else if (!isNew && changedEvent.id && onUpdate) {
				await onUpdate?.(changedEvent.id, changedEvent);
			}
			onClose();
		} catch (error) {
			console.error("Opdatering fejlede:", error);
		}
	};

	const actionButtons = [
		<Button
			onClick={() => handleDelete(event?.id)}
			color={"error"}
			disabled={!event?.id}
			variant="destructive"
			size="sm"
			key="delete-button"
		>
			Slet
		</Button>,
		<Button
			onClick={onClose}
			color={"error"}
			variant="secondary"
			size="sm"
			key="cancel-button"
		>
			Fortryd
		</Button>,
		<Button
			variant="default"
			onClick={handleSubmit}
			size="sm"
			key="submit-button"
		>
			{isNew ? "Opret" : "Opdatér"}
		</Button>,
	];

	return (
		<CustomForm
			title={isNew ? "Opret ny begivenhed" : "Opdatér begivenhed"}
			actionButtons={actionButtons}
			onClose={onClose}
		>
			<div className="pt-24">
				<StatusSelect event={changedEvent} onChange={handleChange} />
				<TypeSelect event={changedEvent} onChange={handleChange} />
				<div className="flex flex-row justify-between">
					<div className="flex items-center mt-4">
						<input
							type="checkbox"
							id="showInfoLink"
							className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
							checked={changedEvent.showInfoLink}
							onChange={handleToggle}
						/>
						<label
							htmlFor="infolink"
							className="dynamic_text ml-2 block text-sm"
						>
							Vis Infolink
						</label>
					</div>{" "}
					<div className="flex items-center mt-4">
						<input
							type="checkbox"
							id="showMapLink"
							className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
							checked={changedEvent.showMapLink}
							onChange={handleToggle}
						/>
						<label
							htmlFor="maplink"
							className="dynamic_text ml-2 block text-sm"
						>
							Vis MapLink
						</label>
					</div>{" "}
					<div className="flex items-center mt-4">
						<input
							type="checkbox"
							id="showUploadButton"
							className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
							checked={changedEvent.showUploadButton}
							onChange={handleToggle}
						/>
						<label
							htmlFor="uploadButton"
							className="dynamic_text ml-2 block text-sm"
						>
							Vis Upload Button
						</label>
					</div>
				</div>
				<div className="pt-5">
					<label
						htmlFor="city"
						className="dynamic_text green_gradient mb-2 block font-medium"
					>
						By
					</label>
					<Textarea
						id="city"
						value={changedEvent.city}
						onChange={handleChange}
						placeholder={changedEvent?.city || "By"}
						className="dynamic_text textarea-bordered textarea"
					/>
				</div>
				<div className="pt-5">
					<label
						htmlFor="start"
						className="dynamic_text green_gradient mb-2 block font-medium"
					>
						Start dato
					</label>
					<div className="flex flex-col gap-2">
						<SimpleDateTimePicker
							value={changedEvent.start}
							onChange={(value) =>
								setChangingEvent((prev) => ({
									...prev,
									start: value,
								}))
							}
							showPreview
						/>
						<div className="flex gap-2">
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									setChangingEvent((prev) => ({
										...prev,
										start: { ...prev.start, date: "" },
									}))
								}
							>
								Ryd dato
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									setChangingEvent((prev) => ({
										...prev,
										start: { ...prev.start, time: "" },
									}))
								}
							>
								Ryd tid
							</Button>
						</div>
					</div>
				</div>
				<div className="pt-5">
					<label
						htmlFor="end"
						className="dynamic_text green_gradient mb-2 block font-medium"
					>
						Slut dato
					</label>
					<div className="flex flex-col gap-2">
						<SimpleDateTimePicker
							value={changedEvent.end}
							onChange={(value) =>
								setChangingEvent((prev) => ({
									...prev,
									end: value,
								}))
							}
							showPreview
						/>
						<div className="flex gap-2">
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									setChangingEvent((prev) => ({
										...prev,
										end: { ...prev.end, date: "" },
									}))
								}
							>
								Ryd dato
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									setChangingEvent((prev) => ({
										...prev,
										end: { ...prev.end, time: "" },
									}))
								}
							>
								Ryd tid
							</Button>
						</div>
					</div>
				</div>
				<div className="pt-5">
					<label
						htmlFor="notes"
						className="dynamic_text green_gradient mb-2 block font-medium"
					>
						OBS!
					</label>
					<Textarea
						id="notes"
						value={changedEvent.notes}
						onChange={handleChange}
						placeholder={changedEvent?.notes || "Slut"}
						className="dynamic_text textarea-bordered textarea"
					/>
				</div>
				<div className="mt-4">
					<label
						htmlFor="dayEvents"
						className="dynamic_text green_gradient mb-2 block font-medium"
					>
						Aktiviteter
					</label>
					<DayEventsForm
						dayEvents={sortDayEvents(changedEvent.dayEvents)}
						onChange={(updated) => {
							setChangingEvent((oldEvent) => ({
								...oldEvent,
								dayEvents: sortDayEvents(updated),
							}));
						}}
					/>
				</div>
				<div className="pt-5">
					<label
						htmlFor="notesActivities"
						className="dynamic_text green_gradient mb-2 block font-medium"
					>
						OBS. Aktiviteter
					</label>
					<Textarea
						id="notesActivities"
						value={changedEvent.notesActivities}
						onChange={handleChange}
						placeholder={changedEvent?.notesActivities || "OBS! aktiviteter"}
						className="dynamic_text textarea-bordered textarea"
					/>
				</div>

				<div className="flex flex-col gap-2 mt-5">
					<div className="dynamic_text">
						Brug &quot;--&quot; til at separere emner
					</div>
					<div className="dynamic_text">
						<CopyButton text="<link:hotel>" />
					</div>
					<div className="dynamic_text">
						<CopyButton text="<link:middag>" />
					</div>
					<div className="dynamic_text">
						<CopyButton text="<link:frokost>" />
					</div>
					<div className="dynamic_text">
						<CopyButton text="<link:tour>" />
					</div>
					<div className="dynamic_text">
						<CopyButton text="<link:gf>" />
					</div>
					<div className="dynamic_text">
						<CopyButton text="<link:extra:Depeche Mode:bar>" />
					</div>
				</div>
			</div>
		</CustomForm>
	);
};

export default EventForm;

export function sortDayEvents(dayEvents: DayEvent[]): DayEvent[] {
	return [...dayEvents]
		.sort((a, b) => a.dateString.localeCompare(b.dateString))
		.map((day) => ({
			...day,
			entries: [...day.entries].sort((a, b) => a.time.localeCompare(b.time)),
		}));
}
