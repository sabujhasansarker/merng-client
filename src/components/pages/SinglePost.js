import React, { useContext, useRef, useState } from "react";
// moument
import moment from "moment";
// GQL
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
// context
import { AuthContext } from "../../context/auth";
// component
import LikeBtn from "../layout/LikeBtn";
import DeleteBtn from "../layout/DeleteBtn";

// ui
import { Transition } from "semantic-ui-react";

const SinglePost = ({ match, history }) => {
  const { user } = useContext(AuthContext);
  const postId = match.params.postid;

  // comment
  let commentInputRef = useRef(null);
  const [comment, setComment] = useState("");

  // Query
  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  // mutation
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: { postId, body: comment },
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
      comments,
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
            {user && (
              <div className="ui fluid card">
                <div className="content">
                  <p>Post a comment</p>
                  <form
                    className="ui form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        className={`ui ${
                          comment.trim() === "" ? "disabled" : ""
                        } button teal`}
                        disabled=""
                        tabIndex="-1"
                        onClick={submitComment}
                      >
                        Submit Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <Transition.Group duration="600">
              {comments &&
                comments.map((comment) => (
                  <div className="ui fluid card" key={comment.id}>
                    <div className="content">
                      {user && user.username === comment.username && (
                        <DeleteBtn postId={id} commentId={comment.id} />
                      )}

                      <div className="header">{comment.username}</div>
                      <div className="meta">
                        {moment(comment.createdAt).fromNow(true)}
                      </div>
                      <div className="description">{comment.body}</div>
                    </div>
                  </div>
                ))}
            </Transition.Group>
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

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost;
