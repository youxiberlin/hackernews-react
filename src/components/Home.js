import { Link } from 'react-router-dom';

const Home = ({ stories }) => {
  const renderStories = stories.map(story => {
    return (
      <li key={story.id} className="mt-1">
        <div>
          <a className="item" href={story.url}>
            {story.title}
          </a>
        </div>
        <div className="text-sm text-secondary">
          {story.score} points by {story.by} xx hours ago
          <Link to={`item/${story.id}`}>
          {story.descendants} 
          </Link>
          comments
        </div>
      </li>
    );
  });
  return (
    <div className="container bg-light">
      <ol>
      {renderStories}
      </ol>
    </div>
  );
};

export default Home;
