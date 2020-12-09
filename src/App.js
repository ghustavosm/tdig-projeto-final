import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cadastrar from "./components/Cadastrar";
import Sobre from "./components/Sobre";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route path="/cadastrar">
                <Cadastrar />
            </Route>

            <Route path="/sobre">
                <Sobre />
            </Route>

            {/* <Route> */} 
            <Route exact path="/">  
                <Home />
            </Route>

            <Route path="*">
                <h1>404 - Component Not Found</h1>
                <a href="/">Return Home</a>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;