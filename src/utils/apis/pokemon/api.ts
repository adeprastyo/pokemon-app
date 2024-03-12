import { IResponse } from "@/utils/types/apiResponse";
import axiosWithConfig from "../axiosWithConfig";
import { IPokemon, IPokemonDetail } from "./type";

export const getPokemons = async () => {
  try {
    const response = await axiosWithConfig("/pokemon");

    return response.data as IResponse<IPokemon[]>;
  } catch (error: any) {
    throw Error(error.response);
  }
};

// export const getPokemonDetails = async (id: string) => {
//   try {
//     const response = await axiosWithConfig(`pokemon/${id}/`);
//     return response.data;
//   } catch (error: any) {
//     throw Error(error);
//   }
// };

export const getDetail = async (name: string) => {
  try {
    const response = await axiosWithConfig(`/pokemon/${name}`);
    return response.data as IPokemonDetail;
  } catch (error: any) {
    throw Error(error);
  }
};
