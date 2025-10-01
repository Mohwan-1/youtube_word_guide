# 📖 유튜브 용어 사전 - 프로젝트 인덱스

## 📋 프로젝트 개요

**프로젝트명**: 유튜브 용어 사전 (YouTube Guide)
**목적**: 시니어(55세 이상) 사용자를 위한 쉬운 유튜브 용어 설명 웹사이트
**타겟**: "초등학생도 이해할 수 있는" 쉬운 설명
**기술 스택**: React 19 + Vite + TailwindCSS + shadcn/ui

---

## 🗂️ 프로젝트 구조

```
YouTube Guide/
├── senior-youtube-prd.md          # 📄 제품 요구사항 문서 (PRD)
├── youtube-guide/                 # 🎯 메인 애플리케이션
│   ├── src/
│   │   ├── App.jsx               # 📱 메인 애플리케이션 컴포넌트
│   │   ├── App.css               # 🎨 애플리케이션 스타일
│   │   ├── main.jsx              # 🚀 진입점
│   │   ├── index.css             # 🎨 글로벌 스타일
│   │   ├── components/ui/        # 🧩 UI 컴포넌트
│   │   │   ├── button.jsx        # 버튼 컴포넌트
│   │   │   ├── card.jsx          # 카드 컴포넌트
│   │   │   ├── separator.jsx    # 구분선 컴포넌트
│   │   │   └── tabs.jsx          # 탭 컴포넌트
│   │   ├── data/                 # 📊 데이터
│   │   │   └── terms.js          # 용어 데이터 (60+ 용어)
│   │   └── lib/
│   │       └── utils.js          # 🛠️ 유틸리티 함수
│   ├── public/                    # 📦 정적 리소스
│   ├── package.json               # 📦 프로젝트 의존성
│   ├── vite.config.js            # ⚙️ Vite 설정
│   ├── tailwind.config.js        # ⚙️ Tailwind CSS 설정
│   ├── eslint.config.js          # ⚙️ ESLint 설정
│   └── index.html                # 🌐 HTML 진입점
└── .claude/                       # 🤖 Claude AI 설정
```

---

## 📚 핵심 파일 상세 설명

### 1. 📄 PRD 문서
**파일**: `senior-youtube-prd.md`

**목적**: 프로젝트 전체 요구사항 및 디자인 가이드
**핵심 내용**:
- 타겟 사용자: 55세 이상 시니어
- MVP 원칙: 극도의 단순함, 큰 글씨, 한 화면
- 디자인 철학: "병원 안내판처럼 크고 명확하게"
- 15개 핵심 용어 → 60개 이상으로 확장됨
- 색상 가이드, 글꼴 크기, 금지사항

**참조**: [senior-youtube-prd.md](./senior-youtube-prd.md)

---

### 2. 📱 메인 애플리케이션

#### **App.jsx** (454 lines)
**파일**: `youtube-guide/src/App.jsx`

**핵심 기능**:
- ✅ **상태 관리**:
  - `fontSize`: 글씨 크기 조절 (normal/large/xlarge)
  - `activeSection`: 현재 활성 섹션 추적
  - `isMenuOpen`: 모바일 메뉴 상태

- 📍 **내비게이션**:
  - 고정 상단 네비게이션 바 (스크롤 추적)
  - 6개 카테고리 섹션 링크
  - 스무스 스크롤 기능
  - 반응형 모바일 메뉴

- 🎯 **6개 섹션 구조**:
  1. `hero`: 히어로 섹션 (소개)
  2. `basic`: 기본 용어 (12개)
  3. `production`: 제작 용어 (14개)
  4. `revenue`: 수익 용어 (12개)
  5. `advanced`: 고급 기능 (10개)
  6. `community`: 소통 기능 (7개)
  7. `analytics`: 통계 분석 (6개)

- 🎨 **디자인 특징**:
  - 그라데이션 배경
  - 카드 기반 레이아웃
  - 아이콘 + 색상 코딩
  - 프린트 스타일 지원

**주요 함수**:
- `scrollToSection()`: 섹션 스크롤 (80px 오프셋)
- `increaseFontSize()` / `decreaseFontSize()`: 글씨 크기 조절
- `handlePrint()`: 인쇄 기능
- `useEffect()`: 스크롤 이벤트 추적

**참조**: [App.jsx:1-456](./youtube-guide/src/App.jsx)

---

### 3. 📊 용어 데이터

#### **terms.js** (389 lines)
**파일**: `youtube-guide/src/data/terms.js`

**데이터 구조**:
```javascript
{
  korean: "구독",
  english: "Subscribe",
  simple: "즐겨찾기 하기",
  example: "매일 보고 싶은 친구처럼 저장해두는 것"
}
```

