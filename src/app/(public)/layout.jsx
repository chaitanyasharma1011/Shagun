"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <div className="bg-[#06071B] w-[100vw] h-[100vh] relative">
      <header
        style={{ background: "rgba(12, 4, 24, 0.8)" }}
        className="absolute top-0 w-full flex justify-between items-center p-4 px-8"
      >
        <GiTakeMyMoney color="green" size={50} />
        <p
          className="font-medium text-white text-lg"
          onClick={() => router.push("/login")}
        >
          Login
        </p>
      </header>
      {children}
    </div>
  );
}
