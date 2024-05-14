import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const FavoritesContext = createContext(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const addFavorite = (item) => {
    setFavorites(current => [...current, item]);
    setClickCount(current => current + 1);
    navigate("/favorites");
  };

  return (
    <FavoritesContext.Provider value={{ favorites, clickCount, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};


export default FavoritesContext;
