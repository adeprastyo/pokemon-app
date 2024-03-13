import ReactDOM from "react-dom/client";
import App from "./routes/";
import "./styles/index.css";
import { ThemeProvider } from "./utils/contexts/pokemons";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
