"use client";

import React, { useState, useEffect } from "react";


const BlogList = ({ blogs,  limit, setHasMore, setBlogs }) => {
  const [skip, setSkip] = useState(0);
  const [hasMore,setHasMore] = useState(true);


    const fetchBlogs = async () => {
      try {
        if (blogs.length < limit) {
          setHasMore(false); // No more blogs to load
        }
        setBlogs((prev) => [...prev, ...blogs]);
        setSkip((prev) => prev + limit);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  useEffect(() => {
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
