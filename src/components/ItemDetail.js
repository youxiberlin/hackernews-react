import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { values, indexBy, prop } from 'ramda';
import moment from 'moment';
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
          <li key={item.id}>
            <div>
              <i className="fas fa-caret-up"></i>
              {item.by}
              - {moment(item.time * 1000).fromNow()}
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
            <ul style={{ listStyleType: "none" }}>
              {getKids(item)}
            </ul>
          </li>
        )
      );
    };

    return (
      <ul style={{ listStyleType: "none" }}>
        {getKids(comments)}
      </ul>
    );
  };

  return (
    <div className="container bg-light">
      {comments ? renderComments(comments) : null}
    </div>
  );
};

export default ItemDetail;
