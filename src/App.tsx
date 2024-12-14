import { useState } from "react";
import CharacterCard from "./components/characterCard";
import Button from "./components/button";
import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./queries/characters";
import SkeletonCard from "./components/skeletonCard";
import { ICharacter, ICharactersResponse } from "./types/character";

const App = () => {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("id");
  const { loading: isLoading, data } = useQuery<ICharactersResponse>(
    GET_CHARACTERS,
    {
      variables: { page },
    }
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortField(e.target.value);
  };

  const getSortedCharacters = (characters: ICharacter[]): ICharacter[] => {
    if (!characters) return [];
    const sorted = [...characters];
    return sorted.sort((a, b) => {
      if (sortField === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    });
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="main-content">
          <div className="header">
            <h1 className="title">Characters of Rick & Morty!</h1>
            <div className="sorter">
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortField === "name"}
                  onChange={handleSortChange}
                />
                Sort Name
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="id"
                  checked={sortField === "id"}
                  onChange={handleSortChange}
                />
                Sort ID
              </label>
            </div>
          </div>
          <div className="content">
            {isLoading
              ? [...Array(9)].map((_, index) => <SkeletonCard key={index} />)
              : getSortedCharacters(data?.characters.results || [])
                  .slice(0, 9)
                  .map((character: ICharacter) => (
                    <CharacterCard
                      key={character.id}
                      image={character.image}
                      title={character.name}
                      species={character.species}
                    />
                  ))}
          </div>
        </div>
        <div className="pagination">
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={!data?.characters.info.prev}
          >
            Previous 9
          </Button>
          <Button
            onClick={() =>
              setPage((old) => (data?.characters.info.next ? old + 1 : old))
            }
            disabled={!data?.characters.info.next}
          >
            Next 9
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
