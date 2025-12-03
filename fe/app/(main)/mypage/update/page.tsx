'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axiosInstance from '@/axiosConfig';
import { User } from '@/app/type/User';

export default function UpdatePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get('/api/user');
        if (response.status === 200) {
          setUser(response.data);
          setEmail(response.data.email || '');
        }
      } catch (err) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', err);
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 비밀번호 확인
    if (password && password !== passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsSubmitting(false);
      return;
    }

    try {
      const updateData: { email?: string; password?: string } = {};
      if (email) updateData.email = email;
      if (password) updateData.password = password;

      const response = await axiosInstance.put('/api/user', updateData);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/mypage');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || '업데이트에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl relative border border-gray-100">

        <h1 className="text-3xl font-bold mb-8 text-center mt-4 text-gray-800">정보 수정</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-semibold mb-2 text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="passwordCheck" className="block font-semibold mb-2 text-gray-700">
              비밀번호 확인
            </label>
            <input
              id="passwordCheck"
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
              value={passwordCheck}
              onChange={e => setPasswordCheck(e.target.value)}
              autoComplete="new-password"
              placeholder="비밀번호를 한번 더 입력하세요"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-semibold text-center p-3 bg-red-50 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm font-semibold text-center p-3 bg-green-50 rounded-lg shadow-sm">
              정보가 성공적으로 업데이트되었습니다! 마이페이지로 이동합니다...
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:bg-blue-700 transform hover:-translate-y-0.5 ${
              isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? '업데이트 중...' : '업데이트'}
          </button>

          <Link href="/mypage" className="block">
            <button
              type="button"
              className="w-full px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:bg-gray-50"
            >
              취소
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}