import { Link } from 'react-router-dom';
import moment from 'moment';
import extractDomain from '../helper/extractDomain';
moment().format();

const StoryItem = ({ story, pageType }) => (
  <div>
    <div>
      {story.text ? (
          <Link
            style={{ fontWeight: 500 }}
            to={pageType === 'home' ? `item/${story.id}` : `../item/${story.id}`}
          >
          {story.title}
          </Link>
        ) : (
        <a style={{ fontWeight: 500 }} href={story.url}>
          {story.title}
        </a>
      )}
      <div style={{ fontSize: 14 }} className="text-secondary">{story.url ? `(${extractDomain(story.url)})` : null}</div>
    </div>
    <div style={{ fontSize: 14 }} className="text-secondary d-flex flex-wrap justify-content-start">
      <div>{story.score} points</div>
      <div className="ml-2">by {story.by}</div>
      <div className="ml-2">{moment(story.time * 1000).fromNow()}</div>
      <div className="ml-2">
        {pageType === 'comments' || !story.descendants ?
          story.descendants : (
          <Link to={pageType === 'home' ? `item/${story.id}` : `../item/${story.id}`}>
          {story.descendants}
          </Link>
        )}
        comments
      </div>
    </div>
    {pageType === 'comments' ? (
      <div
        className="mb-5 text-secondary"
        dangerouslySetInnerHTML={{ __html: story.text }}
      ></div>
    ) : null}
  </div>
);

export default StoryItem;
