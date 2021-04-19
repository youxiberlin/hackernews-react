import StoryItem from './StoryItem';

const StoryList = ({ stories, pageType, page }) => {
  return (
    <ol className="pl-4" start={page ? (+page * 30) + 1 : null}>
      {stories.map(story => (
        story ? (
          <li key={story.id} className="mt-1">
            <StoryItem key={story.id} story={story} pageType={pageType} />
          </li>
        ) : null))}
    </ol>
  )
};

export default StoryList;
