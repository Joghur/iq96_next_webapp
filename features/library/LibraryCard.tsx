import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import type { ReactNode } from "react";

export function LibraryCard({
	cardTitle,
	cardDescription,
	cardFooter,
	children,
	...props
}: {
	cardTitle?: string;
	cardDescription?: string;
	cardFooter?: string;
	children?: ReactNode;
	props?: React.HTMLAttributes<HTMLDivElement>;
}) {
	return (
		<Card className="h-36" {...props}>
			{(cardTitle || cardDescription) && (
				<CardHeader>
					{cardTitle && <CardTitle>{cardTitle}</CardTitle>}
					{cardDescription && (
						<CardDescription>{cardDescription}</CardDescription>
					)}
				</CardHeader>
			)}
			<CardContent>{children}</CardContent>
			{cardFooter && (
				<CardFooter className="flex justify-between">{cardFooter}</CardFooter>
			)}
		</Card>
	);
}
