import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Spinner from './Spinner';
import StoryItem from './StoryItem';
import getTopStories from '../helper/getTopStories';
moment().format();

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getTopStories(0);
      setStories(data);
    })();
  }, []);

  const renderStories = (stories) => stories.map(story => (
      <StoryItem key={story.id} story={story} pageType="home" />
    ));

  return (
    stories.length ? (
      <div className="container bg-light py-3">
        <ol>
        {renderStories(stories)}
        </ol>
        <div>
          <Link to={'news/1'}>More</Link>
        </div>
      </div>
    ) : <Spinner />
   );
};

export default Home;
