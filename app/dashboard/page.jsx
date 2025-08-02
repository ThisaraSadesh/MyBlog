import { fetchBlogs } from "../actions/blogs/blogs";
import PostCard from "../componets/ui/PostCard";
import { formatDate } from "../actions/formatDate";
import Image from "next/image";
import ContinueReadingBtn from "../componets/ui/ContinueReadingBtn";

const page = async () => {
  const blogs = await fetchBlogs();

  // const handleClickContinueReading = (blogId) => {
  //   router.push(`/blog/${blogId}`);
  // };

  return (
    <div className=" text-white p-8 w-screen bg-[url('/images/wood.jpg')] bg-center bg-cover ml-[200px]">
      {/* <Button>Create new Blog</Button> */}
      <div className="max-w-6xl mx-auto">
        {blogs.length > 0 && (
          <div className="flex flex-row mb-10 gap-3 justify-center items-center  ">
            <div className=" flex flex-row justify-center items-center gap-3 px-3 py-3 ">
              <Image
                className="rounded-lg shadow-lg shadow-black"
                src={blogs[0].image}
                width={500}
                height={300}
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

        <div className="grid grid-cols-3 gap-6 justify-center items-center">
          {blogs.slice(1).map((blog) => (
            <div key={blog.blogId} className=" rounded-lg">
              <PostCard
                title={blog.title}
                description={blog.description}
                date={formatDate(blog.date)}
                field={blog.field}
                image={blog.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
