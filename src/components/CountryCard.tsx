import React from "react";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

interface CountryCardProps {
  country: {
    name: { common: string; official: string };
    flags: { png: string; alt: string };
    capital?: string[];
    region: string;
    population: number;
  };
}

const CountryCard = ({ country }: CountryCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in"
      onClick={() => navigate(`/country/${country.name.common}`)}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{country.name.common}</h3>
        <p className="text-sm text-muted-foreground">
          {country.capital?.[0] || "No capital"}
        </p>
        <div className="mt-2 flex justify-between text-sm">
          <span>{country.region}</span>
          <span>{population.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};

export default CountryCard;