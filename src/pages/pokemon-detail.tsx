import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { usePokemons } from "@/utils/contexts/pokemons";
import { useParams } from "react-router-dom";

export default function PokemonDetail() {
  const { name } = useParams();
  const { pokemons } = usePokemons();

  const selectedPokemon = pokemons.find((pokemon) => pokemon.name === name);

  const handleCatch = () => {
    localStorage.setItem("caughtPokemon", JSON.stringify(selectedPokemon));
    console.log("clicked");
  };

  return (
    <Layout>
      <div className="overflow-auto bg-gray-800 h-dvh p-3 flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
            <img
              src={selectedPokemon?.sprites.other.dream_world.front_default}
              alt={selectedPokemon?.name}
            />
            <div className="flex justify-center gap-3 mt-3">
              {selectedPokemon?.types.map((type, i) => (
                <p
                  key={i}
                  className="bg-gray-300 text-black uppercase font-semibold rounded-full px-2 py-1"
                >
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>
          <div className="w-1/2 border border-1  broder-white p-4 rounded-3xl ">
            {selectedPokemon?.stats.map((stat, i) => (
              <p key={i}>
                {stat.stat.name} : {stat.base_stat}
              </p>
            ))}
          </div>
        </div>

        <div className="border border-1 border-white rounded-3xl p-5">
          <p className="capitalize">Name : {selectedPokemon?.name}</p>
          <p className="capitalize">Weight : {selectedPokemon?.weight}</p>
          <p className="capitalize">Height : {selectedPokemon?.height}</p>
        </div>

        <div className="flex gap-3">
          <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
            {selectedPokemon?.abilities.map((ability, i) =>
              ability.is_hidden ? (
                <p></p>
              ) : (
                <p key={i}>{ability.ability.name}</p>
              )
            )}
          </div>

          <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
            {selectedPokemon?.moves.slice(0, 5).map((move, i) => (
              <p key={i}>{move.move.name}</p>
            ))}
          </div>
        </div>

        <div className="mx-auto">
          <Button variant="secondary" onClick={handleCatch}>
            Catch!
          </Button>
        </div>
      </div>
    </Layout>
  );
}
