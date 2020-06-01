import React, { useState, useEffect } from "react";

// gql
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// like
import { Link } from "react-router-dom";

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
    <button
      onClick={likePost}
      className={`ui teal ${liked ? "" : "basic"} button`}
    >
      <i aria-hidden="true" className="heart icon"></i>
    </button>
  ) : (
    <Link to="/login" className="ui teal basic button">
      <i aria-hidden="true" className="heart icon"></i>
    </Link>
  );

  return (
    <div className="ui right labeled button" role="button">
      {likeBtn}
      <a className="ui teal left pointing basic label">{likeCount}</a>
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
