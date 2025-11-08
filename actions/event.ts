"use server";

import { eventSchema } from "schemas/event";
import type z from "zod";

export async function checkEvent(unsafeData: z.infer<typeof eventSchema>) {
	const data = eventSchema.safeParse(unsafeData);

	if (!data.success) return false;

	return true;
}
