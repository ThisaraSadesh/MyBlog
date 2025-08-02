import React from "react";
import Image from "next/image";

const PostCard = ({ title, description, date, field, image }) => {
  return (
    <div>
      <div className="flex flex-col cursor-pointer text-white gap-3 items-start justify-start hover:bg-white hover:text-black p-4 rounded-lg transition ">
        <Image
          className="rounded-lg shadow-lg shadow-black "
          src={image}
          width={400}
          height={400}
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
