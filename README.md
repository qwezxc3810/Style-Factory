# StyleFactory

<div align="center">

![StyleFactory Logo](ReactApp/public/faivcon.ico)

### React 컴포넌트 스타일을 시각적으로 설정하고 코드를 자동 생성하는 무료 온라인 도구

[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://qwezxc3810.github.io/Style-Factory/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38bdf8)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.12-646cff)](https://vitejs.dev/)

[메인 페이지로 이동](https://qwezxc3810.github.io/Style-Factory/) · [상세 문서](https://github.com/qwezxc3810/Style-Factory/wiki) · [이슈 제보](https://github.com/qwezxc3810/Style-Factory/issues)

</div>

---

## 주요 기능

### 시각적 스타일 편집기

- 직관적인 UI로 CSS 속성을 실시간으로 조정
- Width, Height, Background, Border, Padding, Color 등 주요 속성 지원
- 숫자 입력 및 컬러 피커 제공

### 3가지 CSS 스택 지원

- **Tailwind CSS** - 유틸리티 클래스 기반 코드 생성
- **CSS Module** - 모듈화된 CSS 코드 생성
- **Styled-Components** - CSS-in-JS 코드 생성

### 실시간 프리뷰

- 변경 사항을 즉시 확인
- 다양한 컴포넌트 타입 프리뷰 (Button, Input, Card)

### 원클릭 코드 복사

- 생성된 코드를 클립보드에 즉시 복사
- 프로젝트에 바로 적용 가능

### 다크모드 지원

- 라이트/다크 모드 토글
- 사용자 설정 자동 저장 (localStorage)

---

## 빠른 시작

### 요구 사항

- Node.js 16.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/qwezxc3810/Style-Factory.git

# 프로젝트 디렉토리로 이동
cd Style-Factory/ReactApp

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 사용 방법

### 1. 컴포넌트 선택

원하는 컴포넌트 타입(Button. Input, Card)을 선택합니다.

### 2. 스타일 속성 설정

- **Width**: 컴포넌트 너비 설정 (px)
- **Height**: 컴포넌트 높이 설정 (px)
- **Background**: 배경색 선택
- **Border**: 테두리 스타일 입력
- **Padding**: 내부 여백 설정 (px)
- **Color**: 텍스트 색상 선택

### 3. CSS 스택 선택

생성하고 싶은 코드 형식을 체크박스로 선택합니다.

### 4. 코드 생성 및 복사

- 실시간으로 생성된 코드를 확인
- "Copy" 버튼으로 클립보드에 복사
- 프로젝트에 붙여넣기

---

## 기술 스택

### Frontend

- **React 19.1.1** - UI 라이브러리
- **Tailwind CSS 4.1.13** - 유틸리티 CSS 프레임워크
- **Vite 7.1.12** - 빌드 도구

### Development Tools

- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 변환
- **Autoprefixer** - CSS 벤더 프리픽스 자동 추가

---

## 프로젝트 구조

```
Style-Factory/
└── ReactApp/
    ├── public/           # 정적 파일
    ├── src/
    │   ├── components/   # React 컴포넌트
    │   │   ├── InputForm/    # 입력 폼 컴포넌트
    │   │   ├── Preview/      # 프리뷰 컴포넌트
    │   │   └── UI/           # UI 컴포넌트
    │   ├── utils/        # 유틸리티 함수
    │   │   └── codeGenerators/  # 코드 생성기
    │   ├── index.css     # 전역 스타일
    │   └── main.jsx      # 진입점
    ├── index.html        # HTML 템플릿
    ├── tailwind.config.js # Tailwind 설정
    └── vite.config.js    # Vite 설정
```

더 자세한 구조는 [Wiki - Architecture](https://github.com/qwezxc3810/Style-Factory/wiki/Architecture)를 참고하세요.

---

## 상세 문서

프로젝트에 대한 더 자세한 정보는 [Wiki](https://github.com/qwezxc3810/Style-Factory/wiki)에서 확인할 수 있습니다:

- [Getting Started](https://github.com/qwezxc3810/Style-Factory/wiki/Getting-Started) - 설치 및 시작 가이드
- [Features](https://github.com/qwezxc3810/Style-Factory/wiki/Features) - 기능 상세 설명
- [Architecture](https://github.com/qwezxc3810/Style-Factory/wiki/Architecture) - 프로젝트 아키텍처
- [Component API](https://github.com/qwezxc3810/Style-Factory/wiki/Component-API) - 컴포넌트 API 문서
- [Code Generators](https://github.com/qwezxc3810/Style-Factory/wiki/Code-Generators) - 코드 생성기 상세
- [Development Guide](https://github.com/qwezxc3810/Style-Factory/wiki/Development-Guide) - 개발 가이드

---

## 기여하기

StyleFactory 프로젝트에 기여하고 싶으시다면 환영합니다!

1. 이 저장소를 Fork 합니다
2. Feature 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

자세한 내용은 [Contributing Guide](https://github.com/qwezxc3810/Style-Factory/wiki/Contributing)를 참고하세요.

---

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

---

## 링크

- [메인 페이지](https://qwezxc3810.github.io/Style-Factory/)
- [상세 문서 (Wiki)](https://github.com/qwezxc3810/Style-Factory/wiki)
- [이슈 트래커](https://github.com/qwezxc3810/Style-Factory/issues)

---

<div align="center">

Made with by [qwezxc3810](https://github.com/qwezxc3810)

</div>
