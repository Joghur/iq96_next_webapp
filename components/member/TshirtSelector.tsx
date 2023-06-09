"use client";

import { DocumentData } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tooltip from "@components/ui/Tooltip";
import { DocumentUser } from "@lib/hooks/useFirestore";

const sizes = ["M", "L", "XL", "XXL", "XXXL", "XXXXL"] as const;

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
    <Fragment>
      <div className="dynamic_text flex flex-none font-semibold">
        <div className="flex items-center gap-1">
          T-shirt størrelse
          <Tooltip text="Vælg din størrelse. Max for t-shirts er 3XL og for jubilæumstøj 4XL. Vælg derfor din foretrukne og i t-shirt sammenhæng bliver den nedsat til 3XL når der bestilles">
            <MdInfo color="green" />
          </Tooltip>
        </div>
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
    </Fragment>
  );
};

export default TshirtSelector;
