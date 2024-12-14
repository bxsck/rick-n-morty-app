
export interface ICharacter {
  id: number;
  name: string;
  species: string;
  image: string;
}

export interface ICharactersResponse {
  characters: {
    info: {
      next: boolean;
      prev: boolean;
    };
    results: ICharacter[];
  };
}