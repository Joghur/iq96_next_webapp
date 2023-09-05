import Link from 'next/link';

import { LibraryCard } from '@components/library/LibraryCard';
import PageLayout from '@components/ui/PageLayout';

const LibraryPage = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-center pt-6">
        <Link href="/bibliothek/galleri">
          <LibraryCard cardTitle="Galleri" />
        </Link>
      </div>
    </PageLayout>
  );
};

export default LibraryPage;
