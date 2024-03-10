import { useEffect, useState } from "react";
import { IPokemonDetail } from "./utils/apis/pokemon/type";
import { getPokemonDetails, getPokemons } from "./utils/apis/pokemon/api";
import Layout from "./components/layout";

function App() {
  const [datas, setDatas] = useState<IPokemonDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultPokemons = await getPokemons();

        const resultDetails = resultPokemons.results.map((pokemon) =>
          getPokemonDetails(pokemon.url)
        );

        const details = await Promise.all(resultDetails);
        setDatas(details);
      } catch (error) {
        console.log((error as Error).message.toString());
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {datas.map((pokemon, index) => (
        <div
          className="w-full flex flex-col bg-transparent border-4 border-white text-center  rounded-2xl gap-2"
          key={index}
        >
          <img
            className="w-full flex-grow p-3"
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
          />
          <p className="bg-black rounded-b-2xl p-1 text-lg">
            {pokemon.name.toUpperCase()}
          </p>
        </div>
      ))}
    </Layout>

    // <div className="w-full flex justify-center items-center text-white bg-slate-900">
    //   <div className="lg:w-1/3 md:w-2/3 w-full bg-black h-dvh flex flex-col">
    //     {/* top */}
    //     <div className="flex items-center justify-between p-3">
    //       <div className="w-1/2 flex justify-end ms-6">
    //         <img src={pokeball} alt="pokeball" className="w-1/4" />
    //       </div>
    //       <div className="me-3">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           fill="currentColor"
    //           className="w-9 h-9"
    //         >
    //           <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
    //         </svg>

    //         {/* <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           viewBox="0 0 24 24"
    //           fill="currentColor"
    //           className="w-9 h-9"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
    //             clipRule="evenodd"
    //           />
    //         </svg> */}
    //       </div>
    //     </div>

    //     {/* content */}
    //     <div className="overflow-auto grid grid-cols-2 p-5 gap-5 bg-gray-800">
    //       {datas.map((pokemon, index) => (
    //         <div
    //           className="w-full flex flex-col bg-transparent border-4 border-white text-center  rounded-2xl gap-2"
    //           key={index}
    //         >
    //           <img
    //             className="w-full flex-grow p-3"
    //             src={pokemon.sprites.other.dream_world.front_default}
    //             alt={pokemon.name}
    //           />
    //           <p className="bg-black rounded-b-2xl p-1 text-lg">
    //             {pokemon.name.toUpperCase()}
    //           </p>
    //         </div>
    //       ))}
    //     </div>

    //     {/* bottom */}
    //     <div className="flex text-center p-3">
    //       <p className="w-1/2 border-e-2">Home</p>
    //       <p className="w-1/2">My Pokemon</p>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
