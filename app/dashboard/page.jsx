"use client";

import { fetchBlogs } from "../actions/blogs/blogs";
import PostCard from "../componets/ui/PostCard";
import { formatDate } from "../actions/formatDate";
import Image from "next/image";
import ContinueReadingBtn from "../componets/ui/ContinueReadingBtn";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import { useSession } from "next-auth/react";
import { handleBlogClick } from "../actions/blogs/handleBlogClick";
import LoadingSplash from "./LoadingSplash";
import handleCreateBookmark from "../actions/bookmarks/handleCreateBookMark";
import { toast } from "sonner";
const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogsLength, setBlogsLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showComponent, setShowComponent] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAll = async () => {
      const skip = (currentPage - 1) * limit;
      const { blogs, blogsLength } = await fetchBlogs(limit, skip);
      setBlogsLength(blogsLength);
      setBlogs(blogs);
    };
    fetchAll();
  }, [currentPage, status, session]);

  useEffect(() => {
    if (searchParams.get("welcome") === "true") {
      setShowComponent(true);

      router.replace("/dashboard");
    }

    const timeout = setTimeout(() => {
      setShowComponent(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchParams]);

  const handleBookmarkCreation = async (e, userId, blogId) => {
    const data = await handleCreateBookmark(e, userId, blogId);
    console.log('data response',data)
    if (data === 'true') {
      toast.success("Bookmark Added!");
    }
  };

  return (
    <div className=" text-white  w-screen h-screen">
      {/* <Button>Create new Blog</Button> */}

      {showComponent && session?.user?.name ? (
        <LoadingSplash />
      ) : (
        <div className="max-w-5xl mx-auto m-5">
          <h1 className="mask-b-from-3.5">Dashboard</h1>
          {blogs.length > 0 && (
            <div className="flex flex-row mb-10 gap-3 justify-around items-center bg-black px-5 py-5  rounded-4xl ">
              <div className=" flex flex-row justify-center items-center gap-3 px-3 py-3  ">
                <Image
                  className="rounded-lg shadow-lg shadow-black object-cover w-[450px] h-[450px]"
                  src={blogs[0].image}
                  width={450}
                  height={450}
                  quality={100}
                  alt="image"
                ></Image>
              </div>
              <div className="flex flex-col justify-start items-start gap-5">
                <p className="text-sm text-gray-400 mb-2">
                  {formatDate(blogs[0].date)} • {blogs[0].field}
                </p>
                <h2 className="text-3xl font-bold leading-tight mb-4">
                  {blogs[0].title}
                </h2>
                <p className="text-gray-300 mb-6">{blogs[0].description}</p>
                <ContinueReadingBtn redirectUrl={`/blog/${blogs[0].blogId}`} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-6 justify-center items-center  rounded-4xl p-3 w-full">
            {blogs.slice(1).map((blog) => (
              <div key={blog._id} className=" rounded-lg bg-black p-1 w-full ">
                <PostCard
                  title={blog.title}
                  description={blog.description}
                  date={formatDate(blog.date)}
                  field={blog.field}
                  image={blog.image}
                  blogId={blog.blogId}
                  bookmark={true}
                  userId={session?.user?.id}
                  handleBookmarkCreation={handleBookmarkCreation}
                />
              </div>
            ))}
          </div>
          <Pagination
            totalItems={blogsLength}
            dataForPage={limit}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default page;
