

import React from "react";
import { fetchUsersBlogs } from "../actions/blogs/blogs";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import PostCard from "../componets/ui/PostCard";
import { formatDate } from "../actions/formatDate";

const page = async () => {
  const session = await getServerSession(authOptions);

  const blogs = await fetchUsersBlogs(session?.user?.id);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-full ">

    <h1 className="text-6xl font-bold  font-serif m-3  text-shadow-2xs text-shadow-black mask-b-from-3.5  ">My Blogs</h1>
      {blogs.length > 0 && (
        <div className="grid grid-cols-3 justify-center items-center ">
          {blogs.slice(0, 4).map((blog) => (
            <PostCard
              key={blog.blogId._id}
              title={blog.blogId.title}
              description={blog.blogId.description}
              field={blog.blogId.field}
              image={blog.blogId.image}
              date={formatDate(blog.blogId.date)}
              blogId={blog.blogId.blogId}

            />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
