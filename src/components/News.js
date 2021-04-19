import { useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import StoryList from './StoryList';
import getTopStories from '../helper/getTopStories';

const News = () => {
  let { pageId } = useParams();
  const [page, setPage] = useState(pageId);
  const [stories, setStories] = useState([]);
  const [totalPage, setTotalPage] = useState(null);

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

  useEffect(() => {
    (async () => {
      try {
        const { data: topStories } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        setTotalPage(Math.ceil(topStories.length / 30));
      } catch (e) {
        console.log(e);
        setTotalPage(totalPage);
      }
    })();
    return () => setTotalPage(totalPage);
  }, []);

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
    ) : (+pageId < totalPage || !totalPage) ?
       <Spinner /> : (
        <div className="text-center text-secondary py-5" style={{ fontSize: 36 }}>
          No content exists
        </div>
      )
  );
};

export default News;
