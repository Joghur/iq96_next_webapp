"use client";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { cn } from "@lib/utils";
import type { FC } from "react";
import type { MapCityType } from "./AddCityButton";

interface Props {
	label: string;
	selected: MapCityType;
	cities: string[];
	onChange: (arg0: MapCityType) => void;
}

export const CitySelect: FC<Props> = ({
	label,
	cities,
	selected,
	onChange,
}) => {
	const triggerClasses = cn(
		"bg-secondary text-secondary-foreground border-primary hover:bg-primary",
		"dark:bg-primary dark:text-primary-foreground dark:border-secondary dark:hover:bg-secondary"
	)

	const handleSelectChange = (event: string) => {
		const [year, city] = event.split("-");
		onChange({ year, city });
	};

	const selectedString = `${selected.year}-${selected.city}`;

	return (
		<Select value={selectedString} onValueChange={handleSelectChange}>
			<SelectTrigger className={triggerClasses}>
				<SelectValue placeholder="Vælg by" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{label}</SelectLabel>
					{cities.map((city) => (
						<SelectItem key={city} value={city}>
							{city}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default CitySelect;
