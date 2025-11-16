"use server";

import { checkFormData } from "@lib/formUtils";
import { memberSchema } from "schemas/member";
import type z from "zod";

export async function checkMember(unsafeData: z.infer<typeof memberSchema>) {
	return checkFormData<z.infer<typeof memberSchema>>(unsafeData, memberSchema);
}
