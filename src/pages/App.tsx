import { useEffect, useState } from "react";

import { getPokemons } from "../utils/apis/pokemon/api";

import Layout from "../components/layout";

import { IPokemon } from "@/utils/apis/pokemon/type";
import { Link } from "react-router-dom";
import PokemonCard from "@/components/pokemon-card";
import { ThemeProvider } from "@/utils/contexts/pokemons";

function App() {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPokemons = async () => {
    try {
      const result = await getPokemons();
      setPokemons(result.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        {isLoading ? (
          <div className="overflow-auto h-dvh flex justify-center items-center p-5 gap-5">
            <>Loading...</>
          </div>
        ) : (
          <>
            <div className="overflow-auto h-dvh grid grid-cols-2 p-5 gap-5 bg-white dark:bg-slate-800">
              {pokemons.map((pokemon, i) => (
                <Link key={i} to={`pokemon/${pokemon.name}`}>
                  <PokemonCard url={pokemon.url} name={pokemon.name} />
                </Link>
              ))}
            </div>
          </>
        )}
      </Layout>
    </ThemeProvider>
  );
}

// function App() {
//   // const [pokemons, setPokemons] = useState<IPokemonDetail[]>([]);
//   const { pokemons, setPokemons, isLoading, setIsLoading } = usePokemons();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         const resultPokemons = await getPokemons();

//         const resultDetails = resultPokemons.results.map((pokemon) =>
//           getPokemonDetails(pokemon.url)
//         );

//         const details = await Promise.all(resultDetails);
//         setPokemons(details);
//       } catch (error) {
//         console.log((error as Error).message.toString());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Layout>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-auto h-dvh grid grid-cols-2 p-5 gap-5 bg-gray-800">
//           {pokemons.map((pokemon) => (
//             <Link key={pokemon.id} to={`pokemon/${pokemon.name}`}>
//               <PokemonCard
//                 id={pokemon.id}
//                 img={pokemon.sprites.other.dream_world.front_default}
//                 name={pokemon.name}
//               />
//             </Link>
//           ))}
//         </div>
//       )}
//     </Layout>
//   );
// }

export default App;
