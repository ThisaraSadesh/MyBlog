// handleBlogClick.js (make sure it's used in a client component)

// no "use client" needed here
export const handleBlogClick = (router, blogId) => {
  router.push(`/blog/${blogId}`);
};
