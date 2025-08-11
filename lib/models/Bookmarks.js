import mongoose from "mongoose";
import Blogs from './Blog';
import Users from './User';
import { time } from "console";



const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
    required: true,
  },

 
},
 {timestamps:true,versionKey:false}

);
const bookmarModel =
  mongoose.models.Bookmarks || mongoose.model("Bookmarks", bookmarkSchema);

export default bookmarModel;
