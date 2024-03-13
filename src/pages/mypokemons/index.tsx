import Layout from "@/components/layout";

import { IPokemonDetail } from "@/utils/apis/pokemon/type";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyPokemons() {
  const [pokemons, setPokemons] = useState<IPokemonDetail[]>([]);

  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    setPokemons(getFromLocal);
  }, []);

  const handleRemove = (item: IPokemonDetail) => {
    const filterData = pokemons.filter((pokemon) => pokemon !== item);
    localStorage.setItem("myPokemons", JSON.stringify(filterData));
    setPokemons(filterData);
  };

  return (
    <Layout>
      {pokemons.length > 0 ? (
        <div className="overflow-auto h-dvh grid grid-cols-2 p-5 gap-5 bg-gray-800">
          {pokemons.map((pokemon) => (
            <div className="w-full h-fit flex flex-col bg-transparent border-4 border-white text-center  rounded-2xl gap-2">
              <p
                className="text-end px-2 py-1 font-semibold hover:text-red-500 cursor-pointer"
                onClick={() => {
                  handleRemove(pokemon);
                }}
              >
                X
              </p>
              <Link
                key={pokemon.id}
                to={`../pokemon/${pokemon.name}`}
                className="flex flex-col h-fit"
              >
                <img
                  className="w-full flex-grow p-3"
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.name}
                />
                <p className="bg-black rounded-b-2xl p-1 text-lg">
                  {pokemon.name.toUpperCase()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-auto h-dvh flex justify-center items-center p-5 gap-5 bg-gray-800 ">
          <p>YOU HAVE NO POKEMON</p>
        </div>
      )}
    </Layout>
  );
}
