"use client";

import { IqMemberTable } from "./ContactsTab";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { DocumentUser, useFirestore } from "@lib/hooks/useFirestore";

const AdminTab = () => {
  const { docs: users, loading } = useFirestore<DocumentUser>(
    "users",
    "name",
    "asc",
    26
  );

  if (loading) {
    return <LoadingSpinner text={"Henter med-lemmer..."} />;
  }
  if (!users) {
    return null;
  }

  const sortedIqUsers = users
    .filter(
      (o: DocumentUser, index: number) => index < 26 && o?.name !== "IQ96"
    )
    .sort((a: DocumentUser, b: DocumentUser) => {
      const displayNameA = a?.name ?? "";
      const displayNameB = b?.name ?? "";

      return displayNameA.localeCompare(displayNameB);
    });

  return (
    <div className="table-container touch-action-pan-y overflow-y-scroll transition-transform duration-300">
      <div className="scale-120 px-1 sm:py-4 lg:px-10">
        <p className="dynamic_text flex justify-center bg-slate-100 font-semibold">
          Med-lemmer
        </p>
        <IqMemberTable iqUsers={sortedIqUsers} isEditable={false} showAll />
      </div>
    </div>
  );
};

export default AdminTab;
