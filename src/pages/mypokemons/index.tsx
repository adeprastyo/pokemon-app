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
        <div className="overflow-auto h-dvh grid grid-cols-2 p-5 gap-5 bg-white dark:bg-gray-800">
          {pokemons.map((pokemon) => (
            <div className="flex h-[315px] flex-col rounded-2xl border-4 border-white   shadow-lg shadow-black">
              <div className="flex justify-end">
                <p
                  className="h-8 w-5 justify-items-end text-black dark:text-white hover:text-red-500 cursor-pointer"
                  onClick={() => {
                    handleRemove(pokemon);
                  }}
                >
                  X
                </p>
              </div>
              <Link
                key={pokemon.id}
                to={`../pokemon/${pokemon.name}`}
                className="flex h-full flex-col items-center justify-between"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    className="h-auto w-auto p-3"
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                  />
                </div>

                <div className="w-full text-center bg-black rounded-b-2xl p-1 text-lg">
                  <p className="uppercase">{pokemon.name}</p>
                  <p>({pokemon.alias})</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-auto h-dvh flex justify-center items-center p-5 gap-5 bg-white dark:bg-slate-800 text-black dark:text-white">
          <p>YOU HAVE NO POKEMON</p>
        </div>
      )}
    </Layout>
  );
}
