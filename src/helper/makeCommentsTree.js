import axios from 'axios';
import { indexBy, prop } from 'ramda';

const myStorage = window.sessionStorage;

const getComments = async (commentIds) => {
  const catchErr = p => p.catch(err => {
    console.log('error', err);
    return { data: {}};
  });
  const getCommentPromises = commentIds
    .map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    .map(promise => catchErr(promise));
  const comments = await Promise.all(getCommentPromises);
  return comments.map(item => item.data);
}

const makeCommentsTree = async (parent, result = {}) => {
  const storedComments = parent.kids.reduce((acc, curr) => {
    const storedData = myStorage.getItem(curr);
    if (storedData) acc.push(JSON.parse(storedData));
    return acc;
  }, []);

  const storedCommentsIds = storedComments.map(comment => comment.id);
  const newKids = parent.kids.filter(id => !storedCommentsIds.includes(id));
  const newCommentsData = await getComments(newKids);
  const allComments = [...new Set([...storedComments, ...newCommentsData])];
  const commentsMap = indexBy(prop('id'), allComments);
  result.kids = commentsMap;

  for (let i = 0; i < allComments.length; i++){
    const item = allComments[i];
    myStorage.setItem(item.id, JSON.stringify(item));
    if (item.kids) {
      await makeCommentsTree(item, result.kids[item.id]);
    }
  }

  return result;
}

export default makeCommentsTree;
