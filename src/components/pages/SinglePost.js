import React, { useContext } from "react";
// moument
import moment from "moment";
// GQL
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
// context
import { AuthContext } from "../../context/auth";
// component
import LikeBtn from "../layout/LikeBtn";
import DeleteBtn from "../layout/DeleteBtn";

const SinglePost = ({ match, history }) => {
  const { user } = useContext(AuthContext);
  const postId = match.params.postid;
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  function deletePostCallback() {
    history.push("/");
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      username,
      id,
      body,
      likeCount,
      commentCount,
      createdAt,
      likes,
    } = data.getPost;
    postMarkup = (
      <div className="ui grid">
        <div className="row">
          <div className="three wide column">
            <img
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              className="ui right floated image"
            />
          </div>
          <div className="thirteen wide column">
            <div className="ui fluid card">
              <div className="content">
                <div className="header">{username}</div>
                <div className="meta">{moment(createdAt).fromNow(true)}</div>
                <div className="description">{body}</div>
              </div>
              <hr />
              <div className="extra content">
                <LikeBtn
                  user={user}
                  post={{ id, likeCount, username, likes }}
                />
                <div
                  className="ui right labeled button"
                  role="button"
                  tabIndex="0"
                >
                  <button className="ui blue basic button">
                    <i aria-hidden="true" className="comments icon"></i>
                  </button>
                  <div className="ui blue left pointing basic label">
                    {commentCount}
                  </div>
                </div>
                {user && user.username === username && (
                  <DeleteBtn postId={id} callBack={deletePostCallback} />
                )}
              </div>
            </div>
            <div className="ui fluid card">
              <div className="content">
                <p>Post a comment</p>
                <form className="ui form">
                  <div className="ui action input fluid">
                    <input type="text" placeholder="Comment.." name="comment" />
                    <button
                      className={`ui ${!user ? "disabled" : ""} button teal`}
                      disabled=""
                      tabIndex="-1"
                    >
                      Submit Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
