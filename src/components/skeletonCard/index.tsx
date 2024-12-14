import "./styles.css";

const SkeletonCard = () => {
  return (
    <div className="character-card skeleton-card">
      <div className="skeleton-image"></div>
      <div className="character-card-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-species"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
