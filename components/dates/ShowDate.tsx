import { useTailwindBreakpoint } from "@lib/hooks/useTailwindBreakpoint";
import { format, parseISO } from "date-fns";
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

	return (
		<>
			{format(
				parseISO(dateString),
				isLargeScreen ? formatLargeScreen : formatSmallScreen,
				{
					locale: da,
				},
			)}
		</>
	);
};

export default ShowDate;
