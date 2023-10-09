import React, { useContext, useState } from "react";

import { store } from "../../App";
import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";
const Home = () => {
  const [auth, setAuth] = useContext(store);
  const [post, setPost] = useState("");
  const [posts, getPostData] = useState([]);

  const data = { post };

  // const add = (a) => {
  //   return a;
  // };

  // const result = add(5);

  // console.log(result);

  const sentPostData = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:4000/api/posts", options)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => console.log(data));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    sentPostData();
  };

  // if (auth === false) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div className="home">
      <h1>add post</h1>
      <form onSubmit={submitHandler}>
        <label>add post</label>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="enter text"
        />
        <button type="submit">add post</button>
      </form>
    </div>
  );
};

export default Home;
