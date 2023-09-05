'use client';

import { useContext, useEffect } from 'react';

import CloudinaryImage from '@components/library/gallery/cloudinary-image';
import { ImageGrid } from '@components/library/gallery/ImageGrid';
import { handleStartTheme } from '@components/member/ThemeToggle';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import { authContext } from '@lib/store/auth-context';

import { SearchResult } from '../../page';

export default function AlbumGrid({ images }: { images: SearchResult[] }) {
  const { authUser, loading } = useContext(authContext);

  useEffect(() => {
    handleStartTheme();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!authUser) {
    return null;
  }

  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            src={imageData.public_id}
            width="400"
            height="300"
            alt="Her skulle være et sejt IQ billede"
          />
        );
      }}
    />
  );
}
