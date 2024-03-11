import Layout from "@/components/layout";
import { IPokemonDetail } from "@/utils/apis/pokemon/type";
import { useEffect, useState } from "react";

export default function MyPokemons() {
  const [caughtPokemons, setCaughtPokemons] = useState<IPokemonDetail[]>([]);

  useEffect(() => {
    const storedPokemons = JSON.parse(
      localStorage.getItem("caughtPokemons") || "[]"
    );
    setCaughtPokemons(storedPokemons);
  }, []);

  return (
    <Layout>
      <div className="overflow-auto h-dvh grid grid-cols-2 p-5 gap-5 bg-gray-800">
        {caughtPokemons.map((pokemon, i) => (
          <p key={i}>{pokemon.name}</p>
        ))}
      </div>
    </Layout>
  );
}
