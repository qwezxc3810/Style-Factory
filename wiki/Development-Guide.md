# Development Guide

StyleFactory 프로젝트 개발에 참여하기 위한 가이드입니다.

## 목차

- [개발 환경 설정](#개발-환경-설정)
- [코딩 컨벤션](#코딩-컨벤션)
- [Git 워크플로우](#git-워크플로우)
- [테스트](#테스트)
- [디버깅](#디버깅)
- [성능 최적화](#성능-최적화)

---

## 개발 환경 설정

### 필수 요구사항

#### Node.js

- **권장 버전**: 18.x 이상
- **최소 버전**: 16.x

```bash
# 버전 확인
node --version
npm --version
```

#### 패키지 매니저

- **npm**: 8.x 이상 (Node.js와 함께 설치됨)
- **yarn**: 1.22.x 이상 (선택사항)

### IDE 설정

#### VS Code (권장)

**필수 확장 프로그램**:

- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅
- **Tailwind CSS IntelliSense**: Tailwind 자동완성
- **ES7+ React/Redux/React-Native snippets**: React 스니펫

**설정 파일** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*=\\s*['\"`]([^'\"`]*)['\"`]"]
  ]
}
```

**권장 설정**:

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.eol": "\n",
  "javascript.preferences.quoteStyle": "double",
  "typescript.preferences.quoteStyle": "double"
}
```

### 프로젝트 설정

#### 1. 저장소 클론

```bash
git clone https://github.com/qwezxc3810/Style-Factory.git
cd Style-Factory/ReactApp
```

#### 2. 의존성 설치

```bash
npm install
```

#### 3. 개발 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:5173`에서 실행됩니다.

#### 4. ESLint 실행

```bash
npm run lint
```

---

## 코딩 컨벤션

### JavaScript/JSX

#### 파일 명명 규칙

**컴포넌트 파일**:

- PascalCase 사용
- `.jsx` 확장자 사용
- 예: `Layout.jsx`, `InputForm.jsx`, `DarkModeToggle.jsx`

**유틸리티 파일**:

- camelCase 사용
- `.js` 확장자 사용
- 예: `tailwindGen.js`, `cssModulGen.js`

**설정 파일**:

- kebab-case 또는 점(.) 구분
- 예: `vite.config.js`, `eslint.config.js`

#### 변수 명명

```javascript
// camelCase - 변수, 함수
const userName = "John";
const handleClick = () => {};

// PascalCase - 컴포넌트, 클래스
const MyComponent = () => {};
class UserService {}

// UPPER_SNAKE_CASE - 상수
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_COUNT = 3;
```

#### 컴포넌트 작성 규칙

**함수형 컴포넌트 사용**:

```javascript
// ✅ Good
const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

export default MyComponent;

// ❌ Bad - 클래스형 컴포넌트 사용하지 않기
class MyComponent extends React.Component {
  render() {
    return <div>{this.props.prop1}</div>;
  }
}
```

**Props 구조 분해**:

```javascript
// ✅ Good
const InputForm = ({ properties, setProperties, cssStack }) => {
  // ...
};

// ❌ Bad
const InputForm = (props) => {
  const properties = props.properties;
  const setProperties = props.setProperties;
  // ...
};
```

**Early Return 패턴**:

```javascript
// ✅ Good
const Preview = ({ selectedComponent }) => {
  if (!selectedComponent) {
    return <div>컴포넌트를 선택하세요</div>;
  }

  return <div>{/* 프리뷰 렌더링 */}</div>;
};

// ❌ Bad
const Preview = ({ selectedComponent }) => {
  return (
    <div>
      {selectedComponent ? (
        <div>{/* 프리뷰 렌더링 */}</div>
      ) : (
        <div>컴포넌트를 선택하세요</div>
      )}
    </div>
  );
};
```

#### Import 순서

```javascript
// 1. React 관련
import React, { useState, useEffect } from "react";

// 2. 외부 라이브러리
import styled from "styled-components";

// 3. 내부 컴포넌트
import { InputForm } from "./components/InputForm/InputForm.jsx";
import { Preview } from "./components/Preview/Preview.jsx";

// 4. 유틸리티
import { generateTailwindCode } from "./utils/codeGenerators/tailwindGen.js";

// 5. 스타일
import "./index.css";
```

### CSS/Tailwind

#### Tailwind 클래스 순서

```jsx
<div
  className="
  // 레이아웃
  flex flex-col items-center justify-center
  // 크기
  w-full h-screen
  // 여백
  p-6 m-4
  // 색상
  bg-white text-gray-900
  // 테두리
  border border-gray-300 rounded-lg
  // 그림자
  shadow-lg
  // 반응형
  lg:flex-row lg:w-1/2
"
>
  {/* 내용 */}
</div>
```

#### 커스텀 CSS 사용 최소화

Tailwind CSS를 우선적으로 사용하고, 필요한 경우에만 커스텀 CSS 작성:

```css
/* ✅ Good - 다크모드와 같은 전역 스타일 */
body.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

/* ❌ Bad - Tailwind로 대체 가능 */
.button {
  padding: 10px;
  background-color: blue;
  color: white;
}
```

---

## Git 워크플로우

### 브랜치 전략

#### 브랜치 명명 규칙

```
<type>/<Issuetitle>
```

**Type**:

- `feat/` - 새로운 기능
- `fix/` - 버그 수정
- `refactor/` - 코드 리팩토링
- `docs/` - 문서 변경
- `style/` - 코드 포맷팅
- `test/` - 테스트 추가/수정
- `chore/` - 기타 변경사항

**예시**:

```bash
feat/Addcardcomponent
fix/Buttonborderbug
refactor/Optimizegenerators
docs/Updatereadme
```

#### 브랜치 생성 및 작업

```bash
# 1. 최신 dev 브랜치로 이동
git checkout dev
git pull origin dev

# 2. 새 브랜치 생성
git checkout -b feat/Addcardcomponent

# 3. 작업 수행 및 커밋
git add .
git commit -m "[#12]AddCardcomponentwithpreview"

# 4. 원격 저장소에 푸시
git push origin feat/Addcardcomponent

# 5. GitHub에서 Pull Request 생성
```

### 커밋 메시지 규칙

#### 커밋 메시지 형식

```
[#issue-number]<title>

```

**예시**:

```
[#12]카드 컴포넌트 구현

```

### Pull Request

#### PR 제목

```
[#issue-number] <title>
```

**예시**:

```
[#12]AddCardcomponent
[#23]Fixbuttonborderrendering
```

#### PR 설명 템플릿

```markdown
## 변경 사항

- 추가/변경/삭제한 내용 나열

```

#### 코드 리뷰 (리펙토링 간 실시할 예정)

**리뷰어 체크리스트**:

- [ ] 코드가 프로젝트 컨벤션을 따르는가?
- [ ] 기능이 의도대로 작동하는가?
- [ ] 에러 처리가 적절한가?
- [ ] 성능 이슈가 없는가?
- [ ] 주석이 필요한 복잡한 로직은 설명되어 있는가?

**리뷰 코멘트 예시**:

```
✅ LGTM (Looks Good To Me)
💡 Suggestion: useMemo를 사용하면 성능이 개선될 것 같습니다
❓ Question: 이 케이스는 어떻게 처리되나요?
🐛 Bug: border가 none일 때 오류가 발생합니다
```

---

## 테스트

현재 StyleFactory는 자동화된 테스트가 구현되어 있지 않습니다. 향후 추가 예정입니다.

### 수동 테스트 체크리스트

#### 기능 테스트

- [ ] 모든 입력 필드가 정상 작동
- [ ] 컴포넌트 타입 전환이 정상 작동
- [ ] CSS 스택 체크박스가 정상 작동
- [ ] 프리뷰가 실시간으로 업데이트됨
- [ ] 코드 생성이 정확함
- [ ] 코드 복사 기능이 작동함
- [ ] 다크모드 토글이 작동함

#### 브라우저 호환성

- [ ] Chrome (최신 버전)
- [ ] Firefox (최신 버전)
- [ ] Safari (최신 버전)
- [ ] Edge (최신 버전)

#### 반응형 테스트

- [ ] 모바일 (< 768px)
- [ ] 태블릿 (768px ~ 1024px)
- [ ] 데스크톱 (> 1024px)

### 테스트 환경 구성 (향후)

#### Jest + React Testing Library

**설치**:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

**예시 테스트**:

```javascript
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

test("renders Layout component", () => {
  render(<Layout />);
  const inputForm = screen.getByText(/Properties/i);
  expect(inputForm).toBeInTheDocument();
});
```

---

## 디버깅

### React DevTools

#### 설치

[Chrome 확장 프로그램](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

#### 사용법

1. 개발자 도구 열기 (F12)
2. "Components" 탭 선택
3. 컴포넌트 트리 탐색
4. Props와 State 확인

### Console Debugging

#### useState 디버깅

```javascript
const [properties, setProperties] = useState({
  width: 200,
  height: 150,
  // ...
});

// 디버그 로그
console.log("Current properties:", properties);

// State 변경 추적
useEffect(() => {
  console.log("Properties changed:", properties);
}, [properties]);
```

#### Event Handler 디버깅

```javascript
const handlePropertyChange = (e) => {
  console.log("Event:", e.target.name, e.target.value);

  const { name, value } = e.target;
  setProperties((prev) => {
    const newProperties = {
      ...prev,
      [name]: value,
    };
    console.log("New properties:", newProperties);
    return newProperties;
  });
};
```

### Vite 디버깅

#### 빌드 오류

```bash
# 상세 로그 출력
npm run build -- --debug

# 캐시 삭제 후 재빌드
rm -rf node_modules/.vite
npm run build
```

#### HMR 문제

```bash
# 개발 서버 재시작
npm run dev -- --force
```

---

## 성능 최적화

### React 최적화

#### 1. useMemo 사용

비용이 큰 계산을 메모이제이션:

```javascript
const generatedCode = useMemo(() => {
  return generateTailwindCode(selectedComponent, properties);
}, [selectedComponent, properties]);
```

#### 2. useCallback 사용

이벤트 핸들러 메모이제이션:

```javascript
const handlePropertyChange = useCallback((e) => {
  const { name, value } = e.target;
  setProperties((prev) => ({
    ...prev,
    [name]: value,
  }));
}, []);
```

#### 3. React.memo 사용

불필요한 재렌더링 방지:

```javascript
const InputForm = React.memo(({ properties, setProperties }) => {
  // 컴포넌트 로직
});
```

### 번들 크기 최적화

#### 1. 코드 분할

```javascript
import { lazy, Suspense } from "react";

const Preview = lazy(() => import("./components/Preview/Preview.jsx"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Preview />
    </Suspense>
  );
}
```

#### 2. 번들 분석

```bash
npm install --save-dev rollup-plugin-visualizer

# vite.config.js에 추가
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({ open: true })
  ]
}
```

### Tailwind 최적화

#### 사용하지 않는 스타일 제거

Tailwind는 자동으로 사용되지 않는 클래스를 제거합니다 (PurgeCSS).

#### JIT 모드 (기본 활성화)

Tailwind CSS 4.x는 JIT 모드가 기본입니다.

---

## 배포

### GitHub Pages 배포

#### 자동 배포

```bash
npm run deploy
```

이 명령어는:

1. 프로덕션 빌드 생성
2. `dist` 폴더를 `gh-pages` 브랜치에 배포

#### 수동 배포

```bash
# 1. 빌드
npm run build

# 2. dist 폴더로 이동
cd dist

# 3. Git 초기화 및 커밋
git init
git add -A
git commit -m 'deploy'

# 4. gh-pages 브랜치로 푸시
git push -f git@github.com:qwezxc3810/Style-Factory.git main:gh-pages

# 5. 원래 위치로 돌아가기
cd ..
```

### 환경 변수

#### `.env` 파일 (향후)

```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

#### 사용법

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## 문제 해결

### 일반적인 문제

#### 1. 포트 충돌

```
Error: Port 5173 is already in use
```

**해결**:

```bash
# 다른 포트 사용
npm run dev -- --port 3000

# 또는 프로세스 종료
lsof -ti:5173 | xargs kill -9
```

#### 2. 모듈 해석 오류

```
Error: Cannot find module './components/Layout'
```

**해결**:

- `.jsx` 확장자 명시
- 경로 확인
- 대소문자 확인 (macOS/Linux는 대소문자 구분)

#### 3. Tailwind 클래스 미적용

**해결**:

- `index.css`에 `@import "tailwindcss";` 확인
- 개발 서버 재시작
- 브라우저 캐시 삭제

---

## 다음 단계

- [Contributing](Contributing) - 기여 가이드라인
- [Code Generators](Code-Generators) - 코드 생성기 상세
- [Customization](Customization) - 프로젝트 커스터마이징
