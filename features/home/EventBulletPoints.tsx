import EventInfoBadge from "@components/EventInfoBadge";
import Link from "next/link";
import type { ReactNode } from "react";
import {
	MdOutlineBusAlert,
	MdOutlineCoffee,
	MdOutlineDining,
	MdOutlineHotel,
	MdOutlineLocalSee,
	MdOutlineLunchDining,
	MdOutlineMuseum,
	MdOutlineMusicNote,
	MdOutlineQuestionMark,
	MdOutlineRestaurant,
	MdOutlineTrain,
	MdOutlineWineBar,
	MdWineBar,
} from "react-icons/md";
import type { EventType } from "./EventsPage";

type Props = { pointsString: string; event: EventType };

const EventBulletPoints = ({ pointsString, event }: Props) => {
	const points = pointsString.split("--");

	const yearCity = `${event.year}-${event.city}`;

	// Notes. For the time being event.hotelLocation is holding year-city (f.ex. 2024-tallinn)
	// Which is the only information needed for going to the right map part
	return (
		<div>
			{points.map((point: string, index) => {
				if (point.includes("<link:hotel>")) {
					const parts = point.split("<link:hotel>");
					return (
						<div key={index} className="ml-4">
							<li>
								{`${parts[0]} `}
								{handleBulletPoint(yearCity, "hotel")}
								{` ${parts.length > 1 && parts[1]}`}
							</li>
						</div>
					);
				}
				if (point.includes("<link:middag>")) {
					const parts = point.split("<link:middag>");
					return (
						<div key={index} className="ml-4">
							<li>
								{`${parts[0]} `}
								{handleBulletPoint(yearCity, "middag")}
								{` ${parts.length > 1 && parts[1]}`}
							</li>
						</div>
					);
				}
				if (point.includes("<link:frokost>")) {
					const parts = point.split("<link:frokost>");
					return (
						<div key={index} className="ml-4">
							<li>
								{`${parts[0]} `}
								{handleBulletPoint(yearCity, "frokost")}
								{` ${parts.length > 1 && parts[1]}`}
							</li>
						</div>
					);
				}
				if (point.includes("<link:tour>")) {
					const parts = point.split("<link:tour>");
					return (
						<div key={index} className="ml-4">
							<li>
								{`${parts[0]} `}
								{handleBulletPoint(yearCity, "tour")}
								{` ${parts.length > 1 && parts[1]}`}
							</li>
						</div>
					);
				}
				if (point.includes("<link:gf>")) {
					const parts = point.split("<link:gf>");
					return (
						<div key={index} className="ml-4">
							<li>
								{`${parts[0]} `}
								{handleBulletPoint("0-Generalforsamling", "gf")}
								{` ${parts.length > 1 && parts[1]}`}
							</li>
						</div>
					);
				}

				const regexPattern = /([^<]*)<link:extra:([^:]+):([^>]+)>([^>]*)/;
				const match = new RegExp(regexPattern).exec(point);
				if (match) {
					const firstText = match[1];
					const markerNick = match[2];
					const markerType = match[3];
					const lastText = match[4];
					return (
						<div key={index} className="ml-4">
							<li>
								{firstText}
								{handleBulletPoint(
									yearCity,
									markerType as BulletPointLinkTypes,
									markerNick,
								)}
								{lastText && lastText}
							</li>
						</div>
					);
				}

				return (
					<div key={index} className="ml-4">
						<li>{handleBulletPoint(point.trim())}</li>
					</div>
				);
			})}
		</div>
	);
};

export default EventBulletPoints;

const bulletPointLinkTypes = [
	"string",
	"hotel",
	"frokost",
	"middag",
	"tour",
	"bar",
	"bus",
	"restaurant",
	"cafe",
	"museum",
	"music",
	"question",
	"train",
	"gf",
	"unknown",
] as const;

export type BulletPointLinkTypes = (typeof bulletPointLinkTypes)[number];

const handleBulletPoint = (
	yearCity: string | undefined,
	type?: BulletPointLinkTypes,
	place?: string,
): ReactNode => {
	switch (type) {
		case "hotel":
			return (
				<Link
					href={`/kort?aar-by=${yearCity}&sted=Vores hotel`}
					prefetch={false}
					className="whitespace-nowrap"
				>
					<EventInfoBadge>
						<MdOutlineHotel className="mr-1" />
						Hotel
					</EventInfoBadge>
				</Link>
			);

		case "middag":
			return (
				<Link
					href={`/kort?aar-by=${yearCity}&sted=Vores middag`}
					prefetch={false}
					className="whitespace-nowrap"
				>
					<EventInfoBadge>
						<MdOutlineDining className="mr-1" />
						Middag
					</EventInfoBadge>
				</Link>
			);

		case "frokost":
			return (
				<Link
					href={`/kort?aar-by=${yearCity}&sted=Vores frokost`}
					prefetch={false}
					className="whitespace-nowrap"
				>
					<EventInfoBadge>
						<MdOutlineLunchDining className="mr-1" />
						Frokost
					</EventInfoBadge>
				</Link>
			);

		case "tour":
			return (
				<Link
					href={`/kort?aar-by=${yearCity}&sted=Guided tour`}
					prefetch={false}
					className="whitespace-nowrap"
				>
					<EventInfoBadge>
						<MdOutlineLocalSee className="mr-1" />
						Guided tour
					</EventInfoBadge>
				</Link>
			);

		case "gf":
			return (
				<Link
					href={"/kort?aar-by=0-Generalforsamling&sted=Generalforsamling"}
					prefetch={false}
					className="whitespace-nowrap"
				>
					<EventInfoBadge>
						<MdWineBar className="mr-1" />
						Generalforsamling
					</EventInfoBadge>
				</Link>
			);

		case "bar":
		case "bus":
		case "cafe":
		case "museum":
		case "music":
		case "question":
		case "restaurant":
		case "train":
		case "unknown":
			return (
				<Link
					href={`/kort?aar-by=${yearCity}&sted=${place}`}
					prefetch={false}
					className="whitespace-nowrap"
				>
					<EventInfoBadge>
						{iconText(type)}
						{place}
					</EventInfoBadge>
				</Link>
			);

		default:
			return yearCity;
	}
};

const iconText = (icon: string) => {
	switch (icon) {
		case "bar":
		case "gf":
			return <MdOutlineWineBar className="mr-1" />;

		case "bus":
			return <MdOutlineBusAlert className="mr-1" />;

		case "cafe":
			return <MdOutlineCoffee className="mr-1" />;

		case "museum":
			return <MdOutlineMuseum className="mr-1" />;

		case "music":
			return <MdOutlineMusicNote className="mr-1" />;

		case "restaurant":
			return <MdOutlineRestaurant className="mr-1" />;

		case "train":
			return <MdOutlineTrain className="mr-1" />;

		default:
			return <MdOutlineQuestionMark className="mr-1" />;
	}
};
