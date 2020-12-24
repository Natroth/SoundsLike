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
import Error from "../src/components/Error";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Redirect to="/search" />
            </Route>

            <Route path="/search" component={Search} />
            <Route path="/search_results" component={SearchResults} />
            <Route path="/recs" component={RecPage} />
            <Route path="/error_page" component={Error} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
