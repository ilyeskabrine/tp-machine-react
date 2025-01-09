
import React from 'react';
import Link from 'next/link';

const PokemonCard = ({ number, name, image, typeImage }) => {

   

  return (
    <Link href={`/DetailPage/${number}`}>
    <div className="border rounded-lg p-4 flex flex-col items-center" >
      <div className="self-start text-gray-500">#{number}</div>
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      <div className="mt-2 text-lg font-bold">{name}</div>
      <img src={typeImage} alt={`${name} type`} className="w-6 h-6 mt-2" />
    </div>
    </Link>
  );
};

export default PokemonCard;