const fetchBlogs = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.status === 200) {
    throw new Error("Failed to fetch blogs");
  }

  const blogs = await res.json();
  return blogs;
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

export { fetchBlogs, fetchBlog };
