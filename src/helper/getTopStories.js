import axios from 'axios';
import { keys } from 'ramda';

const myStorage = window.sessionStorage;

const getStories = async (storyIds) => {
  const catchErr = p => p.catch(err => {
    console.log('error', err);
    return { data: {}};
  });

  const getNewStoriesPromises = storyIds
    .map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    .map(promise => catchErr(promise));

  const stories = await Promise.all(getNewStoriesPromises);
  const storiesData = stories.map(item => item.data);
  return storiesData;
}

const getTopStories = async (page) => {
  const { data: topStories } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
  const topStoryIds = topStories.slice(+page * 30, (+page + 1) * 30);

  const storyMap= topStoryIds
    .reduce((acc, curr) => {
      const storedData = myStorage.getItem(curr);
      if (storedData) {
        acc[curr] = JSON.parse(storedData);
      }
      return acc;
    }, {});
  const storedIds = keys(storyMap).map(key => +key);
  const newIds = topStoryIds.filter(id => !storedIds.includes(id));
  const newStoriesData = await getStories(newIds);

  for (let i = 0; i < newStoriesData.length; i++) {
    const newStory = newStoriesData[i];
    storyMap[newStory.id] = newStory;
    myStorage.setItem(newStory.id, JSON.stringify(newStory));
  }
  
  return topStoryIds.map(id => storyMap[id]);
};

export default getTopStories;
