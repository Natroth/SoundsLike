import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./store";

import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import RecPage from "./components/RecPage";

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
          <Route exact path="/recs" component={RecPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