**카테고리별 용어 수**:
- `basic`: 12개 (구독, 좋아요, 채널 등)
- `production`: 14개 (썸네일, 업로드, 편집 등)
- `revenue`: 12개 (수익창출, 광고, 멤버십 등)
- `advanced`: 10개 (알고리즘, 쇼츠, 커뮤니티 등)
- `community`: 7개 (댓글 고정, 하트, 차단 등)
- `analytics`: 6개 (애널리틱스, 시청자 연령 등)

**총 용어 수**: 61개

**카테고리명 매핑**:
```javascript
{
  basic: "기본 용어",
  production: "제작 용어",
  revenue: "수익 용어",
  advanced: "고급 기능",
  community: "소통 기능",
  analytics: "통계 분석"
}
```

**참조**: [terms.js:1-389](./youtube-guide/src/data/terms.js)

---

### 4. 🧩 UI 컴포넌트

#### **button.jsx**
**위치**: `youtube-guide/src/components/ui/button.jsx`
**설명**: shadcn/ui 기반 버튼 컴포넌트
**variants**: default, destructive, outline, secondary, ghost, link
**sizes**: default, sm, lg, icon

#### **card.jsx**
**위치**: `youtube-guide/src/components/ui/card.jsx`
**설명**: 용어 카드 컨테이너
**구성**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

#### **tabs.jsx**
**위치**: `youtube-guide/src/components/ui/tabs.jsx`
**설명**: 탭 네비게이션 컴포넌트 (현재 미사용)
**구성**: Tabs, TabsList, TabsTrigger, TabsContent

#### **separator.jsx**
**위치**: `youtube-guide/src/components/ui/separator.jsx`
**설명**: 구분선 컴포넌트

---

### 5. ⚙️ 설정 파일

#### **package.json**
**위치**: `youtube-guide/package.json`

**핵심 의존성**:
- React 19.1.1
- Vite 7.1.7
- TailwindCSS 3.4.1
- Radix UI (tabs, separator, slot)
- Lucide React (아이콘)

**스크립트**:
- `npm run dev`: 개발 서버
- `npm run build`: 프로덕션 빌드
- `npm run lint`: ESLint 검사
- `npm run preview`: 빌드 미리보기

**참조**: [package.json:1-40](./youtube-guide/package.json)

---

#### **vite.config.js**
**위치**: `youtube-guide/vite.config.js`

**설정**:
- React 플러그인
- Path alias: `@` → `./src`

**참조**: [vite.config.js:1-14](./youtube-guide/vite.config.js)

---

#### **tailwind.config.js**
**위치**: `youtube-guide/tailwind.config.js`

**설정**:
- Content: HTML, JS, TS, JSX, TSX
- 기본 Tailwind 테마 사용

**참조**: [tailwind.config.js:1-11](./youtube-guide/tailwind.config.js)

---

## 🎨 디자인 시스템

### 색상 팔레트
```css
/* 카테고리별 그라데이션 */
기본 (Basic):     from-violet-500 to-purple-600
제작 (Production): from-indigo-500 to-blue-600
수익 (Revenue):    from-blue-500 to-cyan-600
고급 (Advanced):   from-purple-500 to-pink-600
소통 (Community):  from-pink-500 to-rose-600
통계 (Analytics):  from-cyan-500 to-teal-600
```

### 글꼴 크기 시스템
```javascript
fontSizeMultipliers = {
  normal: 1,      // 기본 크기
  large: 1.15,    // 15% 증가
  xlarge: 1.3     // 30% 증가
}
```

### 아이콘 매핑
- 📺 (로고): 유튜브 용어 사전
- 👋 (기본): 기본 용어
- 🎬 (제작): 제작 용어
- 💰 (수익): 수익 용어
- 🚀 (고급): 고급 기능
- 💬 (소통): 소통 기능
- 📊 (통계): 통계 분석

---

## 🔄 주요 기능 플로우

### 1. 페이지 로드 플로우
```
index.html → main.jsx → App.jsx → 용어 데이터 로드 → 렌더링
```

### 2. 스크롤 추적 플로우
```
useEffect(scroll 감지) → 섹션 위치 계산 → activeSection 업데이트 → 네비게이션 하이라이트
```

### 3. 섹션 이동 플로우
```
네비게이션 클릭 → scrollToSection() → 스무스 스크롤 → 80px 오프셋 적용
```

### 4. 글씨 크기 조절 플로우
```
A- 버튼 클릭 → decreaseFontSize() → fontSize 상태 업데이트 → rem 스케일 변경
A+ 버튼 클릭 → increaseFontSize() → fontSize 상태 업데이트 → rem 스케일 변경
```

---

## 📊 데이터 통계

| 카테고리 | 용어 수 | 주요 키워드 |
|---------|--------|-----------|
| 기본 용어 | 12개 | 구독, 좋아요, 채널, 댓글 |
| 제작 용어 | 14개 | 썸네일, 업로드, 편집, 자막 |
| 수익 용어 | 12개 | 수익창출, 광고, 멤버십 |
| 고급 기능 | 10개 | 알고리즘, 쇼츠, 커뮤니티 |
| 소통 기능 | 7개 | 댓글 고정, 하트, 차단 |
| 통계 분석 | 6개 | 애널리틱스, 시청자 연령 |
| **총합** | **61개** | - |

