import { Button } from "@components/ui/button";
import Link from "next/link";

interface Props {
	label: string;
}

const EventsButton = ({ label }: Props) => {
	return (
		<Button asChild variant="ghost" className="w-full justify-start flex gap-2">
			<Link href={`/bibliothek/galleri/${label.toLowerCase()}`}>{label}</Link>
		</Button>
	);
};

export default EventsButton;
