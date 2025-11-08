import { z } from "zod";

// Typer
export type Member = z.infer<typeof memberSchema>;
export type TshirtSizes = (typeof T_SHIRT_SIZES)[number];
export type Titles = (typeof TITLES)[number];

export const T_SHIRT_SIZES = ["M", "L", "XL", "XXL", "XXXL", "XXXXL"] as const;
export const TITLES = [
	"Med-lem",
	"Kasserer",
	"Formand",
	"Næstformand",
	"Bestyrelsesmed-lem",
	"Inkassateur",
	"Bestyrelsesmed-lemssuppleant",
	"Revisor",
	"Revisorsuppleant",
	"Redacteur",
] as const;

// Schemas
export const memberSchema = z.object({
	id: z.string().min(1),
	uid: z.string().min(1),
	email: z.string().email(),
	avatar: z.string().url().or(z.string().min(1)),
	isAdmin: z.boolean().default(false),
	isBoard: z.boolean().default(false),
	isSuperAdmin: z.boolean().default(false),
	name: z.string().min(1),
	nick: z.string().min(1),
	title: z.string().min(1),
	tshirt: z.enum(T_SHIRT_SIZES).default("L"),
	address: z.string().optional().default(""),
	phones: z.array(z.string().min(1)).optional().default([]),
	birthday: z.string().optional().default(""),
});

export const defaultMember: Member = {
	id: "",
	uid: "",
	email: "",
	avatar: "",
	isAdmin: false,
	isBoard: false,
	isSuperAdmin: false,
	name: "",
	nick: "",
	title: "",
	tshirt: "L",
	address: "",
	phones: [],
	birthday: "",
};
