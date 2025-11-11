'use client';

import { useParams } from 'next/navigation';

export default function GoodsDetail() {
  const { id } = useParams();
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 w-full md:w-80 h-80 bg-gray-100 rounded-lg flex items-center justify-center">
          {/* TODO: 상품 이미지 넣기 */}
          <span className="text-gray-400">상품 이미지</span>
        </div>
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">{id}</h2>
          <p className="text-lg text-gray-700 mb-4">여기에 상품에 대한 간단한 설명이 들어갑니다.</p>
          <div className="mb-4">
            <span className="font-semibold">가격: </span>
            <span className="text-xl text-blue-600 font-bold">0원</span>
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
              defaultValue={1}
              className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mt-auto">
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              구매하기
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-2">상품 상세 설명</h3>
        <p className="text-gray-700">
          여기에는 상품에 대한 자세한 설명, 특징, 주의사항 등이 들어갈 수 있습니다. 
          원하는 내용을 자유롭게 추가하세요.
        </p>
      </div>
    </div>
  );
}