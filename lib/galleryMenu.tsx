import type { EventLabel } from "@app/bibliothek/galleri/page";
import {
	MdAirplanemodeActive,
	MdEmojiEvents,
	MdMail,
	MdPeople,
} from "react-icons/md";

export const galleryCategories: EventLabel[] = [
	{
		label: "Tour",
		shortLabel: "tour",
		type: "galleries",
		icon: <MdAirplanemodeActive />,
	},
	{
		label: "GF",
		shortLabel: "gf",
		type: "galleries",
		icon: <MdPeople />,
	},
	{
		label: "Stævner",
		shortLabel: "events",
		type: "galleries",
		icon: <MdEmojiEvents />,
	},
	{
		label: "Breve",
		shortLabel: "letters",
		type: "letters",
		icon: <MdMail />,
	},
];
