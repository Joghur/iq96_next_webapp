'use client';

import { buildUrl } from 'cloudinary-build-url';
import Image from 'next/image';
import { useContext, useEffect } from 'react';

import { ImageGrid } from '@components/library/gallery/ImageGrid';
import { handleStartTheme } from '@components/member/ThemeToggle';
import { authContext } from '@lib/store/auth-context';

import { SearchResult } from '../../page';

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

  useEffect(() => {
    handleStartTheme();
  }, [event, year]);

  if (!authUser) {
    return null;
  }

  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <Image
            key={imageData.public_id}
            src={buildUrl(imageData.public_id, {
              cloud: {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
              },
            })}
            width={650}
            height={356}
            sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
            alt="Her skulle være et sejt IQ billede"
            className="rounded-lg"
          />
        );
      }}
    />
  );
}
