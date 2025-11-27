'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axiosInstance from '@/axiosConfig';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 비밀번호 확인
    if (password !== passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsSubmitting(false);
      return;
    }

    // TODO: 실제 회원가입 로직을 여기에 추가하세요.
    const response = await axiosInstance.post('/api/user/register', { email, password });
    if (response.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } else {
      setError(response.data.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
        {/* 홈으로 가는 뒤로가기 버튼 */}
        <button
          type="button"
          className="absolute left-4 top-4 flex items-center hover:text-gray-500 font-semibold text-lg"
          onClick={() => router.push('/')}
        >
          <span className="mr-2 text-2xl">&lt;</span> 홈
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
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
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="passwordCheck" className="block font-semibold mb-2">
              비밀번호 확인
            </label>
            <input
              id="passwordCheck"
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={passwordCheck}
              onChange={e => setPasswordCheck(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="비밀번호를 한번 더 입력하세요"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm font-semibold text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm font-semibold text-center">
              회원가입이 완료되었습니다! 로그인 화면으로 이동합니다...
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-600 text-white rounded font-semibold transition-colors hover:bg-blue-700 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? '회원가입 중...' : '회원가입'}
          </button>
          {/* 로그인으로 이동 */}
          <div className="flex justify-center">
            <Link href="/login" className="w-full">
              <button
                type="button"
                className="w-full px-4 py-2.5 border border-blue-600 text-blue-600 rounded font-semibold transition-colors hover:bg-blue-50"
              >
                이미 계정이 있으신가요? 로그인
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
