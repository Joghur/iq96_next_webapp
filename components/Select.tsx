import { cn } from "@lib/utils";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectRadix from "@radix-ui/react-select";
import type React from "react";
import { Fragment, forwardRef } from "react";

export interface SelectGroup {
	label?: string;
	groupItems: readonly string[];
}

interface Props {
	value?: string | undefined;
	defaultValue?: string | undefined;
	placeholder?: string | undefined;
	groups: SelectGroup[];
	onChange: (arg0: string) => void;
}

const Select = ({
	value,
	defaultValue: defaultVal,
	placeholder: ph,
	groups,
	onChange,
}: Props) => {
	const groupsWithContent = groups.filter((o) => o.groupItems.length > 0);
	const lastContentGroup = groupsWithContent[groupsWithContent.length - 1];

	return (
		<SelectRadix.Root
			value={value}
			defaultValue={defaultVal}
			onValueChange={onChange}
		>
			<SelectRadix.Trigger
				className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-secondary px-[15px] text-[13px] leading-none text-secondary-foreground shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-primary focus:shadow-[0_0_0_2px] focus:shadow-black"
				aria-label="Food"
			>
				<SelectRadix.Value placeholder={ph} />
				<SelectRadix.Icon className="text">
					<ChevronDownIcon />
				</SelectRadix.Icon>
			</SelectRadix.Trigger>
			<SelectRadix.Portal>
				<SelectRadix.Content className="overflow-hidden rounded-md bg-secondary shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
					<SelectRadix.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-primary text-primary-foreground">
						<ChevronUpIcon />
					</SelectRadix.ScrollUpButton>
					<SelectRadix.Viewport className="p-[5px]">
						{groups.length > 0 &&
							groups.map((group, index) => {
								return (
									<SelectRadix.Group key={index}>
										{group.groupItems.length > 0 && (
											<>
												<SelectRadix.Label className="px-[25px] text-xs leading-[25px] text-secondary-foreground">
													{group.label}
												</SelectRadix.Label>
												{group.groupItems.map((value, innerIndex) => {
													return (
														<Fragment key={innerIndex}>
															<SelectItem key={innerIndex} value={value}>
																{value}
															</SelectItem>
														</Fragment>
													);
												})}
												{group.label !== lastContentGroup.label && (
													<SelectRadix.Separator className="m-[5px] h-[1px] bg" />
												)}
											</>
										)}
									</SelectRadix.Group>
								);
							})}
					</SelectRadix.Viewport>
					<SelectRadix.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-primary text-primary-foreground">
						<ChevronDownIcon />
					</SelectRadix.ScrollDownButton>
				</SelectRadix.Content>
			</SelectRadix.Portal>
		</SelectRadix.Root>
	);
};

interface SelectItemProps {
	className?: string;
	children: React.ReactNode;
	value: string;
	disabled?: boolean;
	textValue?: string;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
	({ children, className, ...props }, forwardedRef) => {
		return (
			<SelectRadix.Item
				className={cn(
					"relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
					className,
				)}
				{...props}
				ref={forwardedRef}
			>
				<SelectRadix.ItemText>{children}</SelectRadix.ItemText>
				<SelectRadix.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
					<CheckIcon />
				</SelectRadix.ItemIndicator>
			</SelectRadix.Item>
		);
	},
);

export default Select;
