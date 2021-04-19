import axios from 'axios';

const getTopStories = async (page) => {
  const { data: topStories } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
  const topStoryIds = topStories.slice(+page * 30, (+page + 1) * 30);
  const catchErr = p => p.catch(err => {
    console.log('error', err);
    return { data: {}};
  });
  const getItemPromises = topStoryIds
    .map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    .map(promise => catchErr(promise))
  const items = await Promise.all(getItemPromises);
  const itemsData = items.map(item => item.data);
  return itemsData;
};

export default getTopStories;
