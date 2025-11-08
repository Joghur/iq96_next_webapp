import type { Event } from "@schemas/event";
import type { ChangeEvent } from "react";

type Props = {
	event: Event;
	onChange: (
		event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
	) => void;
};

export function TypeSelect({ event, onChange }: Props) {
	return (
		<div className="pt-5">
			<label
				htmlFor="role"
				className="dynamic_text green_gradient mb-2 block font-medium"
			>
				Type:
			</label>
			<select
				id="type"
				value={event.type}
				onChange={onChange}
				className="mt-1 p-2 block w-full border-gray-300 dark:border-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
			>
				<option value="tour">Tour</option>
				<option value="gf">Generalforsamling</option>
				<option value="oel">ØL</option>
				<option value="golf">Golf</option>
				<option value="other">Andet</option>
			</select>
		</div>
	);
}
