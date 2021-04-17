import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios'

import Home from './Home';
import ItemDetail from './ItemDetail';

const App = () => {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    const getTopStories = async () => {
      const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
      const topStoryIds = data.slice(0, 30);
      const getItemPromises = topStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
      const items = await Promise.all(getItemPromises);
      const itemsData = items.map(item => item.data);
      setStories(itemsData);
    };
    getTopStories();
  }, []);

  return (
    <Router>
        <Link to="/">Hacker News - Version Yuki</Link>
      <Switch>
        <Route exact path="/">
          <Home stories={stories}/>
        </Route>
        <Route path="/item/:itemId">
          <ItemDetail />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
