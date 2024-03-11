import ReactDOM from "react-dom/client";
import App from "./routes/";
import "./styles/index.css";
import { PokemonProvider } from "./utils/contexts/pokemons";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PokemonProvider>
    <App />
  </PokemonProvider>
);
