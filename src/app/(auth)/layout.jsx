"use client";

import Header from "./_layout/header";
import MainSection from "./_layout/main_section";

export default function layout({ children }) {
  return (
    <div className="min-w-[100vw] min-h-[100vh] bg-[#06071B] relative">
      <Header />
      <MainSection children={children} />
    </div>
  );
}
