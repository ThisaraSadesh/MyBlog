// components/BlogList.js

"use client";

import React, { useState, useEffect } from "react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
              <p>{new Date(blog.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
