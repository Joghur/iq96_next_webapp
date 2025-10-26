"use client";

import NewContentBadge from "@components/NewContentBadge";
import PageLayout from "@components/PageLayout";
import { LibraryCard } from "@features/library/LibraryCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";

const LibraryPage = (props: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
	const searchParams = use(props.searchParams);

	const { badge } = searchParams;

	let newGalleryBadgeStrings: string[] = [];
	let newLetterBadgeStrings: string[] = [];

	if (badge) {
		const badgeObj: string[] = JSON.parse(badge);
		newGalleryBadgeStrings = badgeObj.filter((badgeString) =>
			badgeString.includes("gal"),
		);
		newLetterBadgeStrings = badgeObj.filter((badgeString) =>
			badgeString.includes("brev"),
		);
	}

	return (
		<PageLayout>
			<motion.div
				initial={{ x: -100 }}
				animate={{ x: 0 }}
				transition={{ type: "spring", stiffness: 100 }}
				className="py-15 px-5 sm:py-5"
			>
				<div className="flex flex-col sm:flex-row items-center justify-center pt-6 gap-4">
					<div className="relative">
						<Link
							href={{
								pathname: "/bibliothek/galleri",
								query: { badge: JSON.stringify(newGalleryBadgeStrings) },
							}}
						>
							<LibraryCard cardTitle="Galleri" />
						</Link>
						{newGalleryBadgeStrings.length > 0 && (
							<NewContentBadge text="Nyt" />
						)}
					</div>
					<div className="relative">
						<Link
							href={{
								pathname: "/bibliothek/breve",
								query: { badge: JSON.stringify(newLetterBadgeStrings) },
							}}
						>
							<LibraryCard cardTitle="Breve"></LibraryCard>
						</Link>
						{newLetterBadgeStrings.length > 0 && <NewContentBadge text="Nyt" />}
					</div>
					<Link href="/bibliothek/vedtaegter">
						<LibraryCard cardTitle="Vedtægter" />
					</Link>
					<Link href="/bibliothek/sang">
						<LibraryCard cardTitle="Sang" />
					</Link>
				</div>
			</motion.div>
		</PageLayout>
	);
};

export default LibraryPage;
