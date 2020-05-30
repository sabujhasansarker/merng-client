import React from "react";

// Gql
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

// Component
import PostCard from "../layout/PostCard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = !loading && data.getPosts;
  return (
    <div className="ui divided three column grid">
      <div className="page-title">
        <h1>Recent Posts</h1>
      </div>
      <div className="row">
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <div className="column" key={post.id} style={{ boxShadow: "none" }}>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      body
      id
      username
      createdAt
      likeCount
      commentCount
    }
  }
`;

export default Home;
