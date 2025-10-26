"use client";

import type { ChangeEvent } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
	propertyKey: string;
	isChecked: boolean;
	disabled: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FormCheckBox = ({
	propertyKey,
	isChecked,
	disabled,
	onChange,
}: Props) => {
	return (
		<div className="flex items-center gap-2">
			<Checkbox
				id={propertyKey}
				checked={isChecked}
				disabled={disabled}
				onCheckedChange={(checked: boolean | "indeterminate") => {
					const synthetic = {
						target: { checked: !!checked },
					} as unknown as ChangeEvent<HTMLInputElement>;
					onChange(synthetic);
				}}
			/>
			<Label htmlFor={propertyKey}>{propertyKey}</Label>
		</div>
	);
};

export default FormCheckBox;
