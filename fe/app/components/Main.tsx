'use client';

import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import axiosInstance from "@/axiosConfig";
import Goods from "../type/Goods";
import Link from "next/link";

export default function Main() {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/api/goods/all')
      .then((response) => {
        setGoods(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">상품을 불러오는 중입니다...</div>;
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-8">
      {goods.length > 0 ? (
      <div className="grid grid-cols-4 gap-6">
        {goods.map((item) => (
          <Link href={`/goods/${item.id}`}>
            <ItemCard key={item.id} item={item} />
          </Link>
        ))}
      </div>
      ) : (
        <div className="text-center text-gray-500">상품이 없습니다.</div>
      )}
    </main>
  );
}