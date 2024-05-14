import React from "react";
import { useFavorites } from "../FavoritesContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import foto from "../assets/image.png";

const Navbar = () => {
  const { clickCount } = useFavorites();
  let navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/");
  };

  return (
    <div className="navbarBox">
      <nav className="navItems">
        <img
          src={foto}
          alt="Marvel Logo"
          className="marvelLogo"
          onClick={handleCardClick}
        />
        <div className="favoriteBoxIcons">
          <FaHeart className="navbarIcon" />
          <span className="favoriteCount">{clickCount}</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
