"use client";

import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentUser } from "@lib/hooks/useFirestore";

const sizes = ["M", "L", "XL", "2XL", "3XL", "4XL"] as const;

export type TshirtSizes = (typeof sizes)[number];

interface Props {
  documentUser: DocumentUser;
  updatingDoc: (id: string, document: DocumentData) => Promise<void>;
}
const TshirtSelector = ({ documentUser, updatingDoc }: Props) => {
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
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
      <div>
        <p className="dynamic_text flex flex-none font-semibold">
          T-shirt størrelse:
        </p>
      </div>
      <Select
        value={currentSize}
        onValueChange={(e) => handleThemeChange(e as TshirtSizes)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={currentSize} />
        </SelectTrigger>
        <SelectContent className="bg-gray-50">
          {sizes.map((o, index) => (
            <SelectItem value={o} key={index}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TshirtSelector;
