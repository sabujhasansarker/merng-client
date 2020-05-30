import React, { useState } from "react";

// link
import { Link } from "react-router-dom";

const MenuBar = () => {
  //   active
  const [activeItem, setActiveItem] = useState(window.location.pathname);
  const handleItemClick = (e) => setActiveItem(e.target.name);
  return (
    <div className="ui pointing secondary menu">
      <Link
        to="/"
        name="/"
        className={`${activeItem === "/" && "active"} item`}
        onClick={handleItemClick}
      >
        Home
      </Link>
      <div className="right menu">
        <Link
          to="/login"
          name="/login"
          className={`${activeItem === "/login" && "active"} item`}
          onClick={handleItemClick}
        >
          login
        </Link>
        <Link
          to="/register"
          name="/register"
          className={`${activeItem === "/register" && "active"} item`}
          onClick={handleItemClick}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default MenuBar;