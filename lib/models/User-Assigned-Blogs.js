import mongoose from "mongoose";
import Blogs from "./Blog";

const userAssignedBlogsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs", required: true },
  createdDate: { type: Date, default: Date.now },
});

const UserAssignedBlogs = mongoose.models.UserAssignedBlogs || mongoose.model("UserAssignedBlogs", userAssignedBlogsSchema);


export default UserAssignedBlogs;
