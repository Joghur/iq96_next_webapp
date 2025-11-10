import { Button } from "@components/ui/button";

const OldPageButton = () => {
	const handleClick = () => {
		window.location.href = process.env.NEXT_PUBLIC_OLDPAGE_LINK || "";
	};

	return (
		<Button
			className="dynamic_text px-4 py-2 backdrop-blur border bg-primary text-primary-foreground border-primary rounded-md hover:bg-secondary hover:text-secondary-foreground transition"
			onClick={handleClick}
		>
			Gammel side
		</Button>
	);
};

export default OldPageButton;
