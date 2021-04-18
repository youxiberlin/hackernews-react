import { useState } from 'react';
import moment from 'moment';
moment().format();

const Comment = ({ item, getKids }) => {
  const [showComment, setShowComment] = useState(true);

  return (
    <li className="mt-3 pl-0" key={item.id}>
      <div className="text-secondary d-flex flex-wrap justify-content-start align-items-center">
        <div onClick={() => setShowComment(!showComment)}>
          {showComment ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-up"></i>
          )}
        </div>
        <div style={{ fontSize: 14 }} className="ml-2">
          {item.by}
        </div>
        <div style={{ fontSize: 14 }} className="ml-2">
          {moment(item.time * 1000).fromNow()}
        </div>
        {!showComment && item.kids ? (
          <div
            style={{ fontSize: 14 }}
            className="ml-2"
            onClick={() => setShowComment(!showComment)}
          >
            [...more]
          </div>
        ) : null}
      </div>
      <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
      {showComment ? (
        <ul style={{ listStyleType: "none" }}>
          {getKids(item)}
        </ul>
      ) : null}
    </li>
)};

export default Comment;
