'use client';

import { useParams } from 'next/navigation';
import axiosInstance from "@/axiosConfig";
import { useState, useEffect } from 'react';
import Goods from "@/app/type/Goods";
import { useRouter } from 'next/navigation';

export default function GoodsDetail() {
  const [goods, setGoods] = useState<Goods | null>(null);
  const router = useRouter();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axiosInstance.get(`/api/goods/${id}`).then((response) => {
      setGoods(response.data);
    });
  }, [id]);

  const handlePurchase = async () => {
    const response = await axiosInstance.post('/api/purchase', {
      goods_id: id,
      count: quantity,
    });
    if (response.status === 200) {
      alert('구매가 완료되었습니다.');
      router.push('/mypage');
    } else {
      alert(response.data.message);
    }
  }

  if (!goods) {
    return <div className="text-center text-gray-500">상품을 불러오는 중입니다...</div>;
  }
  
  return (
    <div>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={goods?.image} alt={goods?.title} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">{goods?.title}</h2>
            <div className="mb-4">
              <span className="font-semibold">가격: </span>
              <span className="text-xl text-blue-600 font-bold">{goods?.price.toLocaleString()}원</span>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <label htmlFor="quantity" className="font-semibold">
                수량:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mt-auto">
              <button 
                onClick={handlePurchase}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-2">상품 상세 설명</h3>
          <p className="text-gray-700">
            {goods?.description}
          </p>
        </div>
      </div>
    </div>
  );
}