import React from "react";

// moment
import moment from "moment";
// link
import { Link } from "react-router-dom";

const PostCard = ({
  post: { body, id, createdAt, likeCount, commentCount, username },
}) => {
  return (
    <div className="ui cards" style={{ marginBottom: 20 }}>
      <div className="ui fluid card">
        <div className="content">
          <img
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            className="ui mini right floated image"
          />
          <div className="header">{username}</div>
          <Link to={`/posts/${id}`} className="meta">
            {moment(createdAt).fromNow(true)}
          </Link>
          <div className="description">{body}</div>
        </div>
        <div className="extra content">
          <div>
            <div className="ui right labeled button" role="button">
              <button className="ui teal basic button">
                <i aria-hidden="true" className="heart icon"></i>
              </button>
              <a className="ui teal left pointing basic label">{likeCount}</a>
            </div>
            <div className="ui right labeled button" role="button">
              <button className="ui blue basic button">
                <i aria-hidden="true" className="comments icon"></i>
              </button>
              <a className="ui blue left pointing basic label">
                {commentCount}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
