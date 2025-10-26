import type { SearchResult } from "@app/bibliothek/galleri/page";
import PageLayout from "@components/PageLayout";
import { ForceRefresh } from "@components/ui/force-refresh";
import PdfGrid from "@features/library/PdfGrid";
import cloudinary from "cloudinary";

export default async function VedtagterPage() {
	const results = (await cloudinary.v2.search
		.expression("resource_type:image AND public_id:Vedtægter")
		.sort_by("public_id", "desc")
		.max_results(10)
		.execute()) as { resources: SearchResult[] };

	return (
		<PageLayout>
			<ForceRefresh />
			<div className="flex flex-col">
				<div className="flex justify-between">
					<h1 className="text-4xl font-bold">Vedtægter</h1>
				</div>
				{results.resources.length > 0 ? (
					<PdfGrid pdfs={results.resources} label={false} />
				) : (
					<p>Ingen vedtægter fundet</p>
				)}
			</div>
		</PageLayout>
	);
}
