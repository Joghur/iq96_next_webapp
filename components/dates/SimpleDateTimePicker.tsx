import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popoverDialog";

type Props = {
	value?: { date: string; time: string };
	onChange: (value: { date: string; time: string }) => void;
	direction?: "row" | "column";
	showPreview?: boolean;
};

export function SimpleDateTimePicker({
	value,
	onChange,
	direction = "row",
	showPreview = false,
}: Props) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		value?.date ? new Date(value.date) : undefined,
	);
	const [selectedTime, setSelectedTime] = useState(value?.time ?? "");

	const handleDateChange = (date: Date | undefined) => {
		setSelectedDate(date);
		if (date && selectedTime) {
			onChange({
				date: format(date, "yyyy-MM-dd"),
				time: selectedTime,
			});
		}
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const time = e.target.value;
		setSelectedTime(time);
		if (selectedDate && time) {
			onChange({
				date: format(selectedDate, "yyyy-MM-dd"),
				time,
			});
		}
	};

	return (
		<div
			className={cn(
				"items-center gap-2",
				direction === "column" ? "flex flex-col" : "flex",
			)}
		>
			<Input
				type="time"
				value={selectedTime}
				onChange={handleTimeChange}
				className="w-[100px]"
			/>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-[160px] justify-start text-left font-normal",
							!selectedDate && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{selectedDate ? format(selectedDate, "PPP") : "Vælg dato"}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="z-50 w-auto p-0">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={handleDateChange}
						initialFocus
					/>
				</PopoverContent>
			</Popover>

			{showPreview && selectedDate && selectedTime && (
				<div className="text-sm text-muted-foreground ml-2">
					{format(selectedDate, "yyyy-MM-dd")} kl. {selectedTime}
				</div>
			)}
		</div>
	);
}
