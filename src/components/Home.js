import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Spinner from './Spinner';
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

  const renderStories = (stories) => stories.map(story => {
    return (
      <li key={story.id} className="mt-1">
        <div>
          <a className="item" href={story.url}>
            {story.title}
          </a>
        </div>
        <div className="text-sm text-secondary">
          {story.score} points by {story.by} {moment(story.time * 1000).fromNow()}
          <Link to={`item/${story.id}`}>
          {story.descendants} 
          </Link>
          comments
        </div>
      </li>
    );
  });
  return (
    <div className="container bg-light">
      {stories.length ?
        (<Fragment>
          <ol>
          {renderStories(stories)}
          </ol>
          <div>
            <Link to={'news/1'}>
            More
            </Link>
          </div>
          </Fragment>) :
        <Spinner />}
    </div>
  );
};

export default Home;
