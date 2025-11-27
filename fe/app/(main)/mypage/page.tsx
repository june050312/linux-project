"use client";

import PurchaseItemCard from "@/app/components/PurchaseItemCard";

export default function MyPage() {
  // 임시 데이터: 실제 사용시에는 인증 정보를 통해 이메일을 받아오세요.
  const email = "user@example.com";

  // 로그아웃 함수 (실제 로직은 프로젝트에 맞게 구현 필요)
  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    // 실제 로그아웃 로직 추가 (예: 세션 제거, 리디렉션 등)
  };

  // 임시 상품 구매 내역 데이터
  const orders = [
    { id: 1, product: "상품 A", date: "2024-05-10", price: "₩10,000" },
    { id: 2, product: "상품 B", date: "2024-05-22", price: "₩25,000" },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 rounded-2xl bg-white shadow-2xl">
      <div className="flex justify-between items-center mb-6 shadow-md rounded-lg p-4 bg-gray-50">
        <div>
          <span className="font-semibold text-gray-700">이메일 : </span>
          <span className="text-gray-900">{email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded shadow-lg hover:bg-red-600 transition"
        >
          로그아웃
        </button>
      </div>

      <hr className="my-6" />

      <h2 className="text-lg font-bold mb-3">상품구매내역</h2>
      <div>
        {orders.length === 0 ? (
          <div className="text-gray-500">구매 내역이 없습니다.</div>
        ) : (
          <ul>
            {orders.map((order) => (
              <PurchaseItemCard key={order.id} order={order} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
