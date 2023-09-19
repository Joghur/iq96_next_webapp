import Link from 'next/link';
import { ReactNode } from 'react';

import { LibraryCard } from '@components/library/LibraryCard';
import NewContentBadge from '@components/ui/NewContentBadge';
import PageLayout from '@components/ui/PageLayout';

import { galleryCategories } from '../layout';

export type SearchResult = {
  public_id: string;
  tags: string[];
  pages?: string;
  filename: string;
};

export type LibraryTypes = 'letters' | 'galleries' | 'song';

export type EventLabel = {
  label: string;
  shortLabel: string;
  icon: ReactNode;
  type: LibraryTypes;
};

const GalleryPage = async ({
  searchParams: { badge },
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  let newEventBadgeStrings: string[] = [];
  let newTourBadgeStrings: string[] = [];
  let newGfBadgeStrings: string[] = [];

  if (badge) {
    const badgeObj: string[] = JSON.parse(badge);
    newTourBadgeStrings = badgeObj.filter((badgeString) =>
      badgeString.includes('tour')
    );
    newGfBadgeStrings = badgeObj.filter((badgeString) =>
      badgeString.includes('gf')
    );
    newEventBadgeStrings = badgeObj.filter((badgeString) =>
      badgeString.includes('st')
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Galleri</h1>
          {/* <UploadButton /> */}
        </div>
        <div className="flex m-auto flex-col gap-4">
          {galleryCategories
            .filter((category) => category.type === 'galleries')
            .map((category: EventLabel) => {
              let newBadgeStrings: string[] = [];

              switch (category.shortLabel) {
                case 'events':
                  newBadgeStrings = newEventBadgeStrings;
                  break;

                case 'gf':
                  newBadgeStrings = newGfBadgeStrings;
                  break;

                default:
                  newBadgeStrings = newTourBadgeStrings;
                  break;
              }

              return (
                <div key={category.shortLabel} className="relative">
                  <Link
                    href={{
                      pathname: `/bibliothek/galleri/${category.shortLabel}`,
                      query: { badge: JSON.stringify(newBadgeStrings) },
                    }}
                  >
                    <LibraryCard cardTitle={category.label} />
                  </Link>
                  {newTourBadgeStrings.length > 0 &&
                    category.shortLabel === 'tour' && (
                      <NewContentBadge text="Nyt" />
                    )}
                  {newGfBadgeStrings.length > 0 &&
                    category.shortLabel === 'gf' && (
                      <NewContentBadge text="Nyt" />
                    )}
                  {newEventBadgeStrings.length > 0 &&
                    category.shortLabel === 'events' && (
                      <NewContentBadge text="Nyt" />
                    )}
                </div>
              );
            })}
        </div>
      </div>
    </PageLayout>
  );
};

export default GalleryPage;
