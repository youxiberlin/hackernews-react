import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Spinner from './Spinner';
import StoryItem from './StoryItem';
moment().format();

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getTopStories = async (page) => {
      const { data: topStories } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
      const topStoryIds = topStories.slice(page * 30, (page + 1) * 30);
      const getItemPromises = topStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
      const items = await Promise.all(getItemPromises);
      const itemsData = items.map(item => item.data);
      setStories(itemsData);
    };
    getTopStories(0);
  }, []);

  const renderStories = (stories) => stories.map(story => (
      <StoryItem story={story} pageType="home" />
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
