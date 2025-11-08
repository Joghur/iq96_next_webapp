"use server";

import { eventSchema } from "schemas/event";
import type z from "zod";

export async function createEvent(unsafeData: z.infer<typeof eventSchema>) {
	const data = eventSchema.safeParse(unsafeData);

	if (!data.success) return { success: false };

	// Save to DB

	return { success: true };
}
