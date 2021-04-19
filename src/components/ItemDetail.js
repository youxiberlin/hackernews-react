import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import StoryItem from './StoryItem';
import CommentList from './CommentList';
import makeCommentsTree from '../helper/makeCommentsTree';

const ItemDetail = () => {
  let { itemId } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getStory = async (id) => {
      try {
        const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        setStory(data);
      } catch (e) {
        console.log(e);
        setStory(story);
      }
    };
    getStory(itemId);
  }, []);

  useEffect(() => {
    if (story) {
      const getCommentsTree = async (parent) => {
        try {
          const commentsTree = await makeCommentsTree(parent);
          setComments(commentsTree);
        } catch (e) {
          console.log(e);
          setComments(comments);
        }
      };

      getCommentsTree(story);
    }
  }, [story]);

  return (
    comments ? (
        <div className="container bg-light py-3">
          <div className="pl-md-4">
            <StoryItem story={story} pageType="comments" />
          </div>
          <CommentList comments={comments} />
        </div>
      ) : <Spinner />
  );
};

export default ItemDetail;
