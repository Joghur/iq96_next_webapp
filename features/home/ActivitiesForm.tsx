/** biome-ignore-all lint/style/noNonNullAssertion: <TODO> */
"use client";

import { Button } from "@components/ui/button";
import {
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from "@components/ui/field";
import { Input } from "@components/ui/input";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import type { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import {
	type Activity,
	type ActivityType,
	activitiesSchema,
} from "schemas/event";
import { toast } from "sonner";
import { ActivityTypeSelect } from "./event-selects/ActivityTypeSelect";

interface Props {
	activities: Activity[];
	onAddActivity: UseFieldArrayAppend<Activity>;
	onRemoveActivity: UseFieldArrayRemove;
}

export default function ActivitiesForm({
	activities,
	onRemoveActivity,
	onAddActivity,
}: Props) {
	const [newDate, setNewDate] = useState<string>(""); // "2025-09-28"
	const [newTime, setNewTime] = useState<string>(""); // "21:30"
	const [newLabel, setNewLabel] = useState("");
	const [newType, setNewType] = useState<ActivityType>("meetingPoint");

	const handleChangeType = (value: string) => {
		setNewType(value as ActivityType);
	};

	const handleAdd = () => {
		if (!newDate || !newTime || !newLabel) return;

		const newEntry: Activity = {
			dateString: newDate,
			time: newTime,
			label: newLabel,
			activityType: newType,
		};

		const result = activitiesSchema.safeParse(newEntry);
		if (!result.success) {
			// toast.error("Ugyldige aktivitetsdata. Tjek dato, tid og beskrivelse.");
			// console.log("Valideringsfejl:", result.error.format());
			return;
		}

		onAddActivity(newEntry);

		setNewDate("");
		setNewTime("");
		setNewLabel("");
		setNewType("meetingPoint");
	};
	console.log("activities", activities);

	return (
		<div className="space-y-6">
			<FieldGroup>
				<FieldSet>
					<div className="flex justify-between gap-2 items-center">
						<FieldContent>
							<FieldLegend variant="label" className="mb-0">
								Aktiviteter
							</FieldLegend>
							<FieldDescription>Daglige aktiviteter</FieldDescription>
						</FieldContent>
						<Button onClick={handleAdd} variant="default">
							Tilføj aktivitet
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input
							value={newDate}
							onChange={(e) => setNewDate(e.target.value)}
							placeholder="Dato"
							className="md:w-[200px]"
						/>
						<Input
							value={newTime}
							onChange={(e) => setNewTime(e.target.value)}
							placeholder="Tidspunkt"
							className="md:w-[200px]"
						/>
						<Input
							value={newLabel}
							onChange={(e) => setNewLabel(e.target.value)}
							placeholder="Beskrivelse"
							className="md:w-[200px]"
						/>
						<ActivityTypeSelect value={newType} onChange={handleChangeType} />
					</div>
					<FieldGroup>
						<div className="border p-4 rounded-md bg-primary">
							<ul className="space-y-2">
								{activities.map((activity, index) => (
									<li
										key={index}
										className="dynamic_text bg-secondary border p-05 flex place-items-center justify-between p-1"
									>
										<div className="flex gap-1">
											<span className="font-semibold">
												{activity.dateString}
											</span>
											<span>-</span>
											<span>{activity.time}</span>
										</div>
										<div className="flex gap-3">
											<span>{activity.label}</span>
											<span>{activity.activityType}</span>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => onRemoveActivity(index)}
											>
												<TrashIcon className="w-4 h-4 text-red-500" />
											</Button>
										</div>
									</li>
								))}
							</ul>
						</div>
					</FieldGroup>
				</FieldSet>
			</FieldGroup>
		</div>
	);
}
