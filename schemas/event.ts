import { z } from "zod";

// Typer
export type Event = z.infer<typeof eventSchema>;
export type EventType = (typeof EVENT_TYPE_VALUES)[number];
export type EventStatus = (typeof EVENT_STATUS_VALUES)[number];

export type Activity = z.infer<typeof activitiesSchema>;
export type ActivityType = (typeof ACTIVITY_TYPE_VALUES)[number];
export type ActivityElement = z.infer<typeof activitiesElementSchema>;

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
export const activitiesElementSchema = z.object({
	time: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "Datoen skal være i formatet YYYY-MM-DD",
	}),
	label: z.string().min(1),
	type: z.enum(ACTIVITY_TYPE_VALUES),
});

export const activitiesSchema = z.object({
	dateString: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "Datoen skal være i formatet YYYY-MM-DD",
	}),
	entries: z.array(activitiesElementSchema),
});

export const eventSchema = z.object({
	id: z.string().optional(),
	city: z.string().min(1),
	start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "Datoen skal være i formatet YYYY-MM-DD",
	}),
	end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "Datoen skal være i formatet YYYY-MM-DD",
	}),
	type: z.enum(EVENT_TYPE_VALUES),
	year: z.number().int().min(4).max(4),
	activities: z.array(activitiesSchema).default([]),
	notes: z.string().optional().default(""),
	notesActivities: z.string().optional().default(""),
	status: z.enum(EVENT_STATUS_VALUES).default("pending"),
	showUploadButton: z.boolean().optional().default(false),
	showInfoLink: z.boolean().optional().default(false),
	showMapLink: z.boolean().optional().default(false),
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
