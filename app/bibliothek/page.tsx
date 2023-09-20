import Link from 'next/link';

import { LibraryCard } from '@components/library/LibraryCard';
import NewContentBadge from '@components/ui/NewContentBadge';
import PageLayout from '@components/ui/PageLayout';

const LibraryPage = ({
  searchParams: { badge },
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  let newGalleryBadgeStrings: string[] = [];
  let newLetterBadgeStrings: string[] = [];

  if (badge) {
    const badgeObj: string[] = JSON.parse(badge);
    newGalleryBadgeStrings = badgeObj.filter((badgeString) =>
      badgeString.includes('gal')
    );
    newLetterBadgeStrings = badgeObj.filter((badgeString) =>
      badgeString.includes('brev')
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col sm:flex-row items-center justify-center pt-6 gap-4">
        <div className="relative">
          <Link
            href={{
              pathname: '/bibliothek/galleri',
              query: { badge: JSON.stringify(newGalleryBadgeStrings) },
            }}
          >
            <LibraryCard cardTitle="Galleri" />
          </Link>
          {newGalleryBadgeStrings.length > 0 && <NewContentBadge text="Nyt" />}
        </div>
        <div className="relative">
          <Link
            href={{
              pathname: '/bibliothek/breve',
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
    </PageLayout>
  );
};

export default LibraryPage;
