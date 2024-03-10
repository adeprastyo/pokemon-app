import { IResponse } from "@/utils/types/apiResponse";
import axiosWithConfig from "../axiosWithConfig";
import { IPokemon } from "./type";
import axios from "axios";

export const getPokemons = async () => {
  try {
    const response = await axiosWithConfig("/pokemon");

    return response.data as IResponse<IPokemon[]>;
  } catch (error: any) {
    throw Error(error.response);
  }
};

export const getPokemonDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
};
