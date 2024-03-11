import { createContext, useContext, useState } from "react";
import { IPokemonDetail } from "../apis/pokemon/type";

interface ContextType {
  pokemons: IPokemonDetail[];
  setPokemons: React.Dispatch<React.SetStateAction<IPokemonDetail[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const PokemonContext = createContext<ContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: any) => {
  const [pokemons, setPokemons] = useState<IPokemonDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PokemonContext.Provider
      value={{ pokemons, setPokemons, isLoading, setIsLoading }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export function usePokemons() {
  const context = useContext(PokemonContext);

  if (context === undefined) {
    throw new Error("ERROR, usePokemon must be used within PokemonContext");
  }

  return context;
}
