import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Css
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// Components
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MenuBar from "./components/layout/MenuBar";

// Context api
import { AuthProvider } from "./context/auth";

// Auth route
import AuthRoute from "./utils/AuthRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="ui container">
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
