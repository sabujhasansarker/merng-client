import React, { useContext } from "react";

// moment
import moment from "moment";
// link
import { Link } from "react-router-dom";
// context api
import { AuthContext } from "../../context/auth";

// Component
import LikeBtn from "./LikeBtn";

const PostCard = ({
  post: { body, id, createdAt, likeCount, commentCount, username, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="ui cards" style={{ marginBottom: 20 }}>
      <div className="ui fluid card">
        <div className="content">
          <img
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            className="ui mini right floated image"
          />
          <div className="header">{username}</div>
          <Link to={`/post/${id}`} className="meta">
            {moment(createdAt).fromNow(true)}
          </Link>
          <div className="description">{body}</div>
        </div>
        <div className="extra content">
          <div>
            <LikeBtn user={user} post={{ id, likeCount, username, likes }} />
            <Link
              className="ui right labeled button"
              role="button"
              to={`/post/${id}`}
            >
              <button className="ui blue basic button">
                <i aria-hidden="true" className="comments icon"></i>
              </button>
              <div className="ui blue left pointing basic label">
                {commentCount}
              </div>
            </Link>
            {user && user.username == username && (
              <div
                className="ui red right floated button"
                role="button"
                tabIndex="0"
              >
                <i
                  aria-hidden="true"
                  className="trash icon"
                  style={{ margin: "0px" }}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
