import ShowDate from "@components/dates/ShowDate";
import { groupActivitiesByDate } from "@lib/utils";
import { Fragment } from "react";
import { FaBolt } from "react-icons/fa";
import {
	MdGroups,
	MdHotel,
	MdLocationPin,
	MdOutlineRestaurant,
	MdOutlineTour,
	MdWineBar,
} from "react-icons/md";
import type { Activity, ActivityType, Event } from "schemas/event";
import EventBulletPoints from "./EventBulletPoints";

type Props = {
	event: Event;
};

const selectIcon = (type: ActivityType) => {
	switch (type) {
		case "activity":
			return <FaBolt />;

		case "meeting":
			return <MdGroups />;

		case "hotel":
			return <MdHotel />;

		case "bar":
			return <MdWineBar />;

		case "restaurant":
			return <MdOutlineRestaurant />;

		case "guidedTour":
			return <MdOutlineTour />;

		case "meetingPoint":
			return <MdLocationPin />;

		default:
			return null;
	}
};

const TourCard = ({ event }: Props) => {
	const accumulatedActivities = groupActivitiesByDate(event?.activities);

	if (!accumulatedActivities) {
		return null;
	}
	console.log('event.notesActivities', event.notesActivities)
	return (
		<div className="text-white">
			{accumulatedActivities.map((accActivity, index) => (
				<Fragment key={accActivity.dateString}>
					<div
						className={`rounded-md p-1 sm:p-3 ${index === 0
							? "bg-slate-400 border-2 rounded-lg shadow-lg border-orange-400 mb-6"
							: "bg-slate-400 mb-2"
							}`}
					>
						{event.end !== "" && (
							<h3
								className={`${index === 0 ? "font-extrabold" : "font-small"} mb-2 tracking-tight`}
							>
								<ShowDate dateString={accActivity.dateString} />
							</h3>
						)}
						<ul className="w-full text-left">
							{accActivity.entries.map((entry, innerIndex) => (
								<li
									key={innerIndex}
									className="m-1 flex w-full text-left items-center justify-start gap-2"
								>
									<span
										className={`dynamic_text ${index === 0 ? "font-extrabold" : "font-small"} sm:min-w-[60px] text-left`}
									>
										{entry.time}
									</span>
									{selectIcon(entry.activityType)}
									<span
										className={`dynamic_text px-2 sm:px-3 py-0.5 rounded-full leading-tight ${index === 0 ? "font-medium" : "font-normal"} ${entry.activityType === "hotel" ||
											entry.activityType === "restaurant" ||
											entry.activityType === "meeting"
											? "bg-green-300 text-white"
											: entry.activityType === "meetingPoint"
												? "bg-red-300 text-white"
												: "bg-blue-300 text-slate-600"
											}`}
									>
										{entry.label}
									</span>
								</li>
							))}
						</ul>
					</div>
					{event.notesActivities && index === 0 && (
						<div
							key={`notes-activity-${accActivity.dateString}`}
							className="text-md text-slate-400 mt-0 mb-6"
						>
							<EventBulletPoints
								pointsString={event.notesActivities.trim()}
								event={event}
							/>
						</div>
					)}
				</Fragment>
			))}
		</div>
	);
};

export default TourCard;
