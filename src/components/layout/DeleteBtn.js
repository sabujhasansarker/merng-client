import React, { Fragment, useState } from "react";
// gql
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// quiery
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

const DeleteBtn = ({ postId, callBack, commentId }) => {
  const [confirmBtn, setConfirmBtn] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_POST : DELETE_POST;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmBtn(false);
      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
        });
      }
      if (callBack) callBack();
    },
    variables: { postId, commentId },
  });
  return (
    <Fragment>
      <div
        className="ui red right floated button"
        role="button"
        tabIndex="0"
        onClick={() => setConfirmBtn(true)}
      >
        <i
          aria-hidden="true"
          className="trash icon"
          style={{ margin: "0px" }}
        ></i>
      </div>
      {confirmBtn && (
        <div
          className="ui page modals dimmer transition visible active"
          style={{
            display: "flex !important",
          }}
        >
          <div
            className="ui small modal transition visible active"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="content">Are you sure?</div>
            <div className="actions">
              <button
                className="ui button"
                onClick={() => setConfirmBtn(false)}
              >
                Cancel
              </button>
              <button
                className="ui primary button"
                onClick={deletePostOrMutation}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT_POST = gql`
  mutation DeletePost($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteBtn;
