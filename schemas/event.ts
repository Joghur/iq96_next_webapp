import { z } from "zod";

// Typer
const typeValues = ["tour", "gf", "oel", "golf", "other", ""] as const;
const eventStatusValues = ["done", "next", "pending"] as const;
const dayEventTypeValues = [
	"meetingPoint",
	"activity",
	"restaurant",
	"bar",
	"guidedTour",
	"meeting",
	"hotel",
] as const;

// Schemas
const dateTimeValueSchema = z.object({
	date: z.string().min(1),
	time: z.string().min(1),
});

const dayEventElementSchema = z.object({
	time: z.string().min(1),
	label: z.string().min(1),
	type: z.enum(dayEventTypeValues),
});

const dayEventSchema = z.object({
	dateString: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
	entries: z.array(dayEventElementSchema).min(1),
});

export const eventSchema = z.object({
	id: z.string().optional(),
	city: z.string().min(1),
	start: dateTimeValueSchema,
	end: dateTimeValueSchema,
	type: z.enum(typeValues),
	year: z.number().int(),
	dayEvents: z.array(dayEventSchema),
	notes: z.string().optional(),
	notesActivities: z.string().optional(),
	status: z.enum(eventStatusValues).optional(),
	showUploadButton: z.boolean().optional(),
	showInfoLink: z.boolean().optional(),
	showMapLink: z.boolean().optional(),
});
