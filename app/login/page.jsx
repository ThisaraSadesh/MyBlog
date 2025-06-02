import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-row items-center justify-center h-screen w-screen bg-[#9d6ee0] ">
      <div className="flex flex-col   bg-[#1c1d21]    h-[800px] w-[800px] rounded-l-2xl md:h-[600px] md:w-[600px]">
        <div className=" justify-start items-start">
          {" "}
          <Image
            src="/images/silverping.png"
            width={30}
            height={30}
            alt="pin"
          ></Image>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 h-full w-full  ">
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col  gap-3  ">
              <h1 className="text-4xl font-bold">Login</h1>
              <p className="text-md ">Enter your account details</p>
            </div>

            <div className="flex flex-col gap-8 justify-center ">
              <input
                className=" w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Username "
                type="text"
                id="username"
              />
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Password"
                type="password"
                id="password"
              />
              <span>Forgot Password?</span>
              <button className="hover:bg-[#4e3275] rounded-md bg-[#9d6ee0] w-full p-2 cursor-pointer">
                Login
              </button>

              <div className="flex flex-row items-center gap-8 w-full text-nowrap">
                <p className="text-xs">Don't have an account ?</p>
                <button className="hover:bg-[#4e3275] rounded-md bg-[#9d6ee0] w-full p-2 cursor-pointer">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[url('/images/blogs.jpg')] bg-cover md:h-[600px] md:w-[600px] h-[800px] w-[800px] rounded-r-2xl"></div>
    </div>
  );
};

export default page;
