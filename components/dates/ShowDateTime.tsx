import type { DateTimeValue } from "schemas/event";
import ShowDate from "./ShowDate";

type Props = {
	dateTime: DateTimeValue;
	showTime?: boolean;
	formatLargeScreen?: string;
	formatSmallScreen?: string;
};

const ShowDateTime = ({
	dateTime,
	showTime = false,
	formatLargeScreen = "EEEE - dd. MMMM",
	formatSmallScreen = "EEEE",
}: Props) => {
	return (
		<div className="flex gap-2">
			<ShowDate
				dateString={dateTime.date}
				formatLargeScreen={formatLargeScreen}
				formatSmallScreen={formatSmallScreen}
			/>
			{showTime && <div>{dateTime.time}</div>}
		</div>
	);
};

export default ShowDateTime;
