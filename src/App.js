import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API;
  state={
    progress:0
  }
  increaseProgress=(progress)=>{
   this.setState({progress: progress})
  // this.progress=progress
  // console.log(this.progress)
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  key="general"
                  country="in"
                  category="general"
                  apikey={this.apikey}
                  progress={this.increaseProgress}
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  key="science"
                  country="in"
                  category="science"
                  apikey={this.apikey}
                  progress={this.increaseProgress}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  key="sports"
                  country="in"
                  category="sports"
                  apikey={this.apikey}
                  progress={this.increaseProgress}
                />
              }
            />
            <Route
              path="/music"
              element={<News key="music" country="in" category="music" progress={this.increaseProgress}/>}
            />
            <Route
              path="/health"
              element={<News key="health" country="in" category="health" progress={this.increaseProgress} />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
