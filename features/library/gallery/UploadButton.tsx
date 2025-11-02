"use client";

import {
	type NotificationDbType,
	SavingBadgeStatusToLocalStorage,
} from "@components/BottomNav";
import { Button } from "@components/ui/button";
import { useFirestore } from "@lib/hooks/useFirestore";
import { usePathname, useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";

interface Props {
	folder?: string;
}

const getStringAfterLastSlash = (inputString: string): string => {
	const parts = inputString.split("/");
	return parts.pop() || "";
};

const getBadgeString = (
	folder: string | undefined,
	currentPage: string,
): string => {
	const folderParts = folder?.split("/");
	if (folderParts && folderParts?.length > 0) {
		if (folderParts[0] === "letters") {
			const year = getStringAfterLastSlash(currentPage);
			return `bib-brev-${year}`;
		} else {
			const year = folderParts[1]?.split("-")[0];
			return `bib-gal-${folderParts[0]}-${year}`;
		}
	}
	return "";
};

const UploadButton = ({ folder }: Props) => {
	const router = useRouter();
	const currentPage = usePathname();

	const { addingDoc } = useFirestore<NotificationDbType>(
		"notification",
		"updatedAt",
	);

	useEffect(() => {
		const badgeString = getBadgeString(folder, currentPage);
		if (badgeString !== "") {
			SavingBadgeStatusToLocalStorage(badgeString);
		}
	}, [currentPage, folder]);

	const handleUpload = async () => {
		const badgeString = getBadgeString(folder, currentPage);
		await addingDoc(
			{
				updatedAt: new Date(),
			},
			badgeString,
		);
		async () => {
			setTimeout(() => {
				router.refresh();
			}, 1000);
		};
	};

	return (
		<Button asChild variant="default">
			<div className="flex gap-2 items-center">
				<MdCloudUpload />
				<CldUploadButton
					options={{
						folder: folder,
					}}
					uploadPreset="mihetffc"
					public-id={folder}
					onSuccess={handleUpload}
				/>
			</div>
		</Button>
	);
};

export default UploadButton;
