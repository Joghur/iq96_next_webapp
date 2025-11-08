"use server";

import { memberSchema } from "schemas/member";
import type z from "zod";

export async function checkMember(unsafeData: z.infer<typeof memberSchema>) {
	const data = memberSchema.safeParse(unsafeData);

	if (!data.success) return false;

	return true;
}
