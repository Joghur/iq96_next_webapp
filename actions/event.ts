"use server";

import { checkFormData } from "@lib/formUtils";
import { eventSchema } from "schemas/event";
import type { z } from "zod";

export async function checkEvent(unsafeData: z.infer<typeof eventSchema>) {
	// const data = eventSchema.safeParse(unsafeData);

	return checkFormData<z.infer<typeof eventSchema>>(unsafeData, eventSchema);

	// if (!data.success) {
	// 	console.error(
	// 		"Ugyldige event-data:",
	// 		JSON.stringify(
	// 			{
	// 				errors: data.error.format(),
	// 			},
	// 			null,
	// 			2
	// 		)
	// 	);

	// 	return false;
	// }

	// return true;
}
