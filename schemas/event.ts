import { z } from "zod";

// Typer
export type Event = z.infer<typeof eventSchema>;
export type EventType = Event["type"]
export type EventStatus = Event["status"];

export type Activity = z.infer<typeof activitiesSchema>;
export type ActivityItem = z.infer<typeof activitiesItemSchema>;
export type ActivityItemType = ActivityItem["type"];

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
export const activitiesItemSchema = z.object({
	time: z.union([z.string().regex(/^\d{2}:\d{2}$/, {
		message: "Tid skal være i formatet hh:mm",
	}),
	z.literal(""),
	]),
	label: z.string().min(1),
	type: z.enum(ACTIVITY_TYPE_VALUES),
});

export const activitiesSchema = z.object({
	dateString: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "Datoen skal være i formatet YYYY-MM-DD",
	}),
	z.literal(""),
	]),
	entries: z.array(activitiesItemSchema),
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
			entries: [
				{
					time: "11:00",
					label: "Mødes under uret, Hovedbanegården",
					type: "meetingPoint",
				},
				{ time: "12:30", label: "Hotel", type: "hotel" },
				{ time: "13:30", label: "Aktivitet", type: "activity" },
				{ time: "14:30", label: "Guided tour", type: "guidedTour" },
			],
		},
		{
			dateString: "2025-09-29",
			entries: [
				{ time: "16:30", label: "GF mødestart", type: "meeting" },
				{ time: "19:30", label: "Cantinos & Centerpubben", type: "bar" },
			],
		},
	],
	notes: "",
	notesActivities: "",
	showUploadButton: false,
	showInfoLink: false,
	showMapLink: false,
};
