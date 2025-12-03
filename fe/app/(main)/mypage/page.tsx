"use client";

import PurchaseItemCard from "@/app/components/PurchaseItemCard";
import axiosInstance from '@/axiosConfig';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { User } from "@/app/type/User";
import Link from "next/link";

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const handleLogout = async () => {
    const response = await axiosInstance.post('/api/user/logout');
    if (response.status === 200) {
      router.push('/');
    } else {
      alert(response.data.message);
    }
  };

  const handleDeleteUser = async () => {
    const response = await axiosInstance.delete('/api/user');
    if (response.status === 200) {
      router.push('/');
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance.get('/api/user');
      if (response.status === 200) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getPurchaseList = async () => {
      const response = await axiosInstance.get('/api/purchase');
      if (response.status === 200) {
        setOrders(response.data);
      } else {
        setOrders([]);
      }
    }
    getPurchaseList();
  }, [])

  return (
    <div className="max-w-7xl w-full mx-auto p-8 rounded-2xl bg-white shadow-2xl">
      <div className="flex justify-between items-center mb-6 shadow-md rounded-lg p-4 bg-gray-50">
        <div>
          <div>
            <span className="font-semibold text-gray-700">이메일 : </span>
            <span className="text-gray-900 font-bold text-lg">{user?.email}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">포인트 : </span>
            <span className="text-gray-900 font-bold text-lg">{user?.point}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/mypage/update">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition"
            >
              정보수정
            </button>
          </Link>
          <button
            onClick={handleDeleteUser}
            className="px-4 py-2 bg-red-500 text-white rounded shadow-lg hover:bg-red-600 transition"
          >
            계정탈퇴
          </button>
          <div className="border border-gray-300"/>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded shadow-lg hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        </div>
      </div>

      <hr className="my-6" />

      <h2 className="text-lg font-bold mb-3">상품구매내역</h2>
      <div>
        {orders === null ? (
          <div className="text-gray-500">구매 내역이 없습니다.</div>
        ) : (
          <ul>
            {orders.map((order) => (
              <PurchaseItemCard key={order.id} order={order} setOrders={setOrders} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
