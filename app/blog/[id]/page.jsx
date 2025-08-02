import React from "react";
import {fetchBlog} from "../../actions/blogs/blogs";

const page = async ({ params }) => {
  const { id } = await params;

    const blog = await fetchBlog(id);
  return (
    <div className="w-full h-screen flex items-start justify-center bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Blog Details for ID: {id}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{blog.description}</p>
      </div>
    </div>
  );
};

export default page;
