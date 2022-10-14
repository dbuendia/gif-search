import logo from "../img/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <button className="btn btn-dark">Dark Mode</button>
    </header>
  );
};

export default Header;
