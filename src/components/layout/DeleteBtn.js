import React, { Fragment, useState } from "react";
// gql
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// quiery
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

const DeleteBtn = ({ postId, callBack }) => {
  const [confirmBtn, setConfirmBtn] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      setConfirmBtn(false);

      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
      });
      if (callBack) callBack();
    },
    variables: { postId },
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
          class="ui page modals dimmer transition visible active"
          style={{
            display: "flex !important",
          }}
        >
          <div
            class="ui small modal transition visible active"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div class="content">Are you sure?</div>
            <div class="actions">
              <button class="ui button" onClick={() => setConfirmBtn(false)}>
                Cancel
              </button>
              <button class="ui primary button" onClick={deletePost}>
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

export default DeleteBtn;
