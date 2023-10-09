import React, { useContext, useState } from "react";

import "./index.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Navigate, useNavigate } from "react-router-dom";

import { store } from "../../App";

const SignUp = () => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { name, email } = newUser;

  const saveTokeInLocal = (token) => {
    localStorage.setItem("token", token);
  };

  const eventHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const sendUserDetails = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    };
    fetch("http://localhost:4000/api/signup", options)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setNewUser({ name: "", email: "" });

          navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        toast(data?.message);
        setError(data);
        saveTokeInLocal(data?.token);
      })
      .catch((err) => {
        console.log("err", err);
        setError(err?.message);

        toast.warn(err);
      });
  };
  const signUpSubmitHandler = (e) => {
    e.preventDefault();

    console.log(newUser);

    sendUserDetails();
  };
  return (
    <form onSubmit={signUpSubmitHandler}>
      <div className="form-group">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="name"
          value={name}
          onChange={eventHandler}
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
          onChange={eventHandler}
          placeholder="Enter your email"
          required
        />
      </div>
      {/* {error ? <p style={{ color: "red" }}>{error}</p> : ""} */}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
