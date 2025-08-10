"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     console.log("Already authenticated, redirecting to dashboard");
  //     router.push("/dashboard");
  //   }
  // }, [status, router]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("clicked Login");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (result.error) {
        toast.error("Invalid access code or password", {
          description: "Please check your credentials and try again",
          duration: 4000,
        });
        setError("Invalid access code or password"); // Still set this for accessibility
      } else {
        toast.success("Authentication Successful!", {
          description: "You will be redirected to portal soon.",
        });
        router.push("/dashboard?welcome=true");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed", {
        description: "An error occurred during login. Please try again.",
        duration: 4000,
      });
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-row items-center justify-center h-screen w-screen bg-[url('/images/wood.jpg')] bg-cover ">
      <div className="flex flex-col   bg-[#1c1d21]    h-[800px] w-[800px] rounded-l-2xl md:h-[600px] md:w-[600px] shadow-lg shadow-black ">
        <div className=" justify-between items-start flex flex-col ">
          {" "}
          <Image
            src="/images/silverping.png"
            width={30}
            height={30}
            alt="pin"
          ></Image>
        </div>

        <div className="flex flex-col  justify-center gap-6 h-full w-full ">
          <div className="flex flex-col items-center gap-3 justify-center   h-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col  gap-3 justify-start items-start ">
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-md ">Enter your account details</p>
              </div>

              <div className="flex flex-col gap-4 ">
                <input
                  className=" w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Username "
                  type="text"
                  id="username"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span>Forgot Password?</span>
                <button
                  onClick={handleLogin}
                  className="hover:bg-[#4e3275] rounded-md bg-[#9d6ee0] w-full p-2 cursor-pointer"
                >
                  Login
                </button>

                <div className="flex flex-row items-center gap-8 w-full text-nowrap">
                  <p className="text-xs">Don't have an account ?</p>
                  <button className="hover:bg-[#4e3275] rounded-md bg-[#9d6ee0] w-full p-2 cursor-pointer">
                    Sign up
                  </button>
                </div>
              </div>
              {error && <div>{error}</div>}
            </div>
          </div>
          <div className=" flex flex-col justify-start items-start  ">
            {" "}
            <Image
              src="/images/silverping.png"
              width={30}
              height={30}
              alt="pin"
            ></Image>
          </div>
        </div>
      </div>

      <div className="bg-[url('/images/blogbanner.jpg')] bg-cover bg-center md:h-[600px] md:w-[600px] h-[800px] w-[800px] rounded-r-2xl shadow-lg shadow-black ">
        <div className=" justify-between items-end flex flex-col h-full ">
          {" "}
          <Image
            src="/images/silverping.png"
            width={30}
            height={30}
            alt="pin"
          ></Image>
          <Image
            src="/images/silverping.png"
            width={30}
            height={30}
            alt="pin"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default page;
