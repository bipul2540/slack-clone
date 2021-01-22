import React from "react";
import Header from "./Header";
import "./../styleCss/App.css";
import Sidebar from "./Sidebar";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />
        {/** React-router---> chat screens  */}
      </div>
    </div>
  );
};

export default App;
