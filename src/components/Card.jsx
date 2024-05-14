import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../FavoritesContext";

export const Card = ({ data }) => {
  let navigate = useNavigate();
  const { addFavorite } = useFavorites();

  const handleHeartClick = (e, item) => {
    e.stopPropagation();
    addFavorite(item);
  };

  const handleCardClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <>
      {data.map((item) => (
        <div className="card" key={item.id}>
          <img
            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
            alt="img card"
            onClick={() => handleCardClick(item.id)}
            className="cardImg"
          />
          <div className="cardTitle">
            <h3 className="cardItems">{item.name}</h3>
            <FaHeart
              className="cardItems"
              onClick={(e) => handleHeartClick(e, item)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
