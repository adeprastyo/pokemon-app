export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonDetail {
  id: number;
  abilities: [
    {
      ability: {
        name: string;
      };
      is_hidden: boolean;
      Slot: number;
    }
  ];
  name: string;
  sprites: {
    other: { dream_world: { front_default: string } };
  };
  stats: [
    { base_stat: number; effort: number; stat: { name: string; url: string } }
  ];
  types: [{ slot: number; type: { name: string; url: string } }];
  height: number;
  weight: number;
  moves: [{ move: { name: string } }];
}
