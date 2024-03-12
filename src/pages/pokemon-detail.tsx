import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { getDetail } from "@/utils/apis/pokemon/api";
import { IPokemonDetail } from "@/utils/apis/pokemon/type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PokemonDetail() {
  const params = useParams();
  const [pokemon, setPokemon] = useState<IPokemonDetail>();

  const fetchData = async () => {
    try {
      const result = await getDetail(params.name!);
      setPokemon(result);
    } catch (error) {
      (error as Error).message.toString();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="overflow-auto bg-gray-800 h-dvh p-3 flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
            <img
              src={pokemon?.sprites.other.dream_world.front_default}
              alt={pokemon?.name}
            />
            <div className="flex justify-center gap-3 mt-3">
              {pokemon?.types.map((type, i) => (
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
            {pokemon?.stats.map((stat, i) => (
              <p key={i}>
                {stat.stat.name} : {stat.base_stat}
              </p>
            ))}
          </div>
        </div>

        <div className="border border-1 border-white rounded-3xl p-5">
          <p className="capitalize">Name : {pokemon?.name}</p>
          <p className="capitalize">Weight : {pokemon?.weight}</p>
          <p className="capitalize">Height : {pokemon?.height}</p>
        </div>

        <div className="flex gap-3">
          <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
            {pokemon?.abilities.map((ability, i) =>
              ability.is_hidden ? (
                <p key={i}></p>
              ) : (
                <p key={i}>{ability.ability.name}</p>
              )
            )}
          </div>

          <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
            {pokemon?.moves.slice(0, 5).map((move, i) => (
              <p key={i}>{move.move.name}</p>
            ))}
          </div>
        </div>

        <div className="mx-auto">
          <Button variant="secondary">Catch!</Button>
        </div>
      </div>
    </Layout>
  );
}

// export default function PokemonDetail() {
//   const { name } = useParams();
//   const { pokemons } = usePokemons();

//   const pokemon = pokemons.find((pokemon) => pokemon.name === name);

//   const handleCatch = () => {
//     localStorage.setItem("caughtPokemon", JSON.stringify(pokemon));
//     console.log("clicked");
//   };

//   return (
//     <Layout>
//       <div className="overflow-auto bg-gray-800 h-dvh p-3 flex flex-col gap-4">
//         <div className="flex gap-3">
//           <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
//             <img
//               src={pokemon?.sprites.other.dream_world.front_default}
//               alt={pokemon?.name}
//             />
//             <div className="flex justify-center gap-3 mt-3">
//               {pokemon?.types.map((type, i) => (
//                 <p
//                   key={i}
//                   className="bg-gray-300 text-black uppercase font-semibold rounded-full px-2 py-1"
//                 >
//                   {type.type.name}
//                 </p>
//               ))}
//             </div>
//           </div>
//           <div className="w-1/2 border border-1  broder-white p-4 rounded-3xl ">
//             {pokemon?.stats.map((stat, i) => (
//               <p key={i}>
//                 {stat.stat.name} : {stat.base_stat}
//               </p>
//             ))}
//           </div>
//         </div>

//         <div className="border border-1 border-white rounded-3xl p-5">
//           <p className="capitalize">Name : {pokemon?.name}</p>
//           <p className="capitalize">Weight : {pokemon?.weight}</p>
//           <p className="capitalize">Height : {pokemon?.height}</p>
//         </div>

//         <div className="flex gap-3">
//           <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
//             {pokemon?.abilities.map((ability, i) =>
//               ability.is_hidden ? (
//                 <p></p>
//               ) : (
//                 <p key={i}>{ability.ability.name}</p>
//               )
//             )}
//           </div>

//           <div className="w-1/2 flex flex-col justify-center items-center border border-1 broder-white px-2 py-4 rounded-3xl shadow-2xl">
//             {pokemon?.moves.slice(0, 5).map((move, i) => (
//               <p key={i}>{move.move.name}</p>
//             ))}
//           </div>
//         </div>

//         <div className="mx-auto">
//           <Button variant="secondary" onClick={handleCatch}>
//             Catch!
//           </Button>
//         </div>
//       </div>
//     </Layout>
//   );
// }
