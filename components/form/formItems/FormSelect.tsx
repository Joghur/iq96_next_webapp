/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import { getLabelOrType, type SelectLabelType } from "@lib/form";
import { useEffect, useMemo, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Props = {
	label: string; // (ikke brugt i selve select'en – beholdes for kompatibilitet)
	value?: string; // "type" (din nuværende værdi)
	selection: SelectLabelType<any, any>[];
	disabled: boolean;
	onChange: (value: string) => void; // sender "type" tilbage
};

const FormSelect: React.FC<Props> = ({
	value,
	selection,
	disabled,
	onChange,
}) => {
	// find label for nuværende type (samme logik som før)
	const initialLabel = useMemo(
		() =>
			getLabelOrType(
				(value ?? "THIS SHOULD NOT SHOW").toString(),
				"toLabel",
				selection,
			) ?? "",
		[value, selection],
	);

	const [selectedLabel, setSelectedLabel] = useState<string>(initialLabel);

	// Hold lokal label i sync, hvis parent ændrer value-prop
	useEffect(() => {
		setSelectedLabel(initialLabel);
	}, [initialLabel]);

	const handleChange = (nextLabel: string) => {
		setSelectedLabel(nextLabel);
		const asType = getLabelOrType(nextLabel, "toType", selection);
		onChange((asType ?? "").toString());
	};

	return (
		<Select
			disabled={disabled}
			value={selectedLabel}
			onValueChange={handleChange}
		>
			<SelectTrigger className="bg-muted">
				{" "}
				{/* erstatter 'bg-light' */}
				<SelectValue placeholder="" />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="">{""}</SelectItem>

				{selection?.map((item, idx) => {
					const labelText = item.label?.toString() ?? "";
					return (
						<SelectItem key={idx} value={labelText}>
							{labelText}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

export default FormSelect;
