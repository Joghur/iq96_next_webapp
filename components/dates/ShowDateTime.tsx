import ShowDate from "./ShowDate";

type Props = {
	date: string;
	showTime?: boolean;
	formatLargeScreen?: string;
	formatSmallScreen?: string;
};

const ShowDateTime = ({
	date,
	formatLargeScreen = "EEEE - dd. MMMM",
	formatSmallScreen = "EEEE",
}: Props) => {
	return (
		<div className="flex gap-2">
			<ShowDate
				dateString={date}
				formatLargeScreen={formatLargeScreen}
				formatSmallScreen={formatSmallScreen}
			/>
		</div>
	);
};

export default ShowDateTime;
