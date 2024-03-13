import Layout from "@/components/layout";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { getDetail } from "@/utils/apis/pokemon/api";
import { IPokemonDetail } from "@/utils/apis/pokemon/type";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PokemonDetail() {
  const params = useParams();
  const [pokemon, setPokemon] = useState<IPokemonDetail>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alias, setAlias] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await getDetail(params.name!);
      setPokemon(result);
      setIsLoading(false);
    } catch (error) {
      (error as Error).message.toString();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCatch = () => {
    var halfChance = Math.random() * 100;
    if (halfChance > 50) {
      setShowModal(true);
    } else {
      alert("You missed!");
    }
  };

  const handleSubmitPokemon = () => {
    const getFromLocal = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    const findIfExist = getFromLocal.find(
      (x: IPokemonDetail) => x.alias == alias
    );

    if (findIfExist) {
      alert(`Alias ${alias} is already exist!`);
    } else {
      const dupe = Object.assign({}, pokemon);
      dupe.alias = alias;
      getFromLocal.push(dupe);
      localStorage.setItem("myPokemons", JSON.stringify(getFromLocal));
      navigate("/");
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <div className="overflow-auto h-dvh flex justify-center items-center p-5 gap-5 bg-white dark:bg-gray-800 ">
          <>Loading...</>
        </div>
      ) : (
        <>
          <div className="overflow-auto h-dvh p-3 flex flex-col gap-4 bg-white dark:bg-gray-800 text-black dark:text-white">
            <div className="flex gap-3">
              <div className="w-1/2 flex flex-col justify-center items-center px-2 py-4 rounded-3xl shadow-lg shadow-black border border-1 border-black dark:border-white">
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
              <div className="w-1/2 p-4 rounded-3xl border border-1 border-black dark:border-white shadow-lg shadow-black shadow-black">
                {pokemon?.stats.map((stat, i) => (
                  <p key={i}>
                    {stat.stat.name} : {stat.base_stat}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-5 border border-1 border-black dark:border-white shadow-lg shadow-black shadow-black">
              <p className="capitalize">Name : {pokemon?.name}</p>
              <p className="capitalize">Weight : {pokemon?.weight}</p>
              <p className="capitalize">Height : {pokemon?.height}</p>
            </div>

            <div className="flex gap-3">
              <div className="w-1/2 flex flex-col justify-center items-center px-2 py-4 rounded-3xl shadow-lg shadow-black shadow-black border border-1 border-black dark:border-white">
                {pokemon?.abilities.map((ability, i) =>
                  ability.is_hidden ? (
                    <p key={i}></p>
                  ) : (
                    <p key={i}>{ability.ability.name}</p>
                  )
                )}
              </div>

              <div className="w-1/2 flex flex-col justify-center items-center px-2 py-4 rounded-3xl shadow-lg shadow-black shadow-black border border-1 border-black dark:border-white">
                {pokemon?.moves.slice(0, 5).map((move, i) => (
                  <p key={i}>{move.move.name}</p>
                ))}
              </div>
            </div>

            <div className="mx-auto">
              <Button
                onClick={() => {
                  handleCatch();
                }}
                className="dark:bg-white shadow-lg shadow-black"
              >
                Catch!
              </Button>
            </div>
          </div>
        </>
      )}

      <Modal show={showModal}>
        <div className="mb-5">
          <p className="text-center font-arcade text-xs font-bold tracking-wide text-neutral-800 dark:text-white">
            Congratulation!
          </p>
          <p className="text-center font-arcade text-xs font-bold tracking-wide text-neutral-800 dark:text-white">
            You caught {pokemon?.name}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <label className="block">
            <span className="block font-arcade text-sm font-medium text-neutral-800 dark:text-white">
              Nickname
            </span>
            <input
              className="text-black block w-full rounded-md border border-slate-300 bg-white py-2 px-3 font-arcade text-xs shadow-sm placeholder:italic focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              type="text"
              onChange={(e) => setAlias(e.target.value)}
            />
          </label>
          <button
            className="mt-4 rounded-xl border p-3 text-center font-arcade text-xs tracking-wide text-neutral-800 dark:text-white"
            onClick={() => handleSubmitPokemon()}
          >
            Submit
          </button>
        </div>
      </Modal>
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
