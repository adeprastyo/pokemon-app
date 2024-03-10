interface Props {
  img: string;
  name: string;
  id: number;
}

function PokemonCard(props: Props) {
  const { id, img, name } = props;

  return (
    <div
      className="w-full h-full flex flex-col bg-transparent border-4 border-white text-center  rounded-2xl gap-2"
      key={id}
    >
      <img className="w-full flex-grow p-3" src={img} alt={name} />
      <p className="bg-black rounded-b-2xl p-1 text-lg">{name.toUpperCase()}</p>
    </div>
  );
}

export default PokemonCard;
