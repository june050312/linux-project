"use client";

import Link from "next/link";
import HeaderLogo from "./HeaderLogo";
import HeaderSearchBox from "./HeaderSearchBox";
import { useEffect, useState } from "react";
import axiosInstance from "@/axiosConfig";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const loginVerify = async () => {
      await axiosInstance.get('/api/user')
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
      });
    };
    loginVerify();
  }, [pathname])

  return (
    <header className="flex justify-between w-full sticky top-0 z-50 bg-white py-2 shadow-lg mb-8">
      <Link href="/">
        <HeaderLogo />
      </Link>

      <HeaderSearchBox />
      
      <div className="text-black px-4 flex items-center drop-shadow">
        {isLoggedIn ? (
          <Link href="/mypage">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition shadow">
              마이페이지
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition shadow">
              로그인
            </button>
          </Link>
        )}
        
      </div>
    </header>
  );
}