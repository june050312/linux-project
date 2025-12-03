'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axiosInstance from '@/axiosConfig';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    setTimeout(async () => {
      const response = await axiosInstance.post('/api/user/login', { email, password });
      if (response.status === 200) {
        router.push('/');
      } else {
        setError(response.data.error);
      }
    }, 1000);
    setIsSubmitting(false);
  };

  const router = useRouter();

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
        {/* 홈으로 가는 뒤로가기 버튼 */}
        <button
          type="button"
          className="absolute left-4 top-4 flex items-center hover:text-gray-500 font-semibold text-lg"
          onClick={() => router.push("/")}
        >
          {/* 뒤로가기 화살표 */}
          <span className="mr-2 text-2xl">&lt;</span> 홈
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block font-semibold mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm font-semibold text-center">{error}</div>
          )}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-600 text-white rounded font-semibold transition-colors hover:bg-blue-700 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
          {/* 회원가입 버튼 */}
          <div className="flex justify-center">
            <Link href="/register" className="w-full">
              <button
                type="button"
                className="w-full px-4 py-2.5 border border-blue-600 text-blue-600 rounded font-semibold transition-colors hover:bg-blue-50"
              >
                회원가입
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
