import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Spinner from './Spinner';
import StoryItem from './StoryItem';
import getTopStories from '../helper/getTopStories';
moment().format();

const News = () => {
  let { pageId } = useParams();
  const [page, setPage] = useState(pageId);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getTopStories(page);
      setStories(data);
    })();
  }, [page]);

  const renderStories = (stories) => stories.map(story => (
      <StoryItem story={story} pageType="news" />
    ));

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
