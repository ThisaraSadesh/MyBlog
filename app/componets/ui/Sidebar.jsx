import React from "react";
import Image from "next/image";
const Sidebar = () => {
  return (
    <div className="flex flex-col h-full  w-[200px] justify-start items-start fixed bg-black">
      <div className="flex flex-col gap-5   border-r-amber-50 border-r-1 px-3 py-3 items-start justify-start h-full ">
        <div className="flex flex-col ">
         
          <Image
            src="/images/blogger.png"
            width={200}
            height={100}
            alt="blogger"
          ></Image>
        </div>

        <nav>
          <ul className="flex flex-col gap-5 items-start justify-start h-screen">
            <li className="hover:bg-white hover:text-black cursor-pointer rounded-full p-2">
              Dashboard
            </li>
            <li className="hover:bg-white hover:text-black cursor-pointer rounded-full p-2">
              Bookmarks
            </li>
            <li className="hover:bg-white hover:text-black cursor-pointer rounded-full p-2">
              My Blogs
            </li>
            <li className="hover:bg-white hover:text-black cursor-pointer rounded-full p-2">
              Profile
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
