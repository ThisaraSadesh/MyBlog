"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

const PostCard = ({
  title,
  description,
  date,
  field,
  image,
  blogId,
  bookmark,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${blogId}`);
  };
  return (
    <div>
      <div
        className=" w-full flex flex-col cursor-pointer text-white gap-3 items-start justify-start hover:bg-white hover:text-black p-1  rounded-lg transition "
        onClick={handleClick}
      >
        <div className="flex flex-col justify-center items-end w-full">
          {bookmark && (
            <Star
              className="text-white hover:text-red-500 transition-colors"
              strokeWidth={1}
              fill="currentColor"
            />
          )}
        </div>

        <Image
          className="rounded-lg shadow-lg shadow-black object-cover  w-full h-[300px]"
          src={image}
          width={800}
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
