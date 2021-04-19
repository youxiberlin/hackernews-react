import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import StoryList from './StoryList';
import getTopStories from '../helper/getTopStories';

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTopStories(0);
        setStories(data);
      } catch (e) {
        console.log(e);
        setStories(stories);
      }
    })();
  }, []);

  return (
    stories.length ? (
      <div className="container bg-light py-3">
        <StoryList stories={stories} pageType="home" />
        <div>
          <Link to='news/1'>More</Link>
        </div>
      </div>
    ) : <Spinner />
   );
};

export default Home;
