"use client";

import ActionHeader from "@components/ActionHeader";
import { FormInput } from "@components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEvent } from "actions/event";
import { useFieldArray, useForm } from "react-hook-form";
import { eventSchema } from "schemas/event";
import { toast } from "sonner";
import type { z } from "zod";
import type { DayEvent, EventType } from "../EventsPage";

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
	const form = useForm({
		resolver: zodResolver(eventSchema),
		defaultValues: initialEvent,
	});

	const {
		fields: dayEvents,
		append: addDayEvents,
		remove: removeDayEvents,
	} = useFieldArray({
		control: form.control,
		name: "dayEvents",
	});

	async function onSubmit(data: z.infer<typeof eventSchema>) {
		const res = await createEvent(data);

		if (res.success) {
			form.reset();
			toast.success("Project created successfully!", {
				description: JSON.stringify(data, null, 2),
				className: "whitespace-pre-wrap font-mono",
			});
		} else {
			toast.error("Failed to create project.");
		}
	}

	//TODO changeEvent

	const isNew = !event?.id;

	return (
		<ActionHeader
			title={isNew ? "Opret ny begivenhed" : "Opdatér begivenhed"}
			actionButtons={[]}
			onClose={onClose}
		>
			<div className="pt-24">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput control={form.control} name="city" label="City" />
					Murdur Durdur
				</form>
			</div>
		</ActionHeader>
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
