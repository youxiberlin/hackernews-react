import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { values, indexBy, prop } from 'ramda';
import moment from 'moment';
import Spinner from './Spinner';
import StoryItem from './StoryItem';
import Comment from './Comment';
moment().format();

const ItemDetail = () => {
  let { itemId } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getStory = async (itemId) => {
      const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`);
      setStory(data);
    };
    getStory(itemId);
  }, []);

  useEffect(() => {
    if (story) {
      const getKids = async (parent, result = {}) => {
        const kidsIdArr = parent.kids;
        const getCommentPromises = kidsIdArr.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
        const comments = await Promise.all(getCommentPromises);
        const commentsData = comments.map(item => item.data);
        const commentsMap = indexBy(prop('id'), commentsData);
        result.kids = commentsMap;

        for (let i = 0; i < commentsData.length; i++){
          const item = commentsData[i];
          if (item.kids) {
            await getKids(item, result.kids[item.id])
          }
        }

        return result;
      }

      const getCommentsTree = async (parent) => {
        const commentsTree = await getKids(parent);
        setComments(commentsTree);
      };

      getCommentsTree(story);
    }
  }, [story]);

  const renderComments = (comments) => {
    const getKids = (parentObj) => {
      if (!parentObj.kids) return null;
      return values(parentObj.kids)
        .sort((a, b) => b.time - a.time)
        .map((item) => (
          <Comment
            item={item}
            getKids={getKids}
          />
        ));
    };

    return (
      <ul style={{ listStyleType: "none" }}>
        {getKids(comments)}
      </ul>
    );
  };

  return (
    comments ? (
        <div className="container bg-light py-3">
          <div className="pl-4 pb-4">
            <StoryItem story={story} pageType="comments" />
          </div>
          {renderComments(comments)}
        </div>
      ) : <Spinner />
  );
};

export default ItemDetail;
