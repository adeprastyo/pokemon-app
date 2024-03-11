import Layout from "@/components/layout";
import { usePokemons } from "@/utils/contexts/pokemons";
import { useParams } from "react-router-dom";

export default function PokemonDetail() {
  const { name } = useParams();
  const { pokemons } = usePokemons();
  const selectedPokemon = pokemons.find((pokemon) => pokemon.name === name);

  return (
    <Layout>
      <div className="bg-gray-800 h-dvh p-3">
        <div className="flex gap-3">
          <div className="border border-1 broder-white px-2 py-4 rounded-3xl">
            <img
              src={selectedPokemon?.sprites.other.dream_world.front_default}
              alt={selectedPokemon?.name}
            />
            <div className="flex justify-center gap-3 mt-3">
              {selectedPokemon?.types.map((type) => (
                <p className="bg-gray-300 text-black uppercase font-semibold rounded-full px-2 py-1">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>
          <div className="border border-1 broder-white">
            <p>stats</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
