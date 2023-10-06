const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
});

const Posts = mongoose.model("Posts", PostSchema);
module.exports = Posts;
