import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between w-full sticky top-0 z-50 bg-white py-2 shadow-lg">
      <Link href="/">
        <div className="text-black font-bold text-lg px-4 flex items-center drop-shadow">
          <img src="/myungsup.jpg" alt="로고" className="h-20 w-auto mr-2 rounded-lg shadow-md" />
          <span className="text-2xl font-bold">명섭몰</span>
        </div>
      </Link>
      <div className="flex-1 flex justify-center items-center">
        <input
          type="text"
          placeholder="🔍 상품 검색"
          className="border border-blue-600 bg-white text-black rounded-md px-6 py-3 w-full max-w-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 placeholder-gray-500 shadow-md transition"
        />
      </div>
      <div className="text-black px-4 flex items-center drop-shadow">
        <Link href="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition shadow">
              로그인
          </button>
        </Link>
      </div>
    </header>
  );
}