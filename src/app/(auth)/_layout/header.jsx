"use client";

// import Link from "next/link";
import { useRouter } from "next/navigation";
import { GiTakeMyMoney } from "react-icons/gi";

export default function Header() {
  const router = useRouter();
  return (
    <header
      className="flex justify-between lg:fixed lg:top-0 lg:z-50 lg:w-full px-4 lg:px-20 py-2 lg:py-5 bg-[#06071B]"
      style={{ boxShadow: "inset 0px -1px 0px #1F2032" }}
    >
      <GiTakeMyMoney
        color="green"
        size={50}
        onClick={() =>
          // window.open(`${process.env.NEXT_PUBLIC_BEYONDIRR_DOMAIN}`)
          router.push("/")
        }
      />
    </header>
  );
}
