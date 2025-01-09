import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          number={pokemon.pokedexId} 
          name={pokemon.name} 
          image={pokemon.image} 
          stats={pokemon.stats} 
          typeImage={pokemon.types?.[0]?.image || ''} 
        />
      ))}
    </div>
  );
};

export default PokemonList;
