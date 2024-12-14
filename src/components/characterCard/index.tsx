import { FC } from "react";
import "./styles.css";

type CharacterCardProps = {
  image: string;
  title: string;
  species: string;
};

const CharacterCard: FC<CharacterCardProps> = ({ image, title, species }) => {
  return (
    <div className="character-card">
      <img src={image} alt={title} />
      <div className="character-card-content">
        <h2 className="character-card-title">{title}</h2>
        <p className="character-card-species">{species}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
