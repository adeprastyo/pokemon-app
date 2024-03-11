import Layout from "@/components/layout";
import { usePokemons } from "@/utils/contexts/pokemons";
import { useParams } from "react-router-dom";

export default function PokemonDetail() {
  const { name } = useParams();
  const { pokemons } = usePokemons();
  const selectedPokemon = pokemons.find((pokemon) => pokemon.name === name);

  return (
    <Layout>
      <div>
        <img
          src={selectedPokemon?.sprites.other.dream_world.front_default}
          alt={selectedPokemon?.name}
        />
        <p>{selectedPokemon?.name}</p>
        <p>{selectedPokemon?.height}</p>
        <p>{selectedPokemon?.weight}</p>
      </div>
    </Layout>
  );
}
