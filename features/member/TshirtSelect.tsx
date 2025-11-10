"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@components/ui/select";
import { cn } from "@lib/utils";
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

	const triggerClasses = cn(
		"bg-secondary text-secondary-foreground border-primary hover:bg-primary",
		"dark:bg-primary dark:text-primary-foreground dark:border-secondary dark:hover:bg-secondary"
	)
	return (
		<div className="inline-block">
			{/* <Select
				value={currentSize}
				placeholder={currentSize}
				onChange={(e) => handleThemeChange(e as TshirtSizes)}
				groups={[{ groupItems: T_SHIRT_SIZES }]}
			/> */}
			<Select value={currentSize} onValueChange={handleThemeChange}>
				<SelectTrigger className={triggerClasses}>
					<SelectValue placeholder="Vælg by" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{T_SHIRT_SIZES.map((size) => (
							<SelectItem key={size} value={size}>
								{size}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default TshirtSelect;
