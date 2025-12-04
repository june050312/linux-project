# 1) Node 공식 이미지 사용 (가벼운 alpine 버전)
FROM node:20-alpine

# 2) 컨테이너 안에서 작업할 디렉토리
WORKDIR /app

# 3) package.json, package-lock.json만 먼저 복사
COPY package*.json ./

# 4) 의존성 설치
RUN npm install

# 5) 나머지 소스 코드 복사
COPY . .

# 6) 기본 환경변수 (있어도 .env로 덮어쓸 거라 그냥 기본값)
ENV NODE_ENV=production
ENV PORT=8080

# 7) 컨테이너가 여는 포트 (app.js에서 쓰는 포트)
EXPOSE 8080

# 8) 서버 실행 (npm start 쓰면 ["npm","start"]로 바꿔도 됨)
CMD ["node", "app.js"]