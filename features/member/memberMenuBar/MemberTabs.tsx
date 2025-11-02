import LoadingSpinner from "@components/LoadingSpinner";
import { Button } from "@components/ui/button";
import { authContext } from "@lib/store/auth-context";
import { type MouseEvent, useContext } from "react";

const tabs = ["member", "iq96", "about", "admin"] as const;
export type MemberTabs = (typeof tabs)[number];

export const isTab = (tab: string | undefined): tab is MemberTabs => {
	if (!tab) return false;
	return tabs.includes(tab as MemberTabs);
};

interface Props {
	value?: MemberTabs;
	onChange: (event: MouseEvent<HTMLButtonElement>) => void;
}

const MemberTabsPage = ({ value, onChange }: Props) => {
	const { authUser, documentUser, loading } = useContext(authContext);

	if (loading) return <LoadingSpinner />;
	if (!authUser || !documentUser) return null;

	return (
		<div className="pl-8 sm:pl-0 mb-5 mt-2 sm:mt-10 sm:mb-10 flex w-full justify-center">
			<div className="flex flex-wrap justify-center gap-0.5 sm:gap-2">
				<Button
					id="member"
					onClick={onChange}
					variant={value === "member" ? "secondary" : "outline"}
				>
					{documentUser.nick}
				</Button>
				<Button
					id="iq96"
					onClick={onChange}
					variant={value === "iq96" ? "secondary" : "outline"}
				>
					IQ96
				</Button>
				<Button
					id="about"
					onClick={onChange}
					variant={value === "about" ? "secondary" : "outline"}
				>
					Om
				</Button>
				{(documentUser.isSuperAdmin || documentUser.isBoard) && (
					<Button
						id="admin"
						onClick={onChange}
						variant={value === "admin" ? "secondary" : "outline"}
					>
						Admin
					</Button>
				)}
			</div>
		</div>
	);
};

export default MemberTabsPage;
