import App from "@/pages/App";
import MyPokemons from "@/pages/mypokemons";
import PokemonDetail from "@/pages/pokemon-detail";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/mypokemons", element: <MyPokemons /> },
  { path: "pokemon/:name", element: <PokemonDetail /> },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
