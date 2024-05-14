import React from "react";
import "./App.css";
import { Main } from "./components/Main";
import { Routes, Route } from "react-router-dom";
import { Marvel } from "./components/Marvel";
import Navbar from "./components/Navbar";
import Favorites from "./components/Favorites";
import { FavoritesProvider } from "./FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Marvel />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
