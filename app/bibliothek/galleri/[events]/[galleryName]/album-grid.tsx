/** biome-ignore-all lint/performance/noImgElement: <TODO> */
"use client";

import { ImageGrid } from "@features/library/gallery/ImageGrid";
import { authContext } from "@lib/store/auth-context";
import { buildUrl } from "cloudinary-build-url";
import { useContext, useEffect } from "react";

import type { SearchResult } from "../../page";

export default function AlbumGrid({
	images,
	event,
	year,
}: {
	images: SearchResult[];
	event: string;
	year: string;
}) {
	const { authUser } = useContext(authContext);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <TODO>
	useEffect(() => {}, [event, year]);

	if (!authUser) {
		return null;
	}

	return (
		<ImageGrid
			images={images}
			getImage={(imageData: SearchResult) => {
				return (
					<img
						key={imageData.public_id}
						src={buildUrl(imageData.public_id, {
							cloud: {
								cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
							},
						})}
						width="650"
						height="356"
						alt="Her skulle være et sejt IQ billede"
						className="rounded-lg"
					/>
				);
			}}
		/>
	);
}
