"use client";

import ActionHeader from "@components/ActionHeader";
import { CopyButton } from "@components/buttons/CopyButton";
import {
	FormCheckbox,
	FormInput,
	FormSelect,
	FormTextarea,
} from "@components/form";
import { Button } from "@components/ui/button";
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@components/ui/field";
import { SelectItem } from "@components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmAction } from "@lib/utils";
import { checkEvent } from "actions/event";
import { useForm } from "react-hook-form";
import {
	type Activity,
	EVENT_STATUS_VALUES,
	EVENT_TYPE_VALUES,
	type Event,
	eventSchema,
	initialEvent,
} from "schemas/event";
import { toast } from "sonner";

interface Props {
	event?: Event;
	editable?: boolean;
	onClose: () => void;
	onUpdate: (id: string, document: Event) => Promise<void>;
	onAdding: (document: Event) => Promise<void>;
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
		defaultValues: event || initialEvent,
	});

	// const {
	// 	fields: dayEvents,
	// 	append: addDayEvents,
	// 	remove: removeDayEvents,
	// } = useFieldArray({
	// 	control: form.control,
	// 	name: "activities",
	// });

	const isNew = !event?.id;

	async function onSubmit(data: Event) {
		if (!editable) {
			form.reset();
			toast.error("Projekt er sat til ikke at kunne ændres");
			return;
		}
		const res = await checkEvent(data);

		if (!res) {
			toast.error(`Projekt kunne ikke ${isNew ? "oprettes" : "ændres"}`);
		}

		if (isNew) {
			await onAdding?.(data);
		}
		if (!isNew && data.id) {
			await onUpdate?.(data.id, data);
		} else {
			toast.error(`ID mangler. Er begivenhed oprettet?`);
		}

		form.reset();
		toast.success(`Projekt er ${isNew ? "oprettet" : "ændret"}`);
		onClose();
	}

	const handleDelete = async (id: string | undefined) => {
		if (!id) return;

		const confirmed = await confirmAction("Er du sikker på, at du vil slette?");
		if (confirmed) {
			await onDelete(id);
			onClose();
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
	];

	return (
		<ActionHeader
			title={isNew ? "Opret ny begivenhed" : "Opdatér begivenhed"}
			actionButtons={actionButtons}
			onClose={onClose}
		>
			<div className="container px-4 pt-28 mx-auto my-6">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex justify-end">
						<Button
							key="submit-button"
							variant="default"
							size="sm"
							type="submit"
						>
							{isNew ? "Opret" : "Opdatér"}
						</Button>
					</div>
					<FieldGroup>
						<FieldSet>
							<FieldLegend>Begivenhed</FieldLegend>
							<FieldDescription>Detaljer omkring begivenhed</FieldDescription>
							<FormInput
								control={form.control}
								name="city"
								label="Destination"
							/>
							<FieldGroup>
								<div className="flex flex-col sm:flex-row gap-2">
									<FormSelect
										control={form.control}
										name="status"
										label="Status"
									>
										{EVENT_STATUS_VALUES.map((status) => (
											<SelectItem key={status} value={status}>
												{status}
											</SelectItem>
										))}
									</FormSelect>
									<FormSelect control={form.control} name="type" label="Type">
										{EVENT_TYPE_VALUES.map((type) => (
											<SelectItem key={type} value={type}>
												{type}
											</SelectItem>
										))}
									</FormSelect>
								</div>
							</FieldGroup>
						</FieldSet>
						<FieldSet>
							<FieldLegend>Knapper</FieldLegend>
							<FieldDescription>
								Vælg hvilke knapper der skal være synlige
							</FieldDescription>
							<FieldGroup data-slot="checkbox-group">
								<div className="flex flex-col sm:flex-row gap-2">
									<FormCheckbox
										name="showInfoLink"
										label="Show Info link"
										control={form.control}
									/>
									<FormCheckbox
										name="showMapLink"
										label="Show Map link"
										control={form.control}
									/>
									<FormCheckbox
										name="showUploadButton"
										label="Show Upload button"
										control={form.control}
									/>
								</div>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator />
						<FieldSet>
							<FieldLegend>Dato</FieldLegend>
							<FieldDescription>
								Start og slut datoer for begivenhed
							</FieldDescription>
							<FieldGroup data-slot="checkbox-group">
								<div className="flex flex-col sm:flex-row gap-2">
									<FormInput
										control={form.control}
										name="start"
										label="Start dato"
										description="YYYY-MM-DD"
									/>
									<FormInput
										control={form.control}
										name="end"
										label="Slut Dato"
										description="YYYY-MM-DD"
									/>
								</div>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator />
						{/* <ActivitiesForm activities={event} onChange={() => {}} /> */}
						<FormTextarea control={form.control} name="notes" label="Noter" />
						<FormTextarea
							control={form.control}
							name="notesActivities"
							label="Noter Aktiviteter"
						/>
					</FieldGroup>
					<div className="flex justify-end mt-4">
						<Button
							key="submit-button"
							variant="default"
							size="sm"
							type="submit"
						>
							{isNew ? "Opret" : "Opdatér"}
						</Button>
					</div>
				</form>
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
		</ActionHeader>
	);
};

export default EventForm;

export function sortDayEvents(dayEvents: Activity[]): Activity[] {
	return [...dayEvents]
		.sort((a, b) => a.dateString.localeCompare(b.dateString))
		.map((day) => ({
			...day,
			entries: [...day.entries].sort((a, b) => a.time.localeCompare(b.time)),
		}));
}
