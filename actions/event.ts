"use server";

import { checkFormData } from "@lib/formUtils";
import { eventSchema } from "schemas/event";
import type { z } from "zod";

export async function checkEvent(unsafeData: z.infer<typeof eventSchema>) {
	return checkFormData<z.infer<typeof eventSchema>>(unsafeData, eventSchema);
}
