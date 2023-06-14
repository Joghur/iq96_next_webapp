import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import React, { forwardRef } from "react";
import { cn } from "@lib/utils";

export interface SelectGroup {
  label?: string;
  groupItems: string[];
}

interface Props {
  value?: string | undefined;
  defaultValue?: string | undefined;
  placeholder?: string | undefined;
  groups: SelectGroup[];
  onChange: (arg0: string) => void;
}

const SelectRadix = ({
  value,
  defaultValue: defaultVal,
  placeholder: ph,
  groups,
  onChange,
}: Props) => (
  <Select.Root value={value} defaultValue={defaultVal} onValueChange={onChange}>
    <Select.Trigger
      className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
      aria-label="Food"
    >
      <Select.Value placeholder={ph} />
      <Select.Icon className="text-violet11">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          {groups.length > 0 &&
            groups.map((group, index) => {
              return (
                <Select.Group key={index}>
                  <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                    {group.label}
                  </Select.Label>
                  {group.groupItems.length > 0 &&
                    group.groupItems.map((value, innerIndex) => {
                      return (
                        <SelectItem key={innerIndex} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                  {groups.length > 1 && (
                    <Select.Separator className="m-[5px] h-[1px] bg-violet6" />
                  )}
                </Select.Group>
              );
            })}
        </Select.Viewport>
        <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

interface SelectItemProps {
  className?: string;
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  textValue?: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={cn(
          "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectRadix;
