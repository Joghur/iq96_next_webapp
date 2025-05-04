'use client';

import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Select from '@components/ui/Select';
import { DocumentUser } from '@lib/hooks/useFirestore';

export const tshirtSizes = ['M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'] as const;

export type TshirtSizes = (typeof tshirtSizes)[number];

interface Props {
  documentUser: DocumentUser;
  updatingDoc: (id: string, document: DocumentData) => Promise<void>;
}
const TshirtSelect = ({ documentUser, updatingDoc }: Props) => {
  const [currentSize, setCurrentSize] = useState<TshirtSizes>(
    () => documentUser.tshirt as TshirtSizes
  );

  useEffect(() => {
    setCurrentSize(documentUser?.tshirt as TshirtSizes);
  }, [documentUser?.tshirt]);

  const handleThemeChange = async (size: TshirtSizes) => {
    setCurrentSize(() => size);
    await updatingDoc(documentUser.id, { tshirt: size });
  };

  return (
    <div className="inline-block">
      <Select
        value={currentSize}
        placeholder={currentSize}
        onChange={(e) => handleThemeChange(e as TshirtSizes)}
        groups={[{ groupItems: tshirtSizes }]}
      />
    </div>
  );
};

export default TshirtSelect;
