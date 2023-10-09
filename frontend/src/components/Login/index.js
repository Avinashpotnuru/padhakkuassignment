import React, { useContext, useState } from "react";

import "./index.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Navigate, useNavigate } from "react-router-dom";

import { store } from "../../App";
import SignUp from "../SignUp";

const Login = () => {
  const navigate = useNavigate();

  const [tab, active] = useState(1);

  const [error, setError] = useState("");

  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const [user, setUser] = useState({ name: "", email: "" });

  // const { name, email } = newUser;

  const { name, email } = user;

  const loginEventHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveTokeInLocal = (token) => {
    localStorage.setItem("token", token);
  };

  const sendLoginDetails = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:4000/api/users", options)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setNewUser({ name: "", email: "" });
          // setAuth(true);
        }
        return res.json();
      })
      .then((data) => {
        console.log("data===", data);
        toast(data?.message);
        setError(data);

        saveTokeInLocal(data?.token);
        navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
        setError(err?.message);

        toast.warn(err);
      });
  };

  const LoginSubmitHandler = (e) => {
    e.preventDefault();
    sendLoginDetails();
    console.log(user);
  };
  return (
    <div className="login-container">
      <div className="tabs">
        <h4
          style={{ textDecoration: tab === 1 ? "underline" : "" }}
          onClick={() => active(1)}
        >
          login
        </h4>
        <h4
          style={{ textDecoration: tab === 2 ? "underline" : "" }}
          onClick={() => active(2)}
        >
          signup
        </h4>
      </div>

      {tab === 1 ? (
        <form onSubmit={LoginSubmitHandler}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={loginEventHandler}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={loginEventHandler}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default Login;
