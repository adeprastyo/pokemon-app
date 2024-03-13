interface Props {
  name: string;
  url: string;
}

function PokemonCard(props: Props) {
  const { name, url } = props;
  const id = url.slice(34).replace(/\/+$/, "");

  let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <div className="flex h-full flex-col rounded-2xl border-4 border-white   shadow-lg shadow-black">
      <div className="flex h-full w-full items-center justify-center">
        <img className="h-auto w-auto p-3" src={imgUrl} alt={name} />
      </div>
      <div className="w-full text-center bg-black rounded-b-2xl p-1 text-lg">
        <p className="uppercase">{name}</p>
      </div>
    </div>
  );
}

export default PokemonCard;
