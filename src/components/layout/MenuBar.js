import React, { useState, useContext } from "react";

// link
import { Link } from "react-router-dom";

// Context api
import { AuthContext } from "../../context/auth";

const MenuBar = () => {
  const { logout, user } = useContext(AuthContext);
  //   active
  const [activeItem, setActiveItem] = useState(window.location.pathname);
  const handleItemClick = (e) => setActiveItem(e.target.name);

  // menu
  const menuBar = user ? (
    <div className="ui pointing secondary menu massive">
      <Link to="/" name="/" className="active teal item">
        {user.username}
      </Link>
      <div className="right menu">
        <Link to="/login" name="/" className="item" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  ) : (
    <div className="ui pointing secondary menu massive">
      <Link
        to="/"
        name="/"
        className={`${activeItem === "/" && "active teal"} item`}
        onClick={handleItemClick}
      >
        Home
      </Link>
      <div className="right menu">
        <Link
          to="/login"
          name="/login"
          className={`${activeItem === "/login" && "active teal"} item`}
          onClick={handleItemClick}
        >
          login
        </Link>
        <Link
          to="/register"
          name="/register"
          className={`${activeItem === "/register" && "active teal"} item`}
          onClick={handleItemClick}
        >
          Register
        </Link>
      </div>
    </div>
  );

  return menuBar;
};

export default MenuBar;
