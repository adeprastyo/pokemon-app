import { useEffect, useState } from "react";
import { IPokemonDetail } from "../utils/apis/pokemon/type";
import { getPokemonDetails, getPokemons } from "../utils/apis/pokemon/api";
import Layout from "../components/layout";
import PokemonCard from "../components/pokemon-card";
import { Link } from "react-router-dom";

function App() {
  const [pokemons, setPokemons] = useState<IPokemonDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultPokemons = await getPokemons();

        const resultDetails = resultPokemons.results.map((pokemon) =>
          getPokemonDetails(pokemon.url)
        );

        const details = await Promise.all(resultDetails);
        setPokemons(details);
      } catch (error) {
        console.log((error as Error).message.toString());
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {pokemons.map((pokemon) => (
        <Link to={`pokemon/${pokemon.name}`}>
          <PokemonCard
            id={pokemon.id}
            img={pokemon.sprites.other.dream_world.front_default}
            name={pokemon.name}
          />
        </Link>
      ))}
    </Layout>
  );
}

export default App;
