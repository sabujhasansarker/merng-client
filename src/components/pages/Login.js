import React, { useState, useContext } from "react";

// * appolo
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

//  * user from
import { useForm } from "../../utils/hooks";

// context api
import { AuthContext } from "../../context/auth";

const Login = ({ history }) => {
  // context api
  const context = useContext(AuthContext);
  // from data
  const { onChange, onSubmit, fromData } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    header: "",
    errors: {},
  });
  const [login, { loading }] = useMutation(LOGIN, {
    update(_, result) {
      context.login(result.data.login);
      history.push("/");
    },
    onError(err) {
      fromData.password = "";
      setError({
        header: err.graphQLErrors[0].message,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      });
    },
    variables: fromData,
  });

  function loginUserCallback() {
    login();
  }

  return (
    <div className="form-container">
      {Object.keys(error.header).length > 0 && (
        <div className="ui error message">
          <div className="content">
            <div className="header">
              {Object.keys(error.header).length > 0 && error.header}
            </div>
            {Object.values(error.errors).map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>
      )}
      <div className="ui segment">
        {loading && (
          <div className="ui active transition visible inverted dimmer">
            <div className="content">
              <div className="ui medium text loader"></div>
            </div>
          </div>
        )}
        <form className={`ui form `} onSubmit={onSubmit}>
          <h1>Login</h1>
          <div className="field">
            <label>Username</label>
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={fromData.username}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="ui fluid input">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={fromData.password}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="field">
            <input type="submit" className="ui button primary" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
