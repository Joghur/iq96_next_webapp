"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
	className,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };

// "use client";

// import { Label } from "./ui/label";

// interface Props {
// 	preLabel?: string;
// 	postLabel?: string;
// 	value: boolean;
// 	onChange: () => void;
// }

// const Switch = ({ preLabel, postLabel, value, onChange }: Props) => (
// 	<div>
// 		<div className="flex items-center space-x-2">
// 			{preLabel && <Label htmlFor="theme-mode">{preLabel}</Label>}
// 			<input
// 				type="checkbox"
// 				className="toggle"
// 				onChange={onChange}
// 				checked={value}
// 			/>
// 			{postLabel && <Label htmlFor="theme-mode">{postLabel}</Label>}
// 		</div>
// 	</div>
// );

// export default Switch;
