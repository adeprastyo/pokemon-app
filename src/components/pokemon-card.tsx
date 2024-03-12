interface Props {
  name: string;
  url: string;
}

function PokemonCard(props: Props) {
  const { name, url } = props;
  const id = url.slice(34).replace(/\/+$/, "");

  let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <div className="w-full h-full flex flex-col bg-transparent border-4 border-white text-center  rounded-2xl gap-2">
      <img className="w-full flex-grow p-3" src={imgUrl} alt={name} />
      <p className="bg-black rounded-b-2xl p-1 text-lg">{name.toUpperCase()}</p>
    </div>
  );
}

export default PokemonCard;
