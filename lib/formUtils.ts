import type { ZodSchema } from "zod";

/**
 * Test DB or form data data. Will print console.error
 */
export const checkFormData = <T>(
    unsafeData: unknown,
    schema: ZodSchema<T>,
): boolean => {
    if (!unsafeData) {
        return false;
    }

    const data = schema.safeParse(unsafeData);
    if (!data.success) {
        console.error(
            "Ugyldige event-data:",
            JSON.stringify(
                {
                    data: unsafeData,
                    errors: data.error.format(),
                },
                null,
                2,
            ),
        );
        return false;
    }

    return true;
};
