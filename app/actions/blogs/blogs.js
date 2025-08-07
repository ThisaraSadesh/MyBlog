const fetchBlogs = async (limit, skip) => {
  const res = await fetch(`http://localhost:3000/api/blog?skip=${skip}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch blogs");
  }

  const blogs = await res.json();
  return {blogs:blogs.blogs,blogsLength:blogs.blogsLength};
};


const fetchBlog = async (id) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    // pull any error message or status for debugging
    const text = await res.text();
    throw new Error(`Failed to fetch blog ${id}: ${res.status} ${text}`);
  }

  return await res.json();
};



const fetchUsersBlogs = async (id) => {
  const res = await fetch(`http://localhost:3000/api/blog/usersofblog/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    // pull any error message or status for debugging
    const text = await res.text();
    throw new Error(`Failed to fetch blog ${id}: ${res.status} ${text}`);
  }
  const data=res.json;
  console.log('apu data',data);
  return await res.json();
};


export { fetchBlogs, fetchBlog,fetchUsersBlogs };
