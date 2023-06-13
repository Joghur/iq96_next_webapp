import React, { FC, useState } from "react";
import { MapCityType } from "./AddButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  label: string;
  selected: MapCityType;
  cities: string[];
  onChange: (arg0: MapCityType) => void;
}

export const CitySelector: FC<Props> = ({
  label,
  cities,
  selected,
  onChange,
}) => {
  const handleSelectChange = (event: string) => {
    const [year, city] = event.split("-");
    onChange({ year, city });
  };

  return (
    <Select
      value={`${selected.year}-${selected.city}`}
      onValueChange={(value) => handleSelectChange(value)}
    >
      <SelectTrigger className="w-[180px] bg-gray-50">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="bg-gray-50">
        <SelectItem value={label} key={"iq-places"} disabled>
          {label}
        </SelectItem>
        {cities.length > 0 &&
          cities.map((city, index) => (
            <SelectItem key={`city-${index}`} value={city}>
              {city}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CitySelector;
