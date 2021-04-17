import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from './Home';
import ItemDetail from './ItemDetail';

const App = () => {
  return (
    <Router>
        <Link to="/">Hacker News - Version Yuki</Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/item/:itemId">
          <ItemDetail />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;