import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './Header';
import Home from './Home';
import ItemDetail from './ItemDetail';
import News from './News';
import Footer from './Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/news/:pageId">
          <News />
        </Route>
        <Route path="/item/:itemId">
          <ItemDetail />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
