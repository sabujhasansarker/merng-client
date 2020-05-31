import React from "react";

// Gql
import gql from "graphql-tag";

import { useMutation } from "@apollo/react-hooks";
// Query
import { FETCH_POSTS_QUERY } from "../../utils/graphql";
// from data
import { useForm } from "../../utils/hooks";

const PostForm = () => {
  const { fromData, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  // mutation
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: fromData,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      fromData.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <div className="column">
      <form className="ui form" onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <div className="field">
          <div className="field">
            <div className="ui input">
              <input
                aria-invalid="true"
                placeholder="Hi World!"
                name="body"
                type="text"
                value={fromData.body}
                onChange={onChange}
              />
            </div>
          </div>
          <button type="submit" className="ui teal button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
