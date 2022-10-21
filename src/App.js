import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`${dark ? "app-wrapper dark" : "app-wrapper"}`}>
      <div className={"App"}>
        <Header dark={dark} setDark={setDark} />
        <Search />
        <Footer />
      </div>
    </div>
  );
}

export default App;
