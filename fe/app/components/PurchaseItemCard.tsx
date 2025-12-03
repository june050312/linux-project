"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Goods from "@/app/type/Goods";
import axiosInstance from "@/axiosConfig";

export default function PurchaseItemCard({ 
  order, 
  setOrders 
}: { 
  order: any;
  setOrders: (orders: any[]) => void;
}) {
  const [goods, setGoods] = useState<Goods | null>(null);

  useEffect(() => {
    axiosInstance.get(`/api/goods/${order.goods_id}`).then((response) => {
      setGoods(response.data);
    });
  }, [order.goods_id]);

  const handleCancelPurchase = async () => {
    const response = await axiosInstance.delete('/api/purchase', {
      data: { id: order.id }
    });
    if (response.status === 200) {
      alert('구매취소가 완료되었습니다.');
      setOrders(response.data);
    } else {
      alert(response.data.message);
      setOrders([]);
    }
  }
  
  return (
    <Link href={`/goods/${order.goods_id}`}>
      <li
        key={order.id}
        className="p-3 flex justify-between items-center bg-white rounded-lg mb-3 shadow-sm"
      >
        <div>
          <span className="font-medium">{goods?.title}</span>
          <div className="text-sm text-gray-500">{order.created_at}</div>
        </div>
        <div>
          <span className="font-semibold">{order.count}개</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">{goods?.price.toLocaleString()}원</span>
          <button
            className="px-3 py-1 bg-white text-gray-700 rounded shadow-md hover:shadow-lg hover:bg-red-100 hover:text-red-600 transition"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCancelPurchase();
            }}
          >
            구매취소
          </button>
        </div>
      </li>
    </Link>
  );
}