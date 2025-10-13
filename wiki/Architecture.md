# Architecture

## 목차
- [프로젝트 구조](#프로젝트-구조)
- [컴포넌트 아키텍처](#컴포넌트-아키텍처)
- [상태 관리](#상태-관리)
- [데이터 흐름](#데이터-흐름)
- [유틸리티 함수](#유틸리티-함수)

---

## 프로젝트 구조

### 디렉토리 트리

```
Style-Factory/
├── LICENSE                     # 라이센스
├── README.md                   # 프로젝트 개요
├── wiki/                       # Wiki 문서
└── ReactApp/                   # React 애플리케이션
    ├── package.json            # 의존성 관리
    ├── vite.config.js          # Vite 빌드 설정
    ├── eslint.config.js        # ESLint 설정
    ├── index.html              # HTML 진입점
    ├── public/                 # 정적 파일
    │   ├── faivcon.ico         # 파비콘
    │   └── faivcon.png         # OG 이미지
    └── src/                    # 소스 코드
        ├── main.jsx            # JavaScript 진입점
        ├── index.css           # 전역 스타일
        ├── components/         # React 컴포넌트
        │   ├── Layout.jsx      # 메인 레이아웃
        │   ├── InputForm/      # 입력 폼 컴포넌트
        │   │   └── InputForm.jsx
        │   ├── Preview/        # 프리뷰 컴포넌트
        │   │   └── Preview.jsx
        │   └── UI/             # UI 컴포넌트
        │       ├── Button.jsx
        │       └── DarkModeToggle.jsx
        └── utils/              # 유틸리티 함수
            └── codeGenerators/ # 코드 생성기
                ├── tailwindGen.js
                ├── cssModulGen.js
                └── styleComponentsGen.js
```

### 주요 디렉토리 설명

#### `/ReactApp`
React 애플리케이션의 루트 디렉토리입니다.

#### `/ReactApp/src`
모든 소스 코드가 위치하는 디렉토리입니다.

#### `/ReactApp/src/components`
React 컴포넌트들을 기능별로 분류하여 저장합니다.

#### `/ReactApp/src/utils`
재사용 가능한 유틸리티 함수들을 저장합니다.

#### `/ReactApp/public`
정적 파일(이미지, 아이콘 등)을 저장합니다.

---

## 컴포넌트 아키텍처

### 컴포넌트 계층 구조

```
App (main.jsx)
└── Layout
    ├── DarkModeToggle
    ├── InputForm
    │   └── Button (컴포넌트 선택용)
    └── Preview
        └── Button (프리뷰용)
```

### 컴포넌트별 역할

#### `main.jsx`
- **역할**: 애플리케이션 진입점
- **책임**: React 루트 생성 및 Layout 컴포넌트 렌더링

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
```

#### `Layout.jsx`
- **역할**: 메인 레이아웃 관리
- **책임**:
  - 전역 상태 관리 (properties, cssStack, selectedComponent)
  - InputForm과 Preview 컴포넌트 배치
  - 반응형 레이아웃 구현
  - DarkModeToggle 배치

**주요 State:**
```javascript
const [properties, setProperties] = useState({
  width: 200,
  height: 150,
  background: "#ffffff",
  border: "1px solid",
  padding: 10,
  color: "#000",
});

const [cssStack, setCssStack] = useState({
  tailwind: true,
  cssModule: true,
  styledComponents: true,
});

const [selectedComponent, setSelectedComponent] = useState("Button");
```

#### `InputForm/InputForm.jsx`
- **역할**: 사용자 입력 처리
- **책임**:
  - CSS 속성 입력 필드 렌더링
  - 컴포넌트 타입 선택
  - CSS 스택 선택
  - 입력 값 검증 및 상태 업데이트

**Props:**
- `properties`: 현재 CSS 속성 값
- `setProperties`: 속성 업데이트 함수
- `cssStack`: 선택된 CSS 스택
- `setCssStack`: CSS 스택 업데이트 함수
- `selectedComponent`: 선택된 컴포넌트
- `setSelectedComponent`: 컴포넌트 업데이트 함수

#### `Preview/Preview.jsx`
- **역할**: 실시간 프리뷰 및 코드 생성
- **책임**:
  - 스타일 적용된 컴포넌트 프리뷰
  - 선택된 CSS 스택에 따른 코드 생성
  - 탭 전환 기능
  - 코드 복사 기능

**Props:**
- `properties`: 적용할 CSS 속성
- `cssStack`: 표시할 CSS 스택
- `selectedComponent`: 프리뷰할 컴포넌트

#### `UI/DarkModeToggle.jsx`
- **역할**: 다크모드 토글
- **책임**:
  - 다크모드 상태 관리
  - localStorage에 설정 저장/로드
  - body 클래스 토글

**Internal State:**
```javascript
const [isDarkMode, setIsDarkMode] = useState(() => {
  const savedMode = localStorage.getItem("darkMode");
  return savedMode === "true";
});
```

#### `UI/Button.jsx`
- **역할**: 컴포넌트 타입 선택 버튼
- **책임**: 선택 가능한 컴포넌트 버튼 렌더링

---

## 상태 관리

StyleFactory는 **단방향 데이터 흐름**을 따르며, React의 기본 `useState` Hook을 사용합니다.

### 상태 구조

#### 1. `properties` State
CSS 속성 값을 저장하는 객체입니다.

```javascript
{
  width: number,        // 너비 (px)
  height: number,       // 높이 (px)
  background: string,   // 배경색 (HEX)
  border: string,       // 테두리 스타일
  padding: number,      // 내부 여백 (px)
  color: string         // 텍스트 색상 (HEX)
}
```

**저장 위치**: Layout 컴포넌트
**사용처**: InputForm (입력), Preview (출력)

#### 2. `cssStack` State
선택된 CSS 스택을 저장하는 객체입니다.

```javascript
{
  tailwind: boolean,
  cssModule: boolean,
  styledComponents: boolean
}
```

**저장 위치**: Layout 컴포넌트
**사용처**: InputForm (선택), Preview (탭 표시)

#### 3. `selectedComponent` State
현재 선택된 컴포넌트 타입을 저장합니다.

```javascript
"Button" | "Card" | "Input"
```

**저장 위치**: Layout 컴포넌트
**사용처**: InputForm (선택), Preview (프리뷰 및 코드 생성)

#### 4. `isDarkMode` State (로컬)
다크모드 활성화 여부를 저장합니다.

```javascript
boolean
```

**저장 위치**: DarkModeToggle 컴포넌트
**영속화**: localStorage (`darkMode` 키)

### 상태 업데이트 패턴

#### 속성 업데이트 (InputForm)
```javascript
const handlePropertyChange = (e) => {
  const { name, value } = e.target;
  setProperties((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

#### CSS 스택 토글 (InputForm)
```javascript
const handleStackChange = (e) => {
  const { name, checked } = e.target;
  setCssStack((prev) => ({
    ...prev,
    [name]: checked,
  }));
};
```

---

## 데이터 흐름

### Props Drilling 패턴

```
Layout (State 소유)
  │
  ├─→ InputForm (State 수정)
  │     ├─ properties + setProperties
  │     ├─ cssStack + setCssStack
  │     └─ selectedComponent + setSelectedComponent
  │
  └─→ Preview (State 읽기)
        ├─ properties (읽기 전용)
        ├─ cssStack (읽기 전용)
        └─ selectedComponent (읽기 전용)
```

### 데이터 흐름 단계

1. **사용자 입력** → InputForm의 입력 필드
2. **이벤트 핸들러** → `handlePropertyChange` 실행
3. **State 업데이트** → Layout의 `setProperties` 호출
4. **리렌더링** → Layout과 자식 컴포넌트 재렌더링
5. **코드 생성** → Preview의 `useMemo`가 새로운 코드 생성
6. **프리뷰 업데이트** → 새로운 스타일로 컴포넌트 렌더링

### 최적화

#### useMemo Hook
불필요한 코드 재생성을 방지합니다:

```javascript
const generatedCode = useMemo(() => {
  // 코드 생성 로직
}, [selectedComponent, properties, activeTab]);
```

**의존성 배열**: `selectedComponent`, `properties`, `activeTab`이 변경될 때만 재계산

---

## 유틸리티 함수

### 코드 생성기 (`/utils/codeGenerators`)

#### 구조
```
codeGenerators/
├── tailwindGen.js
├── cssModulGen.js
└── styleComponentsGen.js
```

#### 공통 인터페이스
모든 생성기는 동일한 인터페이스를 따릅니다:

```javascript
function generateCode(type, properties) {
  // type: 컴포넌트 타입 ("Button", "Card", "Input")
  // properties: CSS 속성 객체

  return string; // 생성된 코드
}
```

#### `tailwindGen.js`
Tailwind CSS 유틸리티 클래스를 생성합니다.

**입력 예시**:
```javascript
generateTailwindCode("Button", {
  width: 200,
  height: 50,
  background: "#3b82f6",
  border: "1px solid",
  padding: 10,
  color: "#ffffff"
})
```

**출력 예시**:
```jsx
<button className="w-[200px] h-[50px] bg-[#3b82f6] border border-black p-[10px] text-[#ffffff] cursor-pointer">Button</button>
```

#### `cssModulGen.js`
CSS Module 클래스를 생성합니다.

**출력 예시**:
```css
.button {
  width: 200px;
  height: 50px;
  background-color: #3b82f6;
  border: 1px solid;
  padding: 10px;
  color: #ffffff;
}
```

#### `styleComponentsGen.js`
Styled-Components 코드를 생성합니다.

**출력 예시**:
```jsx
const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #3b82f6;
  border: 1px solid #000;
  padding: 10px;
  color: #ffffff;
  border-radius: 8px;
`;
```

### 생성기 선택 로직

Preview 컴포넌트에서 activeTab에 따라 적절한 생성기를 호출합니다:

```javascript
const generatedCode = useMemo(() => {
  if (!selectedComponent) return;

  if (activeTab === "tailwind") {
    return generateTailwindCode(selectedComponent, properties);
  } else if (activeTab === "cssModule") {
    return generateCSSModuleCode(selectedComponent, properties);
  } else if (activeTab === "styledComponents") {
    return generateStyledComponentsCode(selectedComponent, properties);
  }
}, [selectedComponent, properties, activeTab]);
```

---

## 스타일 관리

### Tailwind CSS

#### 설정 파일
Tailwind CSS는 기본 설정을 사용하며, Vite 플러그인을 통해 통합됩니다.

#### 클래스 사용 패턴
```jsx
<div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
  {/* 컴포넌트 */}
</div>
```

### 전역 스타일 (`index.css`)

#### 다크모드 스타일
```css
body.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

body.dark-mode .bg-white {
  background-color: #2d2d2d;
}

body.dark-mode .toggle-text {
  color: #ffffff;
}
...
```

#### Tailwind 지시문
```css
@import "tailwindcss";
```

---

## 빌드 설정

### Vite Configuration (`vite.config.js`)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/Style-Factory/', // GitHub Pages 경로
})
```

### ESLint Configuration (`eslint.config.js`)

코드 품질을 유지하기 위한 린트 규칙이 설정되어 있습니다.

---

## 배포 아키텍처

### GitHub Pages 배포

#### 배포 스크립트 (`package.json`)
```json
{
  "scripts": {
    "deploy": "vite build && cd dist && git init && git add -A && git commit -m 'deploy' && git push -f git@github.com:qwezxc3810/Style-Factory.git main:gh-pages && cd .."
  }
}
```

#### 배포 프로세스
1. `vite build` → 프로덕션 빌드 생성
2. `dist` 폴더로 이동
3. Git 저장소 초기화
4. 모든 파일 스테이징
5. 커밋 생성
6. `gh-pages` 브랜치로 강제 푸시

---

## 성능 고려사항

### 코드 분할
현재는 단일 번들로 빌드되지만, 향후 동적 import로 코드 분할 가능:

```javascript
const Preview = lazy(() => import('./components/Preview/Preview.jsx'));
```

### 메모이제이션
- `useMemo`로 비용이 큰 코드 생성 최적화
- 향후 `React.memo`로 컴포넌트 재렌더링 최적화 가능

### 번들 크기
- Vite의 트리 셰이킹으로 사용하지 않는 코드 제거
- Tailwind CSS의 퍼지로 사용되지 않는 스타일 제거

---

## 다음 단계

- [Component API](Component-API) - 각 컴포넌트의 상세 API
- [Code Generators](Code-Generators) - 코드 생성기 구현 상세
- [Development Guide](Development-Guide) - 개발 가이드
