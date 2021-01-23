import React from "react";
import Header from "./Header";
import "./../styleCss/App.css";
import Sidebar from "./Sidebar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./Chat";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app__body">
          <Sidebar />

          <Switch>
            <Route path="/room/:roomId" component={Chat} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
