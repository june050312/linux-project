# 1. Node.js 설치된 리눅스 환경을 가져옴 (베이스 이미지)
FROM node:20-alpine

# 2. 컨테이너 내부의 작업 폴더를 /app으로 설정
WORKDIR /app

# 3. 패키지 설치 정보를 먼저 복사 (캐싱 효율을 위해)
COPY package*.json ./

# 4. 의존성 패키지들을 설치
RUN npm install

# 5. 나머지 소스 코드를 전부 복사
COPY . .

# 6. 서버가 사용할 포트(8080)를 열어둠
EXPOSE 8080

# 7. 컨테이너가 시작될 때 실행할 명령어를 지정
CMD ["node", "app.js"]