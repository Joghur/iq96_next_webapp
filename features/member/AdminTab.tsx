"use client";

import LoadingSpinner from "@components/LoadingSpinner";
import { useFirestore } from "@lib/hooks/useFirestore";
import type { Member } from "schemas/member";
import { IqDataTable } from "./IqDataTable";

const AdminTab = () => {
	const {
		docs: users,
		loading,
		addingDoc,
		deletingDoc,
		updatingDoc,
	} = useFirestore<Member>("users", "name", "asc", 26);

	if (loading) {
		return <LoadingSpinner text={"Henter med-lemmer..."} />;
	}
	if (!users) {
		return null;
	}

	const handleCreateUser = async (user: Member) => {
		await addingDoc(user);
	};

	const handleUpdateUser = async (user: Member) => {
		await updatingDoc(user.id, user);
	};

	const handleDeleteUser = async (id: string) => {
		await deletingDoc(id);
	};

	const sortedIqUsers = users
		.filter((o: Member, index: number) => index < 26 && o?.name !== "IQ96")
		.sort((a: Member, b: Member) => {
			const displayNameA = a?.name ?? "";
			const displayNameB = b?.name ?? "";

			return displayNameA.localeCompare(displayNameB);
		});

	return (
		<div className="overflow-y-scroll">
			<div className="px-1 sm:py-4 lg:px-10">
				<p className="dynamic_text bg-primary text-primary-foreground flex justify-center shadow-lg font-semibold">
					Med-lemmer
				</p>
				<div className="items-start">
					<IqDataTable
						data={sortedIqUsers}
						onCreate={handleCreateUser}
						onUpdate={handleUpdateUser}
						onDelete={handleDeleteUser}
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminTab;
