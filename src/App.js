import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<News key="general" country="in" category="general" />}
            />
            <Route
              path="/science"
              element={<News key="science" country="in" category="science" />}
            />
            <Route
              path="/sports"
              element={<News key="sports" country="in" category="sports" />}
            />
            <Route
              path="/music"
              element={<News key="music" country="in" category="music" />}
            />
            <Route
              path="/health"
              element={<News key="health" country="in" category="health" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
