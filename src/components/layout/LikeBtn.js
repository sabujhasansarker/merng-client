import React, { useState, useEffect, Fragment } from "react";

// gql
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// like
import { Link } from "react-router-dom";
import MyPopup from "../../utils/MyPopup";

const LikeBtn = ({ user, post: { likeCount, likes, id } }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeBtn = user ? (
    <MyPopup content={`${liked ? "Unlike" : "Like"}`}>
      <div
        className="ui labeled button"
        role="button"
        tabIndex="0"
        onClick={user && likePost}
      >
        <button className={`ui teal ${liked ? "" : "basic"} button`}>
          <i aria-hidden="true" className="heart icon"></i>
        </button>
        <div className="ui teal left pointing basic label">{likeCount}</div>
      </div>
    </MyPopup>
  ) : (
    <MyPopup content={`${liked ? "Unlike" : "Like"}`}>
      <Link
        to="/login"
        className="ui labeled button"
        role="button"
        tabIndex="0"
      >
        <button className={`ui teal  basic button`}>
          <i aria-hidden="true" className="heart icon"></i>
        </button>
        <div className="ui teal left pointing basic label">{likeCount}</div>
      </Link>
    </MyPopup>
  );
  return (
    <div className="ui right labeled button" role="button">
      {likeBtn}
    </div>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeBtn;
