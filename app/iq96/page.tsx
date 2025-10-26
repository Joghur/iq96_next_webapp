"use client";

import PageLayout from "@components/PageLayout";

import AboutTab from "@features/member/AboutTab";
import AdminTab from "@features/member/AdminTab";
import Iq96Tab from "@features/member/Iq96Tab";
import MemberTab from "@features/member/memberMenuBar/MemberTab";
import MemberTabsPage, {
	isTab,
	type MemberTabs,
} from "@features/member/memberMenuBar/MemberTabs";
import { handleStartTheme } from "@features/member/ThemeToggle";
import { authContext } from "@lib/store/auth-context";
import { type MouseEvent, use, useContext, useEffect, useState } from "react";

const MemberPage = (props: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
	const searchParams = use(props.searchParams);

	const { tab } = searchParams;

	const { authUser, documentUser } = useContext(authContext);
	const [value, setValue] = useState<MemberTabs>(isTab(tab) ? tab : "member");

	useEffect(() => {
		handleStartTheme();
	}, []);

	if (!authUser || !documentUser) {
		return null;
	}

	const handleChange = (event: MouseEvent<HTMLButtonElement>) => {
		const { id } = event.target as HTMLButtonElement;
		setValue(() => id as MemberTabs);
	};

	const isSuperAdmin = documentUser?.isSuperAdmin;
	const isBoard = documentUser?.isBoard;

	return (
		<PageLayout>
			<MemberTabsPage value={value} onChange={handleChange} />
			<div className="flex items-center justify-center pt-6">
				{value === "member" && <MemberTab />}
				{value === "iq96" && <Iq96Tab />}
				{value === "about" && <AboutTab />}
				{value === "admin" && (isSuperAdmin || isBoard) && <AdminTab />}
			</div>
		</PageLayout>
	);
};

export default MemberPage;
