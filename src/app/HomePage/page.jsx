"use client";

import { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import PokemonList from "../Components/PokemonsList";

export default function PokemonHomePage() {
  const [pokemonData, setPokemonData] = useState([]); // Données des Pokémon
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [selectedType, setSelectedType] = useState(null); // Type sélectionné
  const [limit, setLimit] = useState(50); // Limite par défaut

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        if(limit < 100){
          const response = await fetch(
            "https://nestjs-pokedex-api.vercel.app/pokemons"
          );
        }else{
          const response = await fetch(
            "https://nestjs-pokedex-api.vercel.app/pokemons/?page=2"
          );
        }
        const response = await fetch(
          "https://nestjs-pokedex-api.vercel.app/pokemons"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data = await response.json();
        setPokemonData(data); // Stocker les Pokémon
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [limit]);

  
  const types = [
    { id: "all", name: "All", image: null }, 
    ...Array.from(
      new Map(
        pokemonData.flatMap((pokemon) =>
          pokemon.types.map((type) => [type.id, type])
        )
      ).values()
    ),
  ];

  
  const handleTypeSelect = (type) => {
    setSelectedType(type.id === "all" ? null : type); 
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const filteredPokemon = selectedType
    ? pokemonData.filter((pokemon) =>
        pokemon.types.some((type) => type.id === selectedType.id)
      )
    : pokemonData;

  const limitedPokemon = filteredPokemon.slice(0, limit);

  return (
    <div>
      <Navbar
        types={types}
        onTypeSelect={handleTypeSelect}
        onLimitChange={handleLimitChange}
        selectedLimit={limit}
      />
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p>Erreur : {error}</p>
      ) : (
        <PokemonList pokemons={limitedPokemon} />
      )}
    </div>
  );
}
