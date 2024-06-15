"use client";

import React from "react";
import Header from "./_layout/header";

export default function Layout({ children }) {
  return (
    <div className="bg-[#F3F3F3]">
      <Header />
      <div className="py-3 lg:py-4">
        <div className="min-h-[calc(100vh_-_64px_-_24px)] max-h-fit px-3 md:min-h-[calc(100vh_-_64px_-_32px)] xxl:min-w-[1440px] xxl:mr-auto xxl:ml-auto xxl:max-w-[1440px]">
          {children}
        </div>
      </div>
    </div>
  );
}
