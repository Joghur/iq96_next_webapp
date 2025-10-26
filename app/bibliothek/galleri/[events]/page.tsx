import NewContentBadge from "@components/NewContentBadge";
import PageLayout from "@components/PageLayout";

import { LibraryCard } from "@features/library/LibraryCard";
import {
	convertLabels,
	prettyImageFolderLabel,
	sortObjectArray,
} from "@lib/utils";
import cloudinary from "cloudinary";
import Link from "next/link";

export type Folder = { name: string; path: string };

export default async function GalleryPage(props: {
	params: Promise<{
		events: string;
	}>;
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const searchParams = await props.searchParams;

	const { badge } = searchParams;

	const params = await props.params;

	const { events } = params;

	const { folders } = (await cloudinary.v2.api.sub_folders(events)) as {
		folders: Folder[];
	};

	let newEventYearBadgeStrings: string[] = [];

	if (badge) {
		const badgeObj: string[] = JSON.parse(badge);
		newEventYearBadgeStrings = badgeObj.map((badgeString) =>
			badgeString.slice(-4),
		);
	}

	const sortedArray = sortObjectArray<Folder>(folders, {
		property: "name",
		order: "desc",
	});

	return (
		<PageLayout>
			<div className="flex flex-col gap-8">
				<div className="flex justify-between">
					<h1 className="text-4xl font-bold">{convertLabels(events)}</h1>
				</div>

				<div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
					{sortedArray.map((folder) => (
						<div key={folder.path} className="relative">
							{newEventYearBadgeStrings.length > 0 &&
								newEventYearBadgeStrings.includes(folder.name.slice(0, 4)) && (
									<NewContentBadge text="Nyt" />
								)}
							<Link href={`/bibliothek/galleri/${events}/${folder.name}`}>
								<LibraryCard cardTitle={prettyImageFolderLabel(folder.name)} />
							</Link>
						</div>
					))}
				</div>
			</div>
		</PageLayout>
	);
}
