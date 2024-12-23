import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CountryCard from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";
import RegionFilter from "@/components/RegionFilter";
import { Loader2 } from "lucide-react";

const fetchCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (!response.ok) throw new Error("Failed to fetch countries");
  return response.json();
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const { data: countries, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const filteredCountries = countries?.filter((country: any) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion =
      region === "all" ||
      country.region.toLowerCase() === region.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold">World Navigator</h1>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <RegionFilter value={region} onChange={setRegion} />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCountries?.map((country: any) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Index;