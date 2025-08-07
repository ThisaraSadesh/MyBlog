"use client";
import React from "react";
import { useSession } from "next-auth/react";

const LoadingSplash = () => {
  const { data: session } = useSession();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center animate-bounce antialiased">
      <h1 className="">Welcome {session?.user?.name}</h1>
    </div>
  );
};

export default LoadingSplash;
