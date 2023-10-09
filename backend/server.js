const express = require("express");

const app = express();

const mongoose = require("mongoose");

const User = require("./models/signup");

const Posts = require("./models/postTask");

const AddUser = require("./models/addUser");

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect"))
  .catch((err) => console.log(err));

function generateRandomPassword(length) {
  // Define character sets for different types of characters
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()<>?";

  // Combine character sets into a single string
  const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars;

  // Check if the length is valid, and if not, set a default length
  if (length <= 0) {
    length = 12; // Default length
  }

  // Initialize the password
  let password = "";

  // Generate the password by selecting random characters from the combined set
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}

// Example usage: Generate a random password of length 12
const randomPassword = generateRandomPassword(13);
// console.log(randomPassword);

//add user

app.post(
  "/api/signup",

  async (req, res) => {
    const { name, email } = req.body;

    if (!name || name.length < 3) {
      return res
        .status(400)
        .json({ error: "Name must be at least 3 characters long" });
    }
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "email already registered" });
    } else {
      try {
        const user = new User({ name, email });
        await user.save();
        // res.json(await User.find({}));

        // res.json();
        res
          .status(200)
          .json({ message: "Successful user sign-up", token: randomPassword });
      } catch (err) {
        console.log(err);
        res.status(404).send("email already registereddddd");
      }
    }
  }
);

app.post(
  "/api/users",

  async (req, res) => {
    const { name, email } = req.body;

    if (!name || name.length < 3) {
      return res
        .status(400)
        .json({ error: "Name must be at least 3 characters long" });
    }
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(200).json({
          message: "you are login successfully",
          token: randomPassword,
        });
      } else {
        res
          .status(401)
          .json({ message: "Please sign up with your name and email" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "Please sign up with your name and email" });
    }
  }
);

//add post

app.post(
  "/api/posts",

  async (req, res) => {
    const { post } = req.body;

    if (!post || post.length < 3 || post.length === 0) {
      return res.status(400).json({ error: "Content cannot be empty" });
    }

    try {
      const addPost = new Posts({ post });
      await addPost.save();
      res.json(await Posts.find({}));

      res.json();
      res.status(200).send("Successful created");
    } catch (err) {
      console.log(err);
    }
  }
);

//get user posts

app.get("/api/posts/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const getSinglePost = await Posts.findById(userid);
    res.status(200).json(getSinglePost).send("all the posts of the user");
  } catch (err) {
    console.log(err);
  }
});

//delete post

app.delete("/api/deletepost/:id", async (req, res) => {
  try {
    const deletePost = await Posts.findByIdAndDelete(req.params.id);
    res.status(200).send("Successful Post Deletion");
    res.json(await Posts.find());
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "User ID not found" });
    send();
  }
});

app.listen(4000, () => console.log("server is connected"));
