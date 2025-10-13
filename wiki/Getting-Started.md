# Getting Started

이 가이드는 StyleFactory를 로컬 환경에서 설치하고 실행하는 방법을 안내합니다.

## 목차
- [요구 사항](#요구-사항)
- [설치 가이드](#설치-가이드)
- [개발 서버 실행](#개발-서버-실행)
- [빌드 및 배포](#빌드-및-배포)
- [첫 번째 스타일 만들기](#첫-번째-스타일-만들기)

---

## 요구 사항

StyleFactory를 실행하기 위해서는 다음이 필요합니다:

### 필수 요구사항
- **Node.js**: 16.x 이상 (권장: 18.x 이상)
- **npm**: 8.x 이상 또는 **yarn**: 1.22.x 이상
- **Git**: 버전 관리 (선택사항이지만 권장)

### Node.js 버전 확인

```bash
node --version
npm --version
```

### Node.js 설치
Node.js가 설치되어 있지 않다면 [공식 웹사이트](https://nodejs.org/)에서 다운로드할 수 있습니다.

---

## 설치 가이드

### 1. 저장소 클론

```bash
git clone https://github.com/qwezxc3810/Style-Factory.git
```

또는 ZIP 파일로 다운로드할 수 있습니다:
- [Download ZIP](https://github.com/qwezxc3810/Style-Factory/archive/refs/heads/main.zip)

### 2. 프로젝트 디렉토리 이동

```bash
cd Style-Factory/ReactApp
```

### 3. 의존성 설치

npm을 사용하는 경우:
```bash
npm install
```

yarn을 사용하는 경우:
```bash
yarn install
```

설치가 완료되면 `node_modules` 폴더가 생성됩니다.

---

## 개발 서버 실행

### 개발 모드로 실행

```bash
npm run dev
```

또는

```bash
yarn dev
```

### 서버 접속

브라우저에서 다음 주소로 접속합니다:
```
http://localhost:5173
```

개발 서버는 Hot Module Replacement (HMR)를 지원하여 코드 변경 시 자동으로 브라우저가 새로고침됩니다.

### 포트 변경

기본 포트(5173)를 변경하려면 `vite.config.js` 파일을 수정합니다:

```javascript
export default defineConfig({
  server: {
    port: 3000 // 원하는 포트 번호
  }
})
```

---

## 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
```

또는

```bash
yarn build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 빌드 미리보기

빌드된 애플리케이션을 로컬에서 미리 볼 수 있습니다:

```bash
npm run preview
```

또는

```bash
yarn preview
```

### GitHub Pages 배포

이 프로젝트는 GitHub Pages 자동 배포를 지원합니다:

```bash
npm run deploy
```

이 명령어는 다음을 수행합니다:
1. 프로덕션 빌드 생성
2. `dist` 폴더를 GitHub Pages 브랜치(`gh-pages`)에 배포

**참고**: GitHub Pages 배포를 위해서는 저장소의 Settings에서 GitHub Pages를 활성화해야 합니다.

---

## 첫 번째 스타일 만들기

StyleFactory를 처음 사용한다면 다음 단계를 따라해보세요!

### 1단계: 애플리케이션 열기

개발 서버를 실행하고 브라우저에서 `http://localhost:5173`을 엽니다.

### 2단계: 컴포넌트 선택

왼쪽 패널의 "Component Type" 드롭다운에서 컴포넌트를 선택합니다.

### 3단계: 스타일 속성 설정

각 입력 필드를 통해 스타일을 조정합니다:

#### Width (너비)
```
입력: 200 (px)
```
버튼의 너비를 200픽셀로 설정합니다.

#### Height (높이)
```
입력: 50 (px)
```
버튼의 높이를 50픽셀로 설정합니다.

#### Background (배경색)
```
컬러 피커: #3b82f6 (파란색)
```
배경색을 파란색으로 설정합니다.

#### Border (테두리)
```
입력: 1px solid 
```
1픽셀 두께의 테두리를 추가합니다.

#### Padding (내부 여백)
```
입력: 10 (px)
```
내부 여백을 10픽셀로 설정합니다.

#### Color (텍스트 색상)
```
컬러 피커: #ffffff (흰색)
```
텍스트 색상을 흰색으로 설정합니다.

### 4단계: CSS 스택 선택

생성하고 싶은 코드 형식을 선택합니다:
- ✅ Tailwind CSS
- ✅ CSS Module
- ✅ Styled-Components

여러 개를 동시에 선택할 수 있습니다.

### 5단계: 실시간 프리뷰 확인

오른쪽 패널에서 변경사항이 실시간으로 반영되는 것을 확인합니다.

### 6단계: 코드 복사

생성된 코드 블록 오른쪽 상단의 **Copy** 버튼을 클릭하여 코드를 클립보드에 복사합니다.

### 7단계: 프로젝트에 적용

복사한 코드를 자신의 React 프로젝트에 붙여넣습니다.

#### Tailwind CSS 예시:
```jsx
<button className="w-[200px] h-[50px] bg-[#3b82f6] border-[1px_solid] p-[10px] text-[#ffffff]">
  Button
</button>
```

#### CSS Module 예시:
```css
.button {
  width: 200px;
  height: 50px;
  background: #3b82f6;
  border: 1px solid ;
  padding: 10px;
  color: #ffffff;
}
```

#### Styled-Components 예시:
```jsx
const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  background: #3b82f6;
  border: 1px solid ;
  padding: 10px;
  color: #ffffff;
`;
```

---

## 다크모드 사용하기

오른쪽 상단의 토글 버튼을 클릭하여 다크모드를 활성화/비활성화할 수 있습니다.

다크모드 설정은 `localStorage`에 자동으로 저장되어 다음 방문 시에도 유지됩니다.

---

## 문제 해결

### 포트가 이미 사용 중입니다
```
Error: Port 5173 is already in use
```
**해결 방법**: 다른 포트를 사용하거나 해당 포트를 사용 중인 프로세스를 종료합니다.

### 의존성 설치 오류
```
npm ERR! code ERESOLVE
```
**해결 방법**: Node.js와 npm 버전을 확인하고, `node_modules`와 `package-lock.json`을 삭제한 후 다시 설치합니다.

```bash
rm -rf node_modules package-lock.json
npm install
```

### 빌드 오류
ESLint 또는 타입 오류가 발생하는 경우:
```bash
npm run lint
```
를 실행하여 오류를 확인하고 수정합니다.

---

## 다음 단계

- [Features](Features) - 기능 상세 가이드
- [Architecture](Architecture) - 프로젝트 구조 이해
- [Development Guide](Development-Guide) - 개발에 참여하기

---

**문제가 있나요?** [이슈를 생성](https://github.com/qwezxc3810/Style-Factory/issues/new)해주세요!
