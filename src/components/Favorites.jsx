import { useFavorites } from "../FavoritesContext";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <>
      <h2 className="favoritesTitle">Favorites</h2>

      <div className="favoritesContent">
        {favorites.map((item, index) => (
          <div key={index} className="favoriteCard card">
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt="img card"
              className="favoritesImg cardImg"
            />
            <div className="cardTitle">
              <h3 className="cardItems">{item.name}</h3>
              <FaHeart className="cardItems" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favorites;
