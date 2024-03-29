'use client';

import { ReactNode } from 'react';

import { SearchResult } from '@app/bibliothek/galleri/page';

const MAX_COLUMNS = 4;

export function ImageGrid({
  images,
  getImage,
}: {
  images: SearchResult[];
  getImage: (imageData: SearchResult) => ReactNode;
}) {
  function getColumns(colIndex: number) {
    return images.filter((resource, idx) => idx % MAX_COLUMNS === colIndex);
  }

  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (column, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            {column.map(getImage)}
          </div>
        )
      )}
    </div>
  );
}
