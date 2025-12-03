"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/axiosConfig";
import Main from "../components/Main";

export default function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loginVerify = async () => {
      const response = await axiosInstance.get('/api/user');
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    loginVerify();
  }, []);

  return (
    <div>
      <Main />
    </div>
  );
}