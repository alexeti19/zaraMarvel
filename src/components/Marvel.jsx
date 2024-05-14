import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Marvel = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=9ea66d533556a8f2386ecc2c808e5bfb&hash=8d961dd689754b01f5f26f859a306e66&limit=5`
      );
      if (response.data.data.results.length > 0) {
        setCharacter(response.data.data.results[0]);
        fetchComics(response.data.data.results[0].comics.items);
      }
    };

    const fetchComics = async (comicsArray) => {
      const comicsData = await Promise.all(
        comicsArray.map((comic) =>
          axios.get(
            comic.resourceURI +
              `?ts=1&apikey=9ea66d533556a8f2386ecc2c808e5bfb&hash=8d961dd689754b01f5f26f859a306e66&limit=20`
          )
        )
      );
      setComics(comicsData.map((comic) => comic.data.data.results[0]));
    };

    fetchCharacter();
  }, [id]);

  return (
    <>
      {character ? (
        <div className="boxDetails">
          <div className="characterDetails">
            <div className="right-box">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
            </div>
            <div className="left-box">
              <h1>{character.name}</h1>
              <h4 className="detailsDesc">
                {character.description || "No description available."}
              </h4>
            </div>
          </div>

          <div className="comicsBox">
            <h3 className="comicsTitle">Comics</h3>
            <div className="comics">
              {comics.length > 0 ? (
                comics.map((comic, index) => (
                  <div key={index}>
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt="comic img"
                      className="comicsImg"
                    />
                    <p key={index}>{comic.title}</p>
                  </div>
                ))
              ) : (
                <p>No comics found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Character not found.</p>
      )}
    </>
  );
};
