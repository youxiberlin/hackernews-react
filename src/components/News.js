import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Spinner from './Spinner';
moment().format();

const News = () => {
  let { pageId } = useParams();
  const [page, setPage] = useState(pageId);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getTopStories = async (page) => {
      const { data: topStories } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
      const topStoryIds = topStories.slice(+page * 30, (+page + 1) * 30);
      const getItemPromises = topStoryIds.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
      const items = await Promise.all(getItemPromises);
      const itemsData = items.map(item => item.data);
      setStories(itemsData);
    };
    getTopStories(page);
  }, [page]);

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
          <Link to={`../item/${story.id}`}>
          {story.descendants} 
          </Link>
          comments
        </div>
      </li>
    );
  });

  return (
    stories.length ? (
      <div className="container bg-light">
        <ol start={(+page * 30) + 1}>
          {renderStories(stories)}
        </ol>
        <div onClick={() => setPage(+pageId + 1)}>
          <Link push to={`${page}`}>
            More
            <Redirect push to={`${page}`} />
          </Link>
        </div>
      </div>
    ) : <Spinner />
  );
};

export default News;