---

## 🚀 개발 워크플로우

### 개발 서버 시작
```bash
cd youtube-guide
npm run dev
```

### 빌드
```bash
npm run build
```

### 린트 검사
```bash
npm run lint
```

---

## 📱 반응형 중단점

| 중단점 | 크기 | 디바이스 |
|--------|-----|---------|
| `sm:` | 640px+ | 모바일 (가로) |
| `md:` | 768px+ | 태블릿 |
| `lg:` | 1024px+ | 데스크톱 |
| `xl:` | 1280px+ | 대형 데스크톱 |

---

## ✅ PRD 구현 현황

### ✅ 완료된 기능
- [x] 6개 카테고리 섹션 (기본 15개 → 61개 용어로 확장)
- [x] 큰 글씨 시스템 (3단계 크기 조절)
- [x] 한글(영어) 병기
- [x] 초등학생 수준 설명
- [x] 실생활 예시 제공
- [x] 카드 기반 레이아웃
- [x] 인쇄 기능
- [x] 반응형 디자인
- [x] 스무스 스크롤 네비게이션
- [x] 모바일 메뉴

### ❌ 미구현 기능 (Phase 2)
- [ ] 음성으로 읽어주기
- [ ] 실제 유튜브 화면 사진
- [ ] "오늘의 용어" 기능
- [ ] 공유하기 기능

---

## 🔗 주요 파일 참조 링크

| 파일 | 경로 | 라인 수 | 설명 |
|-----|------|--------|------|
| PRD | `senior-youtube-prd.md` | 197 | 제품 요구사항 문서 |
| 메인 앱 | `youtube-guide/src/App.jsx` | 454 | 애플리케이션 컴포넌트 |
| 용어 데이터 | `youtube-guide/src/data/terms.js` | 389 | 61개 용어 정의 |
| Package | `youtube-guide/package.json` | 40 | 의존성 관리 |
| Vite 설정 | `youtube-guide/vite.config.js` | 14 | 빌드 설정 |
| Tailwind 설정 | `youtube-guide/tailwind.config.js` | 11 | CSS 설정 |

---

## 📝 코딩 컨벤션

### 네이밍
- **컴포넌트**: PascalCase (App.jsx, Button.jsx)
- **함수**: camelCase (scrollToSection, handlePrint)
- **상수**: camelCase (termsByCategory, categoryNames)

### 파일 구조
```
src/
├── components/ui/    # Reusable UI 컴포넌트
├── data/            # 정적 데이터
├── lib/             # 유틸리티 함수
└── *.jsx            # 페이지 컴포넌트
```

---

## 🎯 성공 기준 (PRD 기준)

### 정량적 목표
- ✅ 페이지 로딩: 2초 이내 (Vite 빌드)
- ✅ 용어 이해 시간: 10초 이내 (카드 레이아웃)
- ⏳ 이탈률: 20% 이하 (측정 필요)

### 정성적 목표
- ✅ "아, 이거구나!" 즉시 이해 (실생활 예시 제공)
- ✅ "내가 할 수 있겠다" 자신감 (쉬운 언어)
- ✅ "자녀/손주에게 물어보지 않아도 된다" (독립적 학습 가능)

---

## 🔍 디버깅 가이드

### 개발 도구
- **Vite Dev Server**: `http://localhost:5173`
- **React DevTools**: 브라우저 확장 프로그램
- **ESLint**: 코드 품질 검사

### 일반적인 문제 해결
1. **빌드 오류**: `npm install` 재실행
2. **스타일 미적용**: Tailwind 설정 확인
3. **컴포넌트 미렌더링**: 콘솔 에러 확인

---

## 🌐 배포 고려사항

### 최적화
- [ ] 이미지 최적화 (현재 이모지 사용)
- [ ] 코드 스플리팅 (현재 단일 페이지)
- [ ] CDN 적용
- [ ] 성능 모니터링

### 호스팅 옵션
- Vercel (추천)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

---

## 📖 추가 리소스

### 기술 문서
- [React 공식 문서](https://react.dev)
- [Vite 공식 문서](https://vitejs.dev)
- [TailwindCSS 문서](https://tailwindcss.com)
- [shadcn/ui 문서](https://ui.shadcn.com)

### 디자인 참조
- [PRD 디자인 가이드](./senior-youtube-prd.md#3-디자인-가이드)
- [콘텐츠 작성 가이드](./senior-youtube-prd.md#7-콘텐츠-작성-가이드)

---

## 📅 마지막 업데이트

**날짜**: 2025-10-01
**버전**: 1.0.0
**상태**: 개발 완료, Phase 2 대기

---

*"모든 어르신이 유튜브를 즐길 수 있도록"*
