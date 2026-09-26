import PageLayout from "@components/PageLayout";

export type Folder = { name: string; path: string };

export default async function LettersPage(props: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const searchParams = await props.searchParams;


	return (
		<PageLayout>
			<div className="flex flex-col gap-8">
				<div className="flex justify-between">
					<h1 className="text-4xl font-bold">Andre begivenheder</h1>
				</div>

        <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
          Kommer snart
				</div>
			</div>
		</PageLayout>
	);
}
