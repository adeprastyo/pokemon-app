import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

// import { createContext, useContext, useState } from "react";

// interface ThemeType {
//   theme: string;
//   setTheme: React.Dispatch<React.SetStateAction<string>>;
// }

// const ThemeContext = createContext<ThemeType | undefined>(undefined);

// export const ThemeProvider = ({ children }: any) => {
//   const [theme, setTheme] = useState("dark");

//   return (
//     <ThemeContext.Provider
//       value={{
//         theme,
//         setTheme,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export function useTheme() {
//   const context = useContext(ThemeContext);

//   if (context === undefined) {
//     throw new Error("ERROR, usePokemon must be used within PokemonContext");
//   }

//   return context;
// }

// interface ContextType {
//   pokemons: IPokemonDetail[];
//   setPokemons: React.Dispatch<React.SetStateAction<IPokemonDetail[]>>;
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const PokemonContext = createContext<ContextType | undefined>(undefined);

// export const PokemonProvider = ({ children }: any) => {
//   const [pokemons, setPokemons] = useState<IPokemonDetail[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   return (
//     <PokemonContext.Provider
//       value={{
//         pokemons,
//         setPokemons,
//         isLoading,
//         setIsLoading,
//       }}
//     >
//       {children}
//     </PokemonContext.Provider>
//   );
// };

// export function usePokemons() {
//   const context = useContext(PokemonContext);

//   if (context === undefined) {
//     throw new Error("ERROR, usePokemon must be used within PokemonContext");
//   }

//   return context;
// }
