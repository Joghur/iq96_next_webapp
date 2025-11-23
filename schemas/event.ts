import { z } from "zod";

// Typer
export type Event = z.infer<typeof eventSchema>;
export type EventType = Event["type"]
export type EventStatus = Event["status"];

export type Activity = z.infer<typeof activitiesSchema>;
export type ActivityType = Activity["activityType"]

export const EVENT_TYPE_VALUES = [
	"tour",
	"gf",
	"oel",
	"golf",
	"other",
] as const;
export const EVENT_STATUS_VALUES = ["done", "next", "pending"] as const;
export const ACTIVITY_TYPE_VALUES = [
	"meetingPoint",
	"activity",
	"restaurant",
	"bar",
	"guidedTour",
	"meeting",
	"hotel",
] as const;

// Schemas
export const activitiesSchema = z.object({
	dateString: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "Datoen skal være i formatet YYYY-MM-DD",
	}),
	z.literal(""),
	]),
	time: z.union([z.string().regex(/^\d{2}:\d{2}$/, {
		message: "Tid skal være i formatet hh:mm",
	}),
	z.literal(""),
	]),
	label: z.string().min(1),
	activityType: z.enum(ACTIVITY_TYPE_VALUES),
});

export const eventSchema = z.object({
	id: z.string().optional(),
	city: z.string().min(1),
	start: z.union([
		z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "Datoen skal være i formatet YYYY-MM-DD",
		}),
		z.literal(""),
	]),
	end: z.union([
		z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "Datoen skal være i formatet YYYY-MM-DD",
		}),
		z.literal(""),
	]),
	type: z.enum(EVENT_TYPE_VALUES),
	year: z.number().int(),
	activities: z.array(activitiesSchema),
	notes: z.string().optional(),
	notesActivities: z.string().optional(),
	status: z.enum(EVENT_STATUS_VALUES),
	showUploadButton: z.boolean().optional(),
	showInfoLink: z.boolean().optional(),
	showMapLink: z.boolean().optional(),
});

export const initialEvent: Event = {
	type: "tour",
	status: "pending",
	city: "Kokkedal",
	start: "",
	end: "",
	year: new Date().getFullYear(),
	activities: [
		{
			dateString: "2025-09-28",
			time: "11:00",
			label: "Mødes under uret, Hovedbanegården",
			activityType: "meetingPoint",
		},
		{ dateString: "2025-09-28", time: "12:30", label: "Hotel", activityType: "hotel" },
		{ dateString: "2025-09-28", time: "13:30", label: "Aktivitet", activityType: "activity" },
		{ dateString: "2025-09-28", time: "14:30", label: "Guided tour", activityType: "guidedTour" },
		{
			dateString: "2025-09-28",
			time: "11:00",
			label: "Mødes under uret, Hovedbanegården",
			activityType: "meetingPoint",
		},
		{ dateString: "2025-09-28", time: "12:30", label: "Hotel", activityType: "hotel" },
		{ dateString: "2025-09-28", time: "13:30", label: "Aktivitet", activityType: "activity" },
		{ dateString: "2025-09-28", time: "14:30", label: "Guided tour", activityType: "guidedTour" },

		{ dateString: "2025-09-29", time: "16:30", label: "GF mødestart", activityType: "meeting" },
		{ dateString: "2025-09-29", time: "19:30", label: "Cantinos & Centerpubben", activityType: "bar" },
	],
	notes: "",
	notesActivities: "",
	showUploadButton: false,
	showInfoLink: false,
	showMapLink: false,
};
