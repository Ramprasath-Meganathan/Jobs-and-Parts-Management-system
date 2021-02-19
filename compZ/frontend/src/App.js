import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Search from "./Search";
import GetAll from "./GetAll";
import Login from "./Login";
import HomePage from "./HomePage";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header></Header>
        </header>
        <div className="centerContent">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/search"
              render={(props) => <Search {...props}></Search>}
            />
            <Route
              path="/getAll"
              render={(props) => <GetAll {...props}></GetAll>}
            />
            <Route
              path="/login/:jobName"
              render={(props) => <Login {...props}></Login>}
            />
            <Route
              path="/homepage"
              render={(props) => <HomePage {...props}></HomePage>}
            />
            <Route
              path="/not-found"
              render={(props) => <NotFound {...props}></NotFound>}
            ></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
