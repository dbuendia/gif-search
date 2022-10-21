import magnifierIcon from "../img/lupa.svg";
import loadingIcon from "../img/oval-loader.svg";
import friends from "../img/friends.svg";
import { useState } from "react";
import { useEffect } from "react";

const Search = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [lastSearch, setLastSearch] = useState("");
  const [gifs, setGifs] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (search, e) => {
    // Evitamos que se reinicie la página con el comportamiento por defecto de onSubmit
    e.preventDefault();
    setLastSearch(search);
    // Permitimos que se haga la petición
    setFetchData(true);
  };

  // Si se hace click en una tag
  const handleTagClick = (e) => {
    setSearch(e.target.textContent);
    // Nos servirá para comprobar más adelante si debemos mostrar las sugerencias de autocompletado
    setLastSearch(e.target.textContent);
    // Llamamos a la API
    handleSearch(search, e);
  };

  // Realizamos la petición a la API con cada cambio de fetchData
  useEffect(() => {
    setVisible(false); // Necesitamos este setVisible(false) para que por defecto no se muestre después de cada cambio en fetchData. De lo contrario, puede que con el efecto que escucha tags siempre se cumplan las condiciones para que visible sea true.
    const getGifs = async () => {
      setLoading(true);
      let endpoint = `https://api.giphy.com/v1/gifs/search?api_key=1O4a17y8VJJXtXyIK3DwWFj09f5QDNCt&q=${search}&limit=30&offset=0&rating=g&lang=en`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setGifs(data.data);
      setLoading(false);
      // Volvemos a setear el estado de fetchData en false.
      setFetchData(false);
    };

    if (fetchData) {
      getGifs();
    }
  }, [fetchData]);

  useEffect(() => {
    const getTags = async () => {
      let autocompleteEndpoint = `https://api.giphy.com/v1/gifs/search/tags?api_key=1O4a17y8VJJXtXyIK3DwWFj09f5QDNCt&q=${search}`;
      const res = await fetch(autocompleteEndpoint);
      const data = await res.json();
      setTags(data.data);
    };

    if (search.length > 0) {
      getTags();
    }
  }, [search]);

  // Mostramos o no las sugerencias de completación
  useEffect(() => {
    // Si el input es igual a la última búsqueda, no se muestran las sugerencias. Esto hace que:
    // Cuando se hace click en una tag, lastSearch se setea en el valor de esa tag clicada.
    // Así impedimos que se sigan mostrando sugerencias una vez el usuario ha elegido una sugerencia, hasta que el valor de search cambie.
    if (search === lastSearch) {
      setVisible(false);
      // Solo mostramos sugerencias si se han escrito al menos 2 caracteres
    } else if (tags.length > 2) {
      setVisible(true);
    }
  }, [tags]);

  return (
    <main className="App-body">
      <h1 className="title">
        ¡Busca aquí tus <b>GIFS</b> favoritos!
      </h1>
      <div className="search-bar">
        <div className="search-bar-image">
          <img src={friends} alt="friends" />
        </div>
        <form className="form">
          <input
            className={`input ${visible ? "visible-tags" : "hidden-tags"}`}
            type="search"
            placeholder="Busca un GIF"
            value={search}
            onChange={handleSearchInput}
          />
          <button
            type="submit"
            className={`btn-search ${visible ? `visible-tags` : `hidden-tags`}`}
            onClick={(e) => handleSearch(search, e)}
          >
            <img src={magnifierIcon} className="magnifier-icon" alt="lupa" />
          </button>
        </form>
        {visible && (
          <div className="dropdown">
            {/* Iteramos sobre el array de tags y las mostramos */}
            <ul>
              {tags &&
                tags.map((elem) => (
                  <li key={elem.name} className="tag" onClick={handleTagClick}>
                    {elem.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {loading === true ? (
        <img src={loadingIcon} className="loading-icon" alt="loader" />
      ) : (
        <div className="gif-container">
          {gifs !== "" ? (
            <>
              {gifs.length === 0 ? (
                <p>No hay gifs para la búsqueda "{search}" </p>
              ) : (
                gifs.map((elem) => (
                  <a key={elem.id} href={elem.url}>
                    <img className="gif" src={elem.images.original.url} />
                  </a>
                ))
              )}
            </>
          ) : null}
        </div>
      )}
    </main>
  );
};

export default Search;
