"use client";
import ShowDate from "@components/dates/ShowDate";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";

export function ActivityTypeSelect({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Vælg type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="meetingPoint">Mødested</SelectItem>
                <SelectItem value="dinner">Middag</SelectItem>
                <SelectItem value="guidedTour">Guidet tur</SelectItem>
                <SelectItem value="action">Aktivitet</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="meeting">Møde</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
            </SelectContent>
        </Select>
    );
}

export function ActivityDateSelect({
    dateRange,
    value,
    onChange,
}: {
    dateRange: string[];
    value: string
    onChange: (value: string) => void;
}) {

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Vælg dato" />
            </SelectTrigger>
            <SelectContent>
                {dateRange.map((date, index) => <SelectItem key={index} value={date}><ShowDate dateString={date} /></SelectItem>)}
            </SelectContent>
        </Select>
    );
}
