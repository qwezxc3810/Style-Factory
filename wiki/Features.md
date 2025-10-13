# Features

StyleFactory의 모든 기능을 상세히 설명합니다.

## 목차
- [시각적 편집기](#시각적-편집기)
- [실시간 프리뷰](#실시간-프리뷰)
- [코드 생성기](#코드-생성기)
- [다크모드](#다크모드)
- [반응형 디자인](#반응형-디자인)

---

## 시각적 편집기

### 개요
StyleFactory의 핵심 기능인 시각적 편집기는 InputForm 컴포넌트를 통해 구현되며, 직관적인 UI로 CSS 속성을 실시간으로 조정할 수 있습니다.

### 지원하는 CSS 속성

#### 1. Width (너비)
- **타입**: Number 입력
- **단위**: px (픽셀)
- **설명**: 컴포넌트의 가로 너비를 설정합니다
- **사용 예시**:
  ```
  입력: 200
  결과: width: 200px
  ```

#### 2. Height (높이)
- **타입**: Number 입력
- **단위**: px (픽셀)
- **설명**: 컴포넌트의 세로 높이를 설정합니다
- **사용 예시**:
  ```
  입력: 50
  결과: height: 50px
  ```

#### 3. Background (배경색)
- **타입**: Color Picker + Text 입력
- **형식**: HEX 색상 코드
- **설명**: 컴포넌트의 배경색을 설정합니다
- **사용 방법**:
  - 색상 박스 클릭 → 컬러 피커 열기
  - 또는 직접 HEX 코드 입력 (예: #3b82f6)
- **사용 예시**:
  ```
  입력: #3b82f6
  결과: background-color: #3b82f6
  ```

#### 4. Border (테두리)
- **타입**: Select 드롭다운
- **옵션**:
  - `1px solid` - 1픽셀 실선 테두리
  - `2px dashed` - 2픽셀 점선 테두리
  - `none` - 테두리 없음
- **설명**: 컴포넌트의 테두리 스타일을 설정합니다
- **사용 예시**:
  ```
  선택: 1px solid
  결과: border: 1px solid #000
  ```

#### 5. Padding (내부 여백)
- **타입**: Number 입력
- **단위**: px (픽셀)
- **설명**: 컴포넌트의 내부 여백을 설정합니다 (전체 방향)
- **사용 예시**:
  ```
  입력: 10
  결과: padding: 10px
  ```

#### 6. Color (텍스트 색상)
- **타입**: Color Picker + Text 입력
- **형식**: HEX 색상 코드
- **설명**: 컴포넌트 내부 텍스트의 색상을 설정합니다
- **사용 방법**:
  - 색상 박스 클릭 → 컬러 피커 열기
  - 또는 직접 HEX 코드 입력
- **사용 예시**:
  ```
  입력: #ffffff
  결과: color: #ffffff
  ```

### 컴포넌트 타입 선택

현재 지원하는 컴포넌트:
- **Button**: 버튼 컴포넌트
- **Input**: 입력 필드 
- **Card**: 카드 컴포넌트

컴포넌트 타입을 선택하면 해당 타입에 맞는 코드가 자동으로 생성됩니다.

### CSS 스택 선택

체크박스를 통해 원하는 CSS 방법론을 선택할 수 있습니다:

#### Tailwind CSS
- 유틸리티 클래스 기반 CSS 프레임워크
- `className` 속성으로 스타일 적용
- 예시:
  ```jsx
  <button className="w-[200px] h-[50px] bg-[#3b82f6]">
    Button
  </button>
  ```

#### CSS Module
- 모듈화된 CSS 파일
- 클래스명 스코프 격리
- 예시:
  ```css
  .button {
    width: 200px;
    height: 50px;
    background-color: #3b82f6;
  }
  ```

#### Styled-Components
- CSS-in-JS 라이브러리
- 템플릿 리터럴로 스타일 정의
- 예시:
  ```jsx
  const StyledButton = styled.button`
    width: 200px;
    height: 50px;
    background-color: #3b82f6;
  `;
  ```

**여러 개 선택 가능**: 동시에 여러 CSS 스택의 코드를 생성할 수 있습니다.

---

## 실시간 프리뷰

### 개요
Preview 컴포넌트는 설정한 스타일을 실시간으로 시각화하여 보여줍니다.

### 작동 원리
1. InputForm에서 속성 변경
2. `properties` state 업데이트
3. Preview 컴포넌트가 자동으로 리렌더링
4. 변경사항 즉시 반영

### 프리뷰 영역
- **크기**: 400px 고정 높이
- **배경**: 회색 배경으로 컴포넌트 강조
- **중앙 정렬**: 컴포넌트가 중앙에 배치됨
- **스크롤**: 내용이 넘칠 경우 스크롤 가능

### 컴포넌트별 프리뷰

#### Button
```jsx
<button style={dynamicStyles}>
  Button
</button>
```
- 텍스트: "Button"
- 커서: pointer
- 정렬: 중앙

#### Input 
```jsx
<input
  type="text"
  placeholder="Input Text"
  style={dynamicStyles}
/>
```

#### Card 
```jsx
<div style={dynamicStyles}>
  <h2>Card Title</h2>
</div>
```

---

## 코드 생성기

### 개요
설정한 속성을 바탕으로 선택한 CSS 스택의 코드를 자동으로 생성합니다.

### 코드 탭

여러 CSS 스택을 선택한 경우 탭으로 전환할 수 있습니다:
- 탭 클릭으로 코드 전환
- 선택되지 않은 CSS 스택은 탭에 표시되지 않음
- 활성 탭은 하단 파란색 밑줄로 표시

### 코드 복사 기능

#### Copy 버튼
- 위치: 코드 영역 우측 상단
- 기능: 클립보드에 코드 복사
- 피드백: "Copied!" 메시지 2초간 표시

#### 사용 방법
```
1. 원하는 CSS 스택 탭 선택
2. Copy 버튼 클릭
3. "Copied!" 메시지 확인
4. 프로젝트에 붙여넣기 (Ctrl+V / Cmd+V)
```

### 생성기 상세

각 생성기의 자세한 내용은 [Code Generators](Code-Generators) 페이지를 참고하세요.

#### Tailwind Generator
- 파일: `tailwindGen.js`
- 입력: 컴포넌트 타입, 속성 객체
- 출력: Tailwind className 문자열

#### CSS Module Generator
- 파일: `cssModulGen.js`
- 입력: 컴포넌트 타입, 속성 객체
- 출력: CSS 클래스 정의

#### Styled-Components Generator
- 파일: `styleComponentsGen.js`
- 입력: 컴포넌트 타입, 속성 객체
- 출력: styled-components 코드

---

## 다크모드

### 개요
DarkModeToggle 컴포넌트를 통해 라이트/다크 모드를 전환할 수 있습니다.

### 위치
화면 우측 상단에 토글 버튼이 위치합니다.

### 작동 방식

#### 토글 스위치
- **라이트 모드**: 회색 배경, "라이트모드" 텍스트
- **다크 모드**: 파란색 배경, "다크모드" 텍스트
- **애니메이션**: 스위치가 부드럽게 이동

#### localStorage 저장
```javascript
// 다크모드 설정 저장
localStorage.setItem("darkMode", isDarkMode);

// 다음 방문 시 자동 로드
const savedMode = localStorage.getItem("darkMode");
```

사용자의 다크모드 설정이 자동으로 저장되어 다음 방문 시에도 유지됩니다.

#### CSS 클래스
```javascript
// 다크모드 활성화
document.body.classList.add("dark-mode");

// 다크모드 비활성화
document.body.classList.remove("dark-mode");
```

### 다크모드 스타일

`index.css`에 정의된 다크모드 스타일:
```css
body.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

body.dark-mode .bg-white {
  background-color: #2d2d2d;
}

/* 기타 다크모드 스타일... */
```

---

## 반응형 디자인

### 개요
StyleFactory는 모바일, 태블릿, 데스크톱 모든 화면 크기를 지원합니다.

### 브레이크포인트

#### 모바일 (< 1024px)
- **레이아웃**: 세로 방향 (flex-col)
- **InputForm**: 화면 너비 100%
- **Preview**: 화면 너비 100%
- **순서**: InputForm → Preview

#### 데스크톱 (≥ 1024px)
- **레이아웃**: 가로 방향 (flex-row)
- **InputForm**: 화면 너비 33%
- **Preview**: 화면 너비 67%
- **최대 너비**: 1280px (중앙 정렬)

### Tailwind CSS 반응형 클래스

```jsx
<div className="
  flex flex-col           // 기본: 세로 방향
  lg:flex-row            // 큰 화면: 가로 방향
  lg:w-[1280px]          // 큰 화면: 최대 너비
">
  <section className="
    w-full                // 기본: 100% 너비
    lg:w-1/3              // 큰 화면: 33% 너비
  ">
    {/* InputForm */}
  </section>

  <section className="
    w-full                // 기본: 100% 너비
    lg:w-2/3              // 큰 화면: 67% 너비
  ">
    {/* Preview */}
  </section>
</div>
```

### 모바일 최적화
- 터치 친화적 UI (충분한 터치 영역)
- 최소 높이 설정으로 내용 잘림 방지
- 스크롤 가능한 영역으로 긴 내용 처리

---

## 성능 최적화

### useMemo Hook
Preview 컴포넌트에서 `useMemo`를 사용하여 코드 생성을 최적화합니다:

```javascript
const generatedCode = useMemo(() => {
  if (!selectedComponent) return;

  if (activeTab === "tailwind") {
    return generateTailwindCode(selectedComponent, properties);
  }
  // ...
}, [selectedComponent, properties, activeTab]);
```

**효과**: 의존성이 변경될 때만 코드를 재생성하여 불필요한 재계산 방지

### 상태 관리
- React의 `useState`로 로컬 상태 관리
- Props drilling으로 간단한 상태 전달
- 불필요한 상태 업데이트 최소화

---

## 접근성 (Accessibility)

### 시맨틱 HTML
```jsx
<section>
  <h2 className="sr-only">ControlBox</h2>
  {/* 내용 */}
</section>
```

### 스크린 리더 지원
- `sr-only` 클래스로 시각적으로 숨겨진 제목
- 의미 있는 `label`과 `input` 연결
- `aria-*` 속성 (추가 예정)

### 키보드 내비게이션
- 모든 인터랙티브 요소에 포커스 가능
- Tab 키로 순차 이동
- Enter/Space로 버튼 활성화

---

## 다음 단계

- [Architecture](Architecture) - 프로젝트 구조 이해하기
- [Component API](Component-API) - 컴포넌트 API 문서
- [Code Generators](Code-Generators) - 코드 생성기 상세 분석
