import React, { Fragment, useContext } from "react";

// Gql
import { useQuery } from "@apollo/react-hooks";
// Query
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

// Component
import PostCard from "../layout/PostCard";
import PostForm from "../layout/PostForm";
// context
import { AuthContext } from "../../context/auth";
import { Transition } from "semantic-ui-react";

// component
import Spnnier from "../layout/Sppiner";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = !loading && data.getPosts;
  return (
    <div className="ui divided three column grid">
      <div className="page-title">
        <h1>Recent Posts</h1>
      </div>
      <div className="row">
        {loading ? (
          <Spnnier />
        ) : (
          <Fragment>
            {user && <PostForm />}

            <Transition.Group duration="700">
              {posts &&
                posts.map((post) => (
                  <div
                    className="column"
                    key={post.id}
                    style={{ boxShadow: "none" }}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
            </Transition.Group>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
