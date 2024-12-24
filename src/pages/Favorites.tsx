import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import CountryCard from "@/components/CountryCard";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const fetchFavoriteCountries = async (favorites: string[]) => {
  if (!favorites.length) return [];
  const promises = favorites.map(name =>
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(res => res.json())
      .then(data => data[0])
  );
  return Promise.all(promises);
};

const Favorites = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  const { data: countries, isLoading } = useQuery({
    queryKey: ["favoriteCountries", favorites],
    queryFn: () => fetchFavoriteCountries(favorites),
    enabled: favorites.length > 0,
  });

  const clearFavorites = () => {
    localStorage.setItem("favorites", "[]");
    toast({
      title: "Favorites cleared",
      description: "All countries have been removed from your favorites",
    });
    window.location.reload();
  };

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
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {favorites.length > 0 && (
          <Button
            variant="destructive"
            onClick={clearFavorites}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear Favorites
          </Button>
        )}
      </div>

      <h1 className="mb-8 text-4xl font-bold">Favorite Countries</h1>

      {favorites.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-lg text-muted-foreground">
            You haven't added any countries to your favorites yet.
          </p>
          <Button onClick={() => navigate("/")}>Explore Countries</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries?.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;