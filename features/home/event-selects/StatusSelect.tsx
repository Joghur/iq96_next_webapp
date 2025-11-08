import { Label } from "@components/ui/label";
import type { ChangeEvent } from "react";
import type { Event } from "schemas/event";

type Props = {
	event: Event;
	onChange: (
		event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
	) => void;
};

export function StatusSelect({ event, onChange }: Props) {
	return (
		<div className="pt-5">
			<Label
				htmlFor="role"
				className="dynamic_text green_gradient mb-2 block font-medium"
			>
				Status:
			</Label>
			<select
				id="type"
				value={event.type}
				onChange={onChange}
				className="mt-1 p-2 block w-full border-gray-300 dark:border-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
			>
				<option value="done">Færdig</option>
				<option value="next">Aktuel</option>
				<option value="pending">Senere</option>
			</select>
		</div>
	);
}
