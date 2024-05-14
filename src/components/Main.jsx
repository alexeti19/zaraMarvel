import React from "react";
import { Card } from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export const Main = () => {
  const [url, setUrl] = useState(
    "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=9ea66d533556a8f2386ecc2c808e5bfb&hash=8d961dd689754b01f5f26f859a306e66&limit=50"
  );
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(url);
      setItem(res.data.data.results);
    };
    fetch();
  }, [url]);

  const searchMarvel = () => {
    setUrl(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=9ea66d533556a8f2386ecc2c808e5bfb&hash=8d961dd689754b01f5f26f859a306e66&limit=50`
    );
  };

  return (
    <>
      <div className="header">
        <div className="search-bar">
          <FaSearch className="lupa" />
          <input
            type="search"
            placeholder="Search Here"
            className="search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={searchMarvel}
          />
        </div>
        <div className="search-results">
          <span>{item ? item.length : "there are no"} results</span>
        </div>
      </div>
      <div className="content">
        {!item ? <p>Not Found</p> : <Card data={item} />}
      </div>
    </>
  );
};
