import magnifierIcon from "../img/lupa.svg";
import loadingIcon from "../img/oval-loader.svg";
import friends from "../img/friends.svg";

const Search = ({
  visible,
  search,
  handleSearchInput,
  handleSearch,
  tags,
  handleTagClick,
  loading,
  gifs,
}) => {
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
