import { values } from 'ramda';
import Comment from './Comment';

const CommentList = ({ comments }) => {
  const renderComments = (comments) => {
    const getKids = (parentObj) => {
      if (!parentObj.kids) return null;
      return values(parentObj.kids)
        .filter(item => !item.deleted)
        .sort((a, b) => b.time - a.time)
        .map((item) => (
          <Comment
            key={item.id}
            item={item}
            getKids={getKids}
          />
        ));
    };

    return (
      <ul className="pl-0 pl-md-4" style={{ listStyleType: "none" }}>
        {getKids(comments)}
      </ul>
    );
  };

  return renderComments(comments);
};

export default CommentList;
