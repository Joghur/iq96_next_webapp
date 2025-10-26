/** biome-ignore-all lint/style/noNonNullAssertion: <TODO> */
"use client";

import { SimpleDateTimePicker } from "@components/dates/SimpleDateTimePicker";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { TrashIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import type { DayEvent, DayEventElement, DayEventType } from "./EventsPage";

interface Props {
	dayEvents: DayEvent[];
	onChange: (updated: DayEvent[]) => void;
}

export default function DayEventsForm({ dayEvents, onChange }: Props) {
	const [events, setEvents] = useState<DayEvent[]>(dayEvents);
	const [newDate, setNewDate] = useState<string>(""); // "2025-09-28"
	const [newTime, setNewTime] = useState<string>(""); // "21:30"
	const [newLabel, setNewLabel] = useState("");
	const [newType, setNewType] = useState<DayEventType>("meetingPoint");

	const [editEntry, setEditEntry] = useState<{
		dateString: string;
		index: number;
	} | null>(null);
	const [editValue, setEditValue] = useState<DayEventElement | null>(null);

	const updateParent = (updated: DayEvent[]) => {
		setEvents(updated);
		onChange(updated);
	};

	const handleAdd = () => {
		if (!newDate || !newTime || !newLabel) return;

		const updated = [...events];
		const day = updated.find((d) => d.dateString === newDate);

		const newEntry: DayEventElement = {
			time: newTime,
			label: newLabel,
			type: newType,
		};

		if (day) {
			day.entries.push(newEntry);
		} else {
			updated.push({ dateString: newDate, entries: [newEntry] });
		}

		updateParent(updated);
		setNewDate("");
		setNewTime("");
		setNewLabel("");
		setNewType("meetingPoint");
	};

	const handleDelete = (dateString: string, index: number) => {
		const updated = events
			.map((day) =>
				day.dateString === dateString
					? { ...day, entries: day.entries.filter((_, i) => i !== index) }
					: day,
			)
			.filter((day) => day.entries.length !== 0);

		updateParent(updated);
	};

	const handleChangeType = (val: ChangeEvent<HTMLSelectElement>) => {
		setNewType(val.target.value as DayEventType);
	};

	// TODO refactor this
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<SimpleDateTimePicker
					value={{ date: newDate, time: newTime }}
					onChange={({ date, time }) => {
						setNewDate(date);
						setNewTime(time);
					}}
					direction="column"
					showPreview
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

			<Button onClick={handleAdd} variant="default">
				Tilføj event
			</Button>
			<div className="space-y-4">
				{events.map((day) => (
					<div
						key={day.dateString}
						className="border p-4 rounded-md bg-primary"
					>
						<h3 className="dynamic_text font-semibold mb-2">
							{day.dateString}
						</h3>
						<ul className="space-y-2">
							{day.entries.map((entry, index) => (
								<li
									key={index}
									className="bg-secondary border p-05 flex items-center justify-between gap-2"
								>
									{editEntry?.dateString === day.dateString &&
									editEntry.index === index ? (
										<div className="flex flex-col md:flex-row md:flex-wrap items-start gap-2 bg-slate-200 p-3 rounded-md md:max-w-[700px]">
											{" "}
											<SimpleDateTimePicker
												value={{
													date: day.dateString,
													time: editValue?.time || "",
												}}
												onChange={({ time }) =>
													setEditValue((prev) => ({ ...prev!, time }))
												}
												direction="row"
												showPreview
											/>
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
												<div className="flex justify-between gap-2 mt-2">
													<select
														value={editValue?.type}
														onChange={(e) =>
															setEditValue((prev) => ({
																...prev!,
																type: e.target.value as DayEventType,
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
																const updated = [...events];
																updated.forEach((d) => {
																	if (d.dateString === day.dateString) {
																		d.entries[index] = editValue!;
																	}
																});
																updateParent(updated);
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
														setEditEntry({ dateString: day.dateString, index });
														setEditValue(entry);
													}}
												>
													✏️
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleDelete(day.dateString, index)}
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
			</div>
		</div>
	);
}
