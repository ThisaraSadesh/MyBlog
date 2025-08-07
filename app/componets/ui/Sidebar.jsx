import React from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col h-full  w-[200px] justify-start items-start fixed bg-black">
      <div className="flex flex-col gap-5   border-r-amber-50 border-r-1 px-3 py-3 items-start justify-start h-full ">
        <div className="flex flex-col items-start justify-between gap-1">
          <div className="flex flex-col ">
            <Image
              src="/images/blogger.png"
              width={200}
              height={100}
              alt="blogger"
            ></Image>
          </div>
          <div className="flex flex-col gap-2 items-start justify-between h-[600px]">
            <nav>
              <ul className="flex flex-col gap-3 ">
                <Link
                  className="hover:bg-white hover:text-black cursor-pointer rounded-full p-2"
                  href="/dashboard"
                >
                  Dashboard
                </Link>

                <Link
                  href="/bookmarks"
                  className="hover:bg-white hover:text-black cursor-pointer rounded-full p-2"
                >
                  Bookmarks
                </Link>

                <Link
                  href="/blogs"
                  className="hover:bg-white hover:text-black cursor-pointer rounded-full p-2"
                >
                  My Blogs
                </Link>
                <Link
                  href="/profile"
                  className="hover:bg-white hover:text-black cursor-pointer rounded-full p-2"
                >
                  Profile
                </Link>
              </ul>
            </nav>

            <div>
              <Avatar alt="Remy Sharp" src={session?.user?.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
