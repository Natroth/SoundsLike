import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./store";

import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App"></div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>

          <Route exact path="/search" component={Search} />
          <Route exact path="/search_results" component={SearchResults} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
