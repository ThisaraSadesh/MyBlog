import { createBookmark } from "./bookmarks";

const handleCreateBookmark = async (e, userId, blogId) => {
    console.log('cliked on create')
  e.stopPropagation();
  const res = await createBookmark({ userId: userId, blogId: blogId });
  if (res.ok) {
    return true;
  }else {
  return false; // or throw new Error('Bookmark failed');
}
};

export default handleCreateBookmark;
