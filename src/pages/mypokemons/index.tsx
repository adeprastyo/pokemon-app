import Layout from "@/components/layout";
import PokemonCard from "@/components/pokemon-card";
import { IPokemonDetail } from "@/utils/apis/pokemon/type";
import { useEffect, useState } from "react";

export default function MyPokemons() {
  const [pokemons, setPokemons] = useState<IPokemonDetail[]>([]);

  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    setPokemons(getFromLocal);
  }, []);

  return (
    <Layout>
      <div className="overflow-auto h-dvh grid grid-cols-2 p-5 gap-5 bg-gray-800">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            url={pokemon.sprites.other.dream_world.front_default}
            name={pokemon.name}
          />
        ))}
      </div>
    </Layout>
  );
}
