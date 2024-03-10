import { Link } from "react-router-dom";

export default function Bottom() {
  return (
    <div className="flex text-center p-3">
      <Link to="/" className="w-1/2 border-e-2">
        <p>HOME</p>
      </Link>
      <Link to="/mypokemons" className="w-1/2">
        <p>MY POKEMONS</p>
      </Link>
    </div>
  );
}
