import axios from 'axios';

const myStorage = window.sessionStorage;

const getTopStories = async (page) => {
  const storyMap = {}
  const newIds = [];
  const catchErr = p => p.catch(err => {
    console.log('error', err);
    return { data: {}};
  });
  
  const { data: topStories } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
  const topStoryIds = topStories.slice(+page * 30, (+page + 1) * 30);

  for (let i = 0; i < topStoryIds.length; i++) {
    const storyId = topStoryIds[i];
    if (myStorage.getItem(storyId)) {
      const data = myStorage.getItem(storyId);
      storyMap[storyId] = JSON.parse(data);
    } else {
      storyMap[storyId] = {};
      newIds.push(storyId);
    }
  }

  const getNewStoriesPromises = newIds
    .map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    .map(promise => catchErr(promise));

  const newStories = await Promise.all(getNewStoriesPromises);
  const newStoriesData = newStories.map(item => item.data);

  for (let i = 0; i < newStoriesData.length; i++) {
    const newStory = newStoriesData[i];
    storyMap[newStory.id] = newStory;
    myStorage.setItem(newStory.id, JSON.stringify(newStory));
  }
  
  const result = topStoryIds.map(item => storyMap[item]);
  return result;
};

export default getTopStories;
