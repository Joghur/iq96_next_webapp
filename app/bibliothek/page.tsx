import Link from 'next/link';

import { LibraryCard } from '@components/library/LibraryCard';
import PageLayout from '@components/ui/PageLayout';

const LibraryPage = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-center pt-6 gap-4">
        <Link href="/bibliothek/galleri">
          <LibraryCard cardTitle="Galleri" />
        </Link>
        <Link href="/bibliothek/breve">
          <LibraryCard cardTitle="Breve" />
        </Link>
        <Link href="/bibliothek/vedtaegter">
          <LibraryCard cardTitle="Vedtægter" />
        </Link>
        <Link href="/bibliothek/sang">
          <LibraryCard cardTitle="Sang" />
        </Link>
      </div>
    </PageLayout>
  );
};

export default LibraryPage;
