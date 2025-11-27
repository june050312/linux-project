'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import axiosInstance from "@/axiosConfig";

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // 검색 기록 불러오기 및 드롭다운 클릭 이벤트
  useEffect(() => {
    // 검색 기록 불러오기
    const fetchSearchHistory = async () => {
      try {
        setIsLoadingHistory(true);
        const response = await axiosInstance.get('/api/search/history');
        if (response.data && response.data.history) {
          setSearchHistory(response.data.history);
        }
      } catch (error) {
        console.error('검색 기록을 불러오는데 실패했습니다:', error);
        setSearchHistory([]);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    fetchSearchHistory();

    // 검색 기록 드롭다운 클릭 이벤트
    function handleClick(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    if (isFocused) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isFocused]);

  // 검색 기록 필터링
  const filteredHistory = searchValue.trim()
    ? searchHistory.filter(h => h.includes(searchValue.trim()))
    : searchHistory;

  // 검색 기록 삭제
  const onDeleteHistory = (index: number) => {
    setSearchHistory(prev => prev.filter((_, i) => i !== index));
    axiosInstance.delete(`/api/search/history/${index}`);
  };

  return (
    <header className="flex justify-between w-full sticky top-0 z-50 bg-white py-2 shadow-lg">
      <Link href="/">
        <div className="text-black font-bold text-lg px-4 flex items-center drop-shadow">
          <img src="/myungsup.jpg" alt="로고" className="h-20 w-auto mr-2 rounded-lg shadow-md" />
          <span className="text-2xl font-bold">명섭몰</span>
        </div>
      </Link>
      <div className="flex-1 flex justify-center items-center relative">
        <div className="w-full max-w-md relative">
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onFocus={() => setIsFocused(true)}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="🔍 상품 검색"
            className="border border-blue-600 bg-white text-black rounded-md px-6 py-3 w-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-600 placeholder-gray-500 shadow-md transition"
          />
          {isFocused && (
            <div
              ref={dropdownRef}
              className="absolute left-0 right-0 top-full mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-50"
              style={{ minWidth: '100%' }}
            >
              <div className="p-2 text-xs text-gray-400">최근 검색어</div>
              {filteredHistory.length > 0 ? (
                <ul>
                  {filteredHistory.map((item, i) => (
                    <li
                      key={item + i}
                      className="px-4 py-2 hover:bg-blue-50 flex items-center justify-between cursor-pointer text-gray-700 group"
                    >
                      <span
                        className="flex-1"
                        onMouseDown={() => setSearchValue(item)}
                      >
                        {item}
                      </span>
                      <button
                        type="button"
                        className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-lg px-1"
                        onMouseDown={e => {
                          e.stopPropagation();
                          onDeleteHistory(i);
                        }}
                        aria-label="검색기록 삭제"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-gray-500">검색 기록이 없습니다.</div>
              )}
            </div>
          )}
        </div>
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