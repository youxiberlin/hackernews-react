import { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import Spinner from './Spinner';
import StoryList from './StoryList';
import getTopStories from '../helper/getTopStories';
moment().format();

const News = () => {
  let { pageId } = useParams();
  const [page, setPage] = useState(pageId);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTopStories(page);
        setStories(data);
      } catch (e) {
        console.log(e);
        setStories(stories);
      }
    })();
    return () => setStories([]);
  }, [page]);

  return (
    stories.length ? (
      <div className="container bg-light">
        <StoryList stories={stories} pageType="news" page={page}/>
        {stories.length === 30 ? (
          <div onClick={() => setPage(+pageId + 1)}>
            <Link to={`${page}`}>
              <Redirect push to={`../news/${page}`} />
              More
            </Link>
          </div>
        ) : null}
      </div>
    ) : +pageId < 17 ?
       <Spinner /> : (
        <div className="text-center text-secondary py-5" style={{ fontSize: 36 }}>
          No content exists
        </div>
      )
  );
};

export default News;
