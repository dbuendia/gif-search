import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import lupa from "./img/lupa.svg";
import loadingIcon from "./img/oval-loader.svg";
import friends from "./img/friends.svg";

function App() {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [clickedTag, setClickedTag] = useState(false);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = (search, e) => {
    e.preventDefault();
    setVisible(false);
    setInput(search);
  };

  const handleTagClick = (e) => {
    setVisible(false);
    setSearch(e.target.textContent);
    setClickedTag(true);
  };

  useEffect(() => {
    setLoading(true);
    let endpoint = `https://api.giphy.com/v1/gifs/search?api_key=1O4a17y8VJJXtXyIK3DwWFj09f5QDNCt&q=${search}&limit=30&offset=0&rating=g&lang=en`;
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setGifs(response.data);
        setLoading(false);
      });
  }, [input]);

  // Cada vez que cambie search (cada vez que cambie el input)
  // Se permite ver el dropdown o no con el estado visible.
  // Se hace la petición para conseguir las tags de autocompletado.

  // Si se ha clicado en alguna tag, no se muestra el dropdown hasta que se haya hecho la petición, donde se vuelve a poner el estado de clickedTag en false.
  useEffect(() => {
    clickedTag === true || search.length === 0
      ? setVisible(false)
      : setVisible(true);
    let autocompleteEndpoint = `https://api.giphy.com/v1/gifs/search/tags?api_key=1O4a17y8VJJXtXyIK3DwWFj09f5QDNCt&q=${search}`;
    fetch(autocompleteEndpoint)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTags(res);
        setClickedTag(false);
      });
  }, [search]);

  return (
    <div className="App">
      <Header />
      <main className="App-body">
        <h1 className="title">
          ¡Inspírate y busca los mejores <b>GIFS</b>!
        </h1>
        <div className="search-bar">
          <div className="friends">
            <img src={friends} alt="friends" />
          </div>
          <form>
            <input
              className={`${visible ? "visible-tags" : "hidden-tags"}`}
              type="search"
              placeholder="Busca un GIF"
              value={search}
              onChange={handleSearchInput}
            />
            <button
              type="submit"
              className={`btn btn-search ${
                visible ? `visible-tags` : `hidden-tags`
              }`}
              onClick={(e) => handleSearchClick(search, e)}
            >
              <img src={lupa} className="lupa-icon" alt="lupa" />
            </button>
          </form>
          {visible && (
            <div className="dropdown">
              {/* Iteramos sobre el array de tags y las mostramos */}
              <li>
                {visible &&
                  tags.data.map((elem) => (
                    <ul
                      key={elem.name}
                      className="tag"
                      onClick={handleTagClick}
                    >
                      {elem.name}
                    </ul>
                  ))}
              </li>
            </div>
          )}
        </div>
        {loading === true ? (
          <img src={loadingIcon} className="loading-icon" alt="loader" />
        ) : (
          <div className="gif-container">
            {input.length > 0 && gifs.length === 0 ? (
              <p>No hay gifs para la búsqueda "{input}" </p>
            ) : (
              gifs.map((elem) => (
                <a key={elem.id} href={elem.url}>
                  <img className="gif" src={elem.images.original.url} />
                </a>
              ))
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
