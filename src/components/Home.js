import { useState, useEffect } from 'react';
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
      try {
        const data = await getTopStories(0);
        setStories(data);
      } catch (e) {
        console.log(e);
        setStories(stories);
      }
    })();
  }, []);

  const renderStories = (stories) => stories.map(story => (
      <li key={story.id} className="mt-1">
        <StoryItem key={story.id} story={story} pageType="home" />
      </li>
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
