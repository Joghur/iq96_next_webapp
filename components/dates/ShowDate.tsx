import { useTailwindBreakpoint } from "@lib/hooks/useTailwindBreakpoint";
import { format, isValid, parseISO } from "date-fns";
import { da } from "date-fns/locale";

type Props = {
	dateString: string;
	formatLargeScreen?: string;
	formatSmallScreen?: string;
};

const ShowDate = ({
	dateString,
	formatLargeScreen = "EEEE - dd. MMMM",
	formatSmallScreen = "EEEE",
}: Props) => {
	const isLargeScreen = useTailwindBreakpoint("md");

	if (!dateString) return null;

	const isoDateString = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
		? `${dateString}T00:00:00`
		: dateString;

	console.log('isoDateString', isoDateString)
	const date = parseISO(isoDateString);
	if (!isValid(date)) {
		return <span>Ugyldig dato</span>;
	}
	return (
		<>
			{format(date, isLargeScreen ? formatLargeScreen : formatSmallScreen, {
				locale: da,
			})}
		</>
	);
};

export default ShowDate;
