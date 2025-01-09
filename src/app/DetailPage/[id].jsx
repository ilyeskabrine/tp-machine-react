// pages/DetailPage/[id].js
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const PokemonDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Récupère l'`id` de l'URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      
      fetch(`https://nestjs-pokedex-api.vercel.app/pokemons/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
          }
          return response.json();
        })
        .then((data) => {
          setPokemon(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]); 

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!pokemon) {
    return <div>Aucun Pokémon trouvé</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold">{pokemon.name}</h1>
      <div className="mt-4 text-gray-500">#{pokemon.id}</div>
      <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 object-contain mt-4" />
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Types</h2>
        <div className="flex space-x-2 mt-2">
          {pokemon.types?.map((type) => (
            <span key={type} className="px-3 py-1 bg-blue-500 text-white rounded-full">
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Stats</h2>
        <ul className="mt-2 space-y-2">
          {pokemon.stats?.map((stat) => (
            <li key={stat.name}>
              <span className="font-semibold">{stat.name}:</span> {stat.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
