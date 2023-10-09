import React from "react";

import "./index.css";

import { Link } from "react-router-dom";

const pages = [
  { tab: "Home", path: "/" },
  { tab: "Contact", path: "/contact" },
  { tab: "Users", path: "/users" },
];

const logoutHandler = () => {
  localStorage.removeItem("token");
  document.location.reload();
};
const Header = () => {
  return (
    <div className="header">
      <ul>
        {pages?.map((item, idx) => (
          <Link to={item?.path}>
            <li key={idx}>{item?.tab}</li>
          </Link>
        ))}
      </ul>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default Header;
