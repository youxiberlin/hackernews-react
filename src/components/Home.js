import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getTopStories = async () => {
      const { data: topStories } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
      const topStoryIds = topStories.slice(0, 30);
      const getItemPromises = topStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
      const items = await Promise.all(getItemPromises);
      const itemsData = items.map(item => item.data);
      setStories(itemsData);
    };
    getTopStories();
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
          {story.score} points by {story.by} xx hours ago
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
      <ol>
      {stories.length ? renderStories(stories) : null}
      </ol>
    </div>
  );
};

export default Home;
