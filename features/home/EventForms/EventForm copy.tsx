// 				<div className="pt-5">
// 					<label
// 						htmlFor="notes"
// 						className="dynamic_text green_gradient mb-2 block font-medium"
// 					>
// 						OBS!
// 					</label>
// 					<Textarea
// 						id="notes"
// 						value={changedEvent.notes}
// 						onChange={handleChange}
// 						placeholder={changedEvent?.notes || "Slut"}
// 						className="dynamic_text textarea-bordered textarea"
// 					/>
// 				</div>
// 				<div className="mt-4">
// 					<label
// 						htmlFor="dayEvents"
// 						className="dynamic_text green_gradient mb-2 block font-medium"
// 					>
// 						Aktiviteter
// 					</label>
// 					<DayEventsForm
// 						dayEvents={sortDayEvents(changedEvent.dayEvents)}
// 						onChange={(updated) => {
// 							setChangingEvent((oldEvent) => ({
// 								...oldEvent,
// 								dayEvents: sortDayEvents(updated),
// 							}));
// 						}}
// 					/>
// 				</div>
// 				<div className="pt-5">
// 					<label
// 						htmlFor="notesActivities"
// 						className="dynamic_text green_gradient mb-2 block font-medium"
// 					>
// 						OBS. Aktiviteter
// 					</label>
// 					<Textarea
// 						id="notesActivities"
// 						value={changedEvent.notesActivities}
// 						onChange={handleChange}
// 						placeholder={changedEvent?.notesActivities || "OBS! aktiviteter"}
// 						className="dynamic_text textarea-bordered textarea"
// 					/>
// 				</div>

// 				<div className="flex flex-col gap-2 mt-5">
// 					<div className="dynamic_text">
// 						Brug &quot;--&quot; til at separere emner
// 					</div>
// 					<div className="dynamic_text">
// 						<CopyButton text="<link:hotel>" />
// 					</div>
// 					<div className="dynamic_text">
// 						<CopyButton text="<link:middag>" />
// 					</div>
// 					<div className="dynamic_text">
// 						<CopyButton text="<link:frokost>" />
// 					</div>
// 					<div className="dynamic_text">
// 						<CopyButton text="<link:tour>" />
// 					</div>
// 					<div className="dynamic_text">
// 						<CopyButton text="<link:gf>" />
// 					</div>
// 					<div className="dynamic_text">
// 						<CopyButton text="<link:extra:Depeche Mode:bar>" />
// 					</div>
// 				</div>
// 			</div>
// 		</ActionHeader>
// 	);
// };

// export default EventForm;

// export function sortDayEvents(dayEvents: DayEvent[]): DayEvent[] {
// 	return [...dayEvents]
// 		.sort((a, b) => a.dateString.localeCompare(b.dateString))
// 		.map((day) => ({
// 			...day,
// 			entries: [...day.entries].sort((a, b) => a.time.localeCompare(b.time)),
// 		}));
// }
