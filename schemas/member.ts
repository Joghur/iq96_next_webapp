import { z } from "zod";

// Typer
export type Member = z.infer<typeof memberSchema>;
export type TshirtSizes = Member["tshirt"]
export type Titles = Member["title"];

export const T_SHIRT_SIZES = ["M", "L", "XL", "XXL", "XXXL", "XXXXL"] as const;
export const TITLES = [
	"Bestyrelsesmed-lem",
	"Bestyrelsesmed-lemssuppleant",
	"Formand",
	"Inkassateur",
	"Kasserer",
	"Med-lem",
	"Næstformand",
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
	isAdmin: z.boolean(),
	isBoard: z.boolean(),
	isSuperAdmin: z.boolean(),
	name: z.string().min(1),
	nick: z.string().min(1),
	title: z.enum(TITLES),
	tshirt: z.enum(T_SHIRT_SIZES),
	address: z.string().optional(),
	phones: z.array(z.string().min(1)).optional(),
	birthday: z.string().optional(),
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
	title: "Med-lem",
	tshirt: "L",
	address: "",
	phones: [],
	birthday: "",
};
