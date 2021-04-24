import axios from 'axios';
import { indexBy, prop } from 'ramda';

const myStorage = window.sessionStorage;

const makeCommentsTree = async (parent, result = {}) => {
  const newKids = [];
  const kidsIdArr = parent.kids;

  const storedComments = kidsIdArr.reduce((acc, curr) => {
    const storedData = myStorage.getItem(curr);
    if (storedData) acc.push(JSON.parse(storedData));
    else newKids.push(curr);
    return acc;
  }, []);

  const catchErr = p => p.catch(err => {
    console.log('error', err);
    return { data: {}};
  });

  const getCommentPromises = newKids
    .map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    .map(promise => catchErr(promise));
  const newComments = await Promise.all(getCommentPromises);
  const newCommentsData = newComments.map(item => item.data);
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
