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
import { useEffect, useState } from "react";
import type { UseFieldArrayRemove } from "react-hook-form";
import {
	type Activity,
	type ActivityType,
	activitiesSchema,
} from "schemas/event";
import Activities from "./Activities";
import { ActivityTypeSelect } from "./event-selects/ActivityTypeSelect";

interface Props {
	activities: Activity[];
	onAddActivity: any; // UseFieldArrayAppend<Activity>; TODO
	onRemoveActivity: UseFieldArrayRemove;
}

export default function ActivitiesForm({
	activities,
	onRemoveActivity,
	onAddActivity,
}: Props) {
	const [newDate, setNewDate] = useState<string>(""); // "2025-09-28"
	const [newDateError, setNewDateError] = useState<string>(""); // dateString._errors: [""]

	const [newTime, setNewTime] = useState<string>(""); // "21:30"
	const [newTimeError, setNewTimeError] = useState<string>(""); // time._errors:: [""]

	const [newLabel, setNewLabel] = useState("");
	const [newLabelError, setNewLabelError] = useState(""); // label._errors: [""]

	const [newType, setNewType] = useState<ActivityType>("meetingPoint");
	const [newTypeError, setNewTypeError] = useState(""); // activityType._errors: [""]

	const handleChangeType = (value: string) => {
		setNewType(value as ActivityType);
	};

	useEffect(() => {
		const newEntry = {
			dateString: newDate,
			time: newTime,
			label: newLabel,
			activityType: newType,
		};
		const result = activitiesSchema.safeParse(newEntry);
		if (!result.success) {
			const { dateString, label, time, activityType } = result.error.format();
			setNewDateError(dateString?._errors.join(", ") || "");
			setNewTimeError(time?._errors.join(", ") || "");
			setNewLabelError(label?._errors.join(", ") || "");
			setNewTypeError(activityType?._errors.join(", ") || "");
		} else {
			// Nulstil fejl, hvis validering lykkes
			setNewDateError("");
			setNewTimeError("");
			setNewLabelError("");
			setNewTypeError("");
		}
	}, [newDate, newTime, newLabel, newType]);

	const handleAdd = () => {
		const newEntry = {
			dateString: newDate,
			time: newTime,
			label: newLabel,
			activityType: newType,
		};
		const result = activitiesSchema.safeParse(newEntry);
		if (result.success) {
			setNewDate("");
			setNewTime("");
			setNewLabel("");
			setNewType("meetingPoint");
			onAddActivity(newEntry);
		}
	};

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
						<div className="space-y-1">
							<Input
								value={newDate}
								onChange={(e) => setNewDate(e.target.value)}
								placeholder="Dato"
								className={
									newDateError
										? "border-red-500 focus-visible:ring-red-500 md:w-[200px]"
										: "md:w-[200px]"
								}
							/>{" "}
							{newDateError && (
								<p className="text-sm text-red-500">{newDateError}</p>
							)}
						</div>
						<div className="space-y-1">
							<Input
								value={newTime}
								onChange={(e) => setNewTime(e.target.value)}
								placeholder="Tidspunkt"
								className={
									newTimeError
										? "border-red-500 focus-visible:ring-red-500 md:w-[200px]"
										: "md:w-[200px]"
								}
							/>
							{newTimeError && (
								<p className="text-sm text-red-500">{newTimeError}</p>
							)}
						</div>
						<div className="space-y-1">
							<Input
								value={newLabel}
								onChange={(e) => setNewLabel(e.target.value)}
								placeholder="Beskrivelse"
								className={
									newLabelError
										? "border-red-500 focus-visible:ring-red-500 md:w-[200px]"
										: "md:w-[200px]"
								}
							/>
							{newLabelError && (
								<p className="text-sm text-red-500">{newLabelError}</p>
							)}
						</div>
						<ActivityTypeSelect value={newType} onChange={handleChangeType} />
					</div>
					<FieldGroup>
						<Activities
							activities={activities}
							onRemoveActivity={onRemoveActivity}
						/>
					</FieldGroup>
				</FieldSet>
			</FieldGroup>
		</div>
	);
}
