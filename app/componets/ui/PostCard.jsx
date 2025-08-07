'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const PostCard = ({ title, description, date, field, image, blogId }) => {
    const router = useRouter();

    const handleClick = () => {
    router.push(`/blog/${blogId}`);
  };
  return (
    <div>
      <div
        className="flex flex-col cursor-pointer text-white gap-3 items-start justify-start hover:bg-white hover:text-black p-4 rounded-lg transition "
        onClick={handleClick}
      >
        <Image
          className="rounded-lg shadow-lg shadow-black object-cover  w-[600px] h-[300px]"
          src={image}
          width={600}
          height={300}
          alt="image"
          style={{ objectFit: "cover" }}
        ></Image>

        <span>{title}</span>

        <div className="flex flex-row gap-3 items-center justify-center">
          <span>{date}</span>
          <span>{field}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
