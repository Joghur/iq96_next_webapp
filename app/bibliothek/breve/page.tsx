import Link from 'next/link';

import { LibraryCard } from '@components/library/LibraryCard';
import PageLayout from '@components/ui/PageLayout';

export type Folder = { name: string; path: string };

export default async function LettersPage() {
  const currentYear = new Date().getFullYear();
  const startYear = 1997;

  // Create an array of years from 1997 to the current year
  const folders = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => (currentYear - index).toString()
  );

  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Breve</h1>
        </div>

        <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
          {folders.map((folder) => (
            <Link href={`/bibliothek/breve/${folder}`} key={folder}>
              <LibraryCard cardTitle={folder} />
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
