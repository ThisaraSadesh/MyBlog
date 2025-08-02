import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Schema.Types.ObjectId(),
    required: true,
    unique: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  field: { type: String, required: true },
  image: { type: String },
});

const BlogModel = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);




export default BlogModel; 

