import ShowDate from "@components/dates/ShowDate";
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

// <div className="border p-4 rounded-md bg-primary">
// 	<ul className="space-y-2">
// 		{activities.map((activity, index) => (
// 			<li
// 				key={index}
// 				className="dynamic_text bg-secondary border p-05 flex place-items-center justify-between p-1"
// 			>
// 				<div className="flex gap-1">
// 					<span className="font-semibold">{activity.dateString}</span>
// 					<span>-</span>
// 					<span>{activity.time}</span>
// 				</div>
// 				<div className="flex gap-3">
// 					<span>{activity.label}</span>
// 					<span>{activity.activityType}</span>
// 					<Button
// 						variant="ghost"
// 						size="icon"
// 						onClick={() => onRemoveActivity(index)}
// 					>
// 						<TrashIcon className="w-4 h-4 text-red-500" />
// 					</Button>
// 				</div>
// 			</li>
// 		))}
// 	</ul>
// </div>

type ActivitiesByDate = {
	dateString: string;
	entries: Omit<Activity, "dateString">[];
};

function groupActivitiesByDate(activities: Activity[] | undefined): ActivitiesByDate[] | undefined {
	if (!activities || activities.length === 0) {
		return undefined
	}
	const grouped = activities.reduce<
		Record<string, Omit<Activity, "dateString">[]>
	>((acc, activity) => {
		const { dateString, ...rest } = activity;
		if (!acc[dateString]) {
			acc[dateString] = [];
		}
		acc[dateString].push(rest);
		return acc;
	}, {});

	// Konverter objektet til et array
	return Object.entries(grouped).map(([dateString, entries]) => ({
		dateString,
		entries,
	}));
}

const TourCard = ({ event }: Props) => {
	const accumulatedActivities = groupActivitiesByDate(event?.activities)

	if (!accumulatedActivities) {
		return null
	}

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
						<p
							key={`notes-activity-${accActivity.dateString}`}
							className="text-md text-slate-400 mt-0 mb-6"
						>
							<EventBulletPoints
								pointsString={event.notesActivities.trim()}
								event={event}
							/>
						</p>
					)}
				</Fragment>
			))}
		</div>
	);
};

export default TourCard;
