"use client";

import { MouseEvent, useContext, useState } from "react";

import AboutTab from "@components/member/AboutTab";
import AdminTab from "@components/member/AdminTab";
import Iq96Tab from "@components/member/Iq96Tab";
import ContactsTab from "@components/member/IqMemberTable";
import MemberTab from "@components/member/MemberTab";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import MemberTabsPage, { MemberTabs } from "@components/ui/MemberTabs";
import PageLayout from "@components/ui/PageLayout";
import { authContext } from "@lib/store/auth-context";

const MemberPage = () => {
  const { authUser, documentUser, loading } = useContext(authContext);
  const [value, setValue] = useState<MemberTabs>("member");

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser || !documentUser) {
    return null;
  }

  const handleChange = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.target as HTMLButtonElement;
    setValue(() => id as MemberTabs);
  };

  const isSuperAdmin = documentUser?.isSuperAdmin;
  const isLocalhost = process.env.NEXT_PUBLIC_NODE_ENV === "development";
  const isDev = documentUser?.nick === "Redacteur" && isLocalhost;

  return (
    <PageLayout>
      <MemberTabsPage
        value={value}
        onChange={handleChange}
        isDev
        isSuperAdmin
      />
      <div className="flex items-center justify-center pt-6">
        {value === "member" && <MemberTab />}
        {value === "iq96" && <Iq96Tab />}
        {value === "about" && <AboutTab />}
        {value === "admin" && isSuperAdmin && <AdminTab />}
        {value === "contacts" && isDev && <ContactsTab />}
      </div>
    </PageLayout>
  );
};

export default MemberPage;
