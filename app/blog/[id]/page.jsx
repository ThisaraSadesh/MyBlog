import React from "react";
import { fetchBlog } from "../../actions/blogs/blogs";
import Image from "next/image";

const page = async ({ params }) => {
  const { id } = await params;

  const blog = await fetchBlog(id);
 return (
  <div className="w-screen h-screen text-white flex flex-col items-center justify-center">
    <div className="w-[850px] h-[650px] bg-black rounded-3xl flex flex-col justify-between p-6">
      
      {/* Top Icons */}
      <div className="flex flex-row items-start justify-between w-full">
        <Image src="/images/silverping.png" width={30} height={30} alt="image"/>
        <Image src="/images/silverping.png" width={30} height={30} alt="image"/>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full items-center">
        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
        <p className="mb-4">{blog.description}</p>
        <Image
          className="rounded-lg shadow-lg shadow-black object-cover w-[400px] h-[200px]"
          src={blog.image}
          alt={blog.title}
          width={400}
          height={400}
        />
        <div className="w-full max-w-2xl mt-4">
          <p className="leading-8">{blog.content}</p>
        </div>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-row justify-between w-full">
        <Image src="/images/silverping.png" width={30} height={30} alt="image"/>
        <Image src="/images/silverping.png" width={30} height={30} alt="image"/>
      </div>

    </div>
  </div>
);

};

export default page;
