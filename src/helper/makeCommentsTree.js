import axios from 'axios';
import { indexBy, prop } from 'ramda';

const makeCommentsTree = async (parent, result = {}) => {
  const kidsIdArr = parent.kids;
  const catchErr = p => p.catch(err => {
    console.log('error', err);
    return { data: {}};
  });
  const getCommentPromises = kidsIdArr
    .map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    .map(promise => catchErr(promise));
  const comments = await Promise.all(getCommentPromises);
  const commentsData = comments.map(item => item.data);
  const commentsMap = indexBy(prop('id'), commentsData);
  result.kids = commentsMap;

  for (let i = 0; i < commentsData.length; i++){
    const item = commentsData[i];
    if (item.kids) {
      await makeCommentsTree(item, result.kids[item.id]);
    }
  }

  return result;
}

export default makeCommentsTree;
