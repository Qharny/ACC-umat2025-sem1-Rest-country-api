import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CountryCard from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";
import RegionFilter from "@/components/RegionFilter";
import { Loader2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const fetchCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (!response.ok) throw new Error("Failed to fetch countries");
  return response.json();
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const navigate = useNavigate();

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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">World Navigator</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/favorites")}
          className="flex items-center gap-2"
        >
          <Heart className="h-4 w-4" />
          Favorites
        </Button>
      </div>
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