const fetchBookmarks = async (limit, skip) => {
  const res = await fetch(
    `http://localhost:3000/api/bookmarks?skip=${skip}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch blogs");
  }

  const bookmarks = await res.json();
  return { bookmarks: bookmarks.bookmarks };
};

const fetchUsersBookmarks = async (id) => {
  const res = await fetch(`http://localhost:3000/api/bookmarks/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch bookmark ${id}: ${res.status} ${text}`);
  }
  const data = res.json;
  console.log("bookmark data", data);
  return await res.json();
};

const createBookmark = async (data) => {
    console.log('data',data)
  const res = await fetch(`/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res; // ✅ Return the Response object directly
};

export { fetchBookmarks, fetchUsersBookmarks, createBookmark };
