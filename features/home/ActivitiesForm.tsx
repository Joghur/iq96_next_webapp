/** biome-ignore-all lint/style/noNonNullAssertion: <TODO> */
"use client";

import {
	type FormControlProps,
	FormInput,
	FormSelect,
	FormTextarea,
} from "@components/form";
import { Button } from "@components/ui/button";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@components/ui/field";
import { Input } from "@components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@components/ui/input-group";
import { TrashIcon } from "@radix-ui/react-icons";
import { SelectItem } from "@radix-ui/react-select";
import { XIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { Controller } from "react-hook-form";
import {
	ACTIVITY_TYPE_VALUES,
	type Activity,
	type ActivityItem,
	type ActivityItemType,
	EVENT_STATUS_VALUES,
	EVENT_TYPE_VALUES,
} from "schemas/event";

interface Props {
	activities: Activity[];
	onRemoveActivity: any;
	onAddActivity: any;
	onUpdateActivity: any;
}

/**
	  activity: 
	{
		dateString: string;
		entries: {
			type: "meetingPoint" | "activity" | "restaurant" | "bar" | "guidedTour" | "meeting" | "hotel";
			time: string;
			label: string;
		}[];
	}
 */

export default function ActivitiesForm({
	activities,
	onRemoveActivity,
	onAddActivity,
	onUpdateActivity
}: Props) {
	const [newDate, setNewDate] = useState<string>(""); // "2025-09-28"
	const [newTime, setNewTime] = useState<string>(""); // "21:30"
	const [newLabel, setNewLabel] = useState("");
	const [newType, setNewType] = useState<ActivityItemType>("meetingPoint");

	const [editEntry, setEditEntry] = useState<{
		dateString: string;
		index: number;
	} | null>(null);
	const [editValue, setEditValue] = useState<ActivityItem | null>(null);


	const handleAdd = () => {
		if (!newDate || !newTime || !newLabel) return;

		const newEntry: ActivityItem = {
			time: newTime,
			label: newLabel,
			type: newType,
		};
		onAddActivity({ dateString: newDate, entries: [newEntry] });

		setNewDate("");
		setNewTime("");
		setNewLabel("");
		setNewType("meetingPoint");
	};


	const handleChangeType = (val: ChangeEvent<HTMLSelectElement>) => {
		setNewType(val.target.value as ActivityItemType);
	};

	// TODO refactor this
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
							Tilføj event
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
						<select
							value={newType}
							onChange={handleChangeType}
							className="mt-1 p-2 block w-full border-gray-300 dark:border-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
						>
							<option value="meetingPoint">Mødested</option>
							<option value="dinner">Middag</option>
							<option value="guidedTour">Guidet tur</option>
							<option value="action">Aktivitet</option>
							<option value="bar">Bar</option>
							<option value="hotel">Hotel</option>
							<option value="meeting">Møde</option>
							<option value="restaurant">Restaurant</option>
						</select>
					</div>
					<FieldGroup>{activities.map((activity) => (
						<div
							key={activity.dateString}
							className="border p-4 rounded-md bg-primary"
						>
							<h3 className="dynamic_text font-semibold mb-2">
								{activity.dateString}
							</h3>
							<ul className="space-y-2">
								{activity.entries.map((entry, index) => (
									<li
										key={index}
										className="bg-secondary border p-05 flex items-center justify-between gap-2"
									>
										{editEntry?.dateString === activity.dateString &&
											editEntry.index === index ? (
											<div className="flex flex-col md:flex-row md:flex-wrap items-start gap-2 bg-slate-200 p-3 rounded-md md:max-w-[700px]">
												<div>
													<Input
														value={editValue?.label || ""}
														onChange={(e) =>
															setEditValue((prev) => ({
																...prev!,
																label: e.target.value,
															}))
														}
													/>
													<Input
														value={editValue?.time || ""}
														onChange={(e) =>
															setEditValue((prev) => ({
																...prev!,
																time: e.target.value,
															}))
														}
													/>
													<div className="flex justify-between gap-2 mt-2">
														<select
															value={editValue?.type}
															onChange={(e) =>
																setEditValue((prev) => ({
																	...prev!,
																	type: e.target.value as ActivityItemType,
																}))
															}
															className="p-2 rounded-md border border-gray-300 md:w-[150px]"
														>
															<option value="meetingPoint">Mødested</option>
															<option value="dinner">Middag</option>
															<option value="guidedTour">Guidet tur</option>
															<option value="action">Aktivitet</option>
															<option value="bar">Bar</option>
															<option value="hotel">Hotel</option>
															<option value="meeting">Møde</option>
															<option value="restaurant">Restaurant</option>
														</select>
														<div className="flex gap-2">
															<Button
																size="sm"
																onClick={() => {
																	const updated = [...activities];
																	updated.forEach((d) => {
																		if (d.dateString === activity.dateString) {
																			d.entries[index] = editValue!;
																		}
																	});
																	onUpdateActivity(updated);
																	setEditEntry(null);
																}}
															>
																Gem
															</Button>
															<Button
																variant="outline"
																size="sm"
																onClick={() => setEditEntry(null)}
															>
																Fortryd
															</Button>
														</div>
													</div>
												</div>
											</div>
										) : (
											<>
												<span className="flex-1">
													{entry.time} – {entry.label} ({entry.type})
												</span>
												<div className="flex gap-2">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => {
															setEditEntry({ dateString: activity.dateString, index });
															setEditValue(entry);
														}}
													>
														✏️
													</Button>
													<Button
														variant="ghost"
														size="icon"
														onClick={() => onRemoveActivity(index)}
													>
														<TrashIcon className="w-4 h-4 text-red-500" />
													</Button>
												</div>
											</>
										)}
									</li>
								))}
							</ul>
						</div>
					))}
					</FieldGroup>
				</FieldSet>
			</FieldGroup>
		</div>
	);
}
