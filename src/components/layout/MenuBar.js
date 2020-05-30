import React, { useState } from "react";

// link
import { Link } from "react-router-dom";

const MenuBar = () => {
  //   active
  const [activeItem, setActiveItem] = useState(window.location.pathname);
  const handleItemClick = (e) => setActiveItem(e.target.name);
  console.log(activeItem);
  return (
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
};

export default MenuBar;
