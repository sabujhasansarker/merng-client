import React, { useState, useContext } from "react";

// * appolo
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

//  * user from
import { useForm } from "../../utils/hooks";

// context api
import { AuthContext } from "../../context/auth";

const Register = ({ history }) => {
  const context = useContext(AuthContext);

  const { onChange, onSubmit, fromData } = useForm(addUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    header: "",
    errors: {},
  });

  // Add user
  const [register, { loading }] = useMutation(REGISTER, {
    update(_, result) {
      context.login(result.data.register);
      history.push("/");
    },
    onError(err) {
      fromData.password = "";
      fromData.confirmPassword = "";
      setError({
        header: err.graphQLErrors[0].message,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      });
    },
    variables: fromData,
  });

  function addUserCallback() {
    register();
  }
  // console.log(error);
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
        <form className="ui form" onSubmit={onSubmit}>
          <h1>Register</h1>
          <div className="field">
            <label>Username</label>
            <div
              className={`ui fluid input ${
                error.errors.username && "field error"
              }`}
            >
              <input
                type="text"
                aria-describedby="form-input-first-name-error-message"
                aria-invalid="true"
                placeholder="Username"
                required
                name="username"
                onChange={(e) => onChange(e)}
                value={fromData.username}
              />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <div
              className={`ui fluid input ${
                error.errors.email && "field error"
              }`}
            >
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={fromData.email}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div
              className={`ui fluid input ${
                error.errors.password && "field error"
              }`}
            >
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                onChange={(e) => onChange(e)}
                value={fromData.password}
              />
            </div>
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <div
              className={`ui fluid input ${
                error.errors.confirmPassword && "field error"
              }`}
            >
              <input
                type="password"
                required
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => onChange(e)}
                value={fromData.confirmPassword}
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
const REGISTER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
