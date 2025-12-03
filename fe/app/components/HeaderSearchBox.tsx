"use client";

import { useState, useRef, useEffect } from "react";
import axiosInstance from "@/axiosConfig";
import SearchHistoryCard from "./SearchHistoryCard";

export default function HeaderSearchBox() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchHistory, setSearchHistory] = useState<{ id: number, keyword: string, created_at: string, user_id: number }[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // 검색 기록 불러오기
  const fetchSearchHistory = async () => {
    try {
      setIsLoadingHistory(true);
      const response = await axiosInstance.get('/api/search');
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

  // 검색 기록 드롭다운 클릭 이벤트
  useEffect(() => {
    fetchSearchHistory();
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
    ? searchHistory.filter((item) => item.keyword.includes(searchValue.trim()))
    : searchHistory;

  // 검색 기록 삭제
  const onDeleteHistory = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/api/search`, { data: { id: id } });
      if (response.data && response.data.history) {
        setSearchHistory(response.data.history);
      }
    } catch (error) {
      setSearchHistory([]);
    }
  };

  // 검색 기록을 저장하는 api 호출 함수
  const saveSearchHistory = async (keyword: string) => {
    try {
      // 저장 후 히스토리 새로고침
      setSearchValue("");
      const response = await axiosInstance.post('/api/search', { keyword });
      if (response.data && response.data.history) {
        setSearchHistory(response.data.history);
      }
    } catch (error) {
      setSearchHistory([]);
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center relative">
      <div className="w-full max-w-md relative">
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onFocus={() => setIsFocused(true)}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              saveSearchHistory(searchValue);
            }
          }}
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
                  <SearchHistoryCard key={item.id} item={item} setSearchValue={setSearchValue} onDeleteHistory={onDeleteHistory} />
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-gray-500">검색 기록이 없습니다.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}