"use client";

import { ReactNode, useState } from "react";
import { toast } from "react-toastify";

import Popup from "@/components/ui/popup/Popup";
import { isArray } from "@/utils/array";

type FlowBinderName = {
  flowBinderName: string;
};

type Props = {
  id?: string | number;
  popupLabel: string;
  children: ReactNode;
};

const ButtonPopup = ({ id, popupLabel, children }: Props) => {
  const [fetchedData, setFetchedData] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = async () => {
    if (id && fetchedData.length === 0) {
      const response = await getsomething(id?.toString());

      if (isArray(response) && response?.length > 0) {
        setFetchedData(
          (response as FlowBinderName[]).map(
            (fetchedDataItem) => fetchedDataItem.flowBinderName,
          ),
        );
        setShowModal(true);
      } else {
        toast("Der er ingen flowbinders tilknyttet denne submitter", {
          type: "error",
        });
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <BorderButton onClick={handleShowModal}>{children}</BorderButton>
      <Popup
        values={fetchedData}
        popupLabel={popupLabel}
        open={showModal}
        onModalClose={handleCloseModal}
      />
    </>
  );
};

export default ButtonPopup;
