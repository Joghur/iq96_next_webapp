"use client";

import Select from "@components/Select";
import type { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { type Member, T_SHIRT_SIZES, type TshirtSizes } from "schemas/member";

interface Props {
	member: Member;
	updatingDoc: (id: string, document: DocumentData) => Promise<void>;
}
const TshirtSelect = ({ member, updatingDoc }: Props) => {
	const [currentSize, setCurrentSize] = useState<TshirtSizes>(
		() => member.tshirt as TshirtSizes,
	);

	useEffect(() => {
		setCurrentSize(member?.tshirt as TshirtSizes);
	}, [member?.tshirt]);

	const handleThemeChange = async (size: TshirtSizes) => {
		setCurrentSize(() => size);
		await updatingDoc(member.id, { tshirt: size });
	};

	return (
		<div className="inline-block">
			<Select
				value={currentSize}
				placeholder={currentSize}
				onChange={(e) => handleThemeChange(e as TshirtSizes)}
				groups={[{ groupItems: T_SHIRT_SIZES }]}
			/>
		</div>
	);
};

export default TshirtSelect;
