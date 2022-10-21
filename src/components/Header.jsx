import logo from "../img/logo.svg";

const handleDarkButtonClick = (dark, setDark) => {
  setDark(!dark);
};

const Header = ({ dark, setDark }) => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <button
        className="btn btn-dark"
        onClick={() => handleDarkButtonClick(dark, setDark)}
      >
        Dark Mode
      </button>
    </header>
  );
};

export default Header;
