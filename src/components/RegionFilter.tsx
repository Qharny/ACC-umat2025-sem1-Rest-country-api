import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface RegionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

const RegionFilter = ({ value, onChange }: RegionFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select region" />
      </SelectTrigger>
      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region} value={region.toLowerCase()}>
            {region}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RegionFilter;