'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import { EventLabel } from '@app/bibliothek/galleri/page';
import NewContentBadge from '@components/ui/NewContentBadge';

import { LibraryCard } from '../LibraryCard';

interface Props {
  galleryCategories: EventLabel[];
  badge?: string;
}

const GalleryGrid = ({ galleryCategories, badge }: Props) => {
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
      badgeString.includes('events')
    );
  }

  return (
    <div className="flex m-auto flex-col sm:flex-row gap-4">
      {galleryCategories
        .filter((category) => category.type === 'galleries')
        .map((category: EventLabel, index) => {
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
            <motion.div
              key={`gal${index}`}
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{
                duration: 0.8,
                type: 'tween',
              }}
            >
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
            </motion.div>
          );
        })}
    </div>
  );
};

export default GalleryGrid;
