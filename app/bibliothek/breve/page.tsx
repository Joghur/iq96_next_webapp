import NewContentBadge from "@components/NewContentBadge";
import PageLayout from "@components/PageLayout";
import { LibraryCard } from "@features/library/LibraryCard";
import Link from "next/link";

export type Folder = { name: string; path: string };

export default async function LettersPage(props: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const searchParams = await props.searchParams;

	const { badge } = searchParams;

	const currentYear = new Date().getFullYear();
	const startYear = 1996;

	let newLetterYearBadgeStrings: string[] = [];

	if (badge) {
		const badgeObj: string[] = JSON.parse(badge);
		newLetterYearBadgeStrings = badgeObj.map((badgeString) =>
			badgeString.slice(-4),
		);
	}

	// Create an array of years from 1997 to the current year
	const folders = Array.from(
		{ length: currentYear - startYear + 1 },
		(_, index) => (currentYear - index).toString(),
	);

	return (
		<PageLayout>
			<div className="flex flex-col gap-8">
				<div className="flex justify-between">
					<h1 className="text-4xl font-bold">Breve</h1>
				</div>

				<div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
					{folders.map((folder) => (
						<div key={folder} className="relative">
							{newLetterYearBadgeStrings.length > 0 &&
								newLetterYearBadgeStrings.includes(folder) && (
									<NewContentBadge text="Nyt" />
								)}
							<Link href={`/bibliothek/breve/${folder}`}>
								<LibraryCard cardTitle={folder} />
							</Link>
						</div>
					))}
				</div>
			</div>
		</PageLayout>
	);
}
