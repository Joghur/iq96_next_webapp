import React, { FC } from "react";
import { MapCityType } from "./AddCityButton";
import SelectRadix from "@components/ui/Select";

interface Props {
  label: string;
  selected: MapCityType;
  cities: string[];
  onChange: (arg0: MapCityType) => void;
}

export const CitySelect: FC<Props> = ({
  label,
  cities,
  selected,
  onChange,
}) => {
  const handleSelectChange = (event: string) => {
    const [year, city] = event.split("-");
    onChange({ year, city });
  };

  const selectGroup = { label, groupItems: cities };
  const selectedString = `${selected.year}-${selected.city}`;

  return (
    <SelectRadix
      value={selectedString}
      defaultValue="Vælg by"
      placeholder="Vælg by"
      groups={[selectGroup]}
      onChange={handleSelectChange}
    />
  );
};

export default CitySelect;
