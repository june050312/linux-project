// db/supabaseClient.js

const { createClient } = require('@supabase/supabase-js');

// .env에서 설정한 환경 변수를 가져옴
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

// 두 변수 중 하나라도 없으면 에러를 발생시켜 연결 실패를 즉시 알리는 역할
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL 또는 Anon Key 환경 변수가 설정되지 않았습니다.");
}

// Supabase 클라이언트 초기화
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase; // 다른 파일에서 이 연결 객체를 사용할 수 있도록 내보냄