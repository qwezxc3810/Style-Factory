# Component API

StyleFactory의 각 컴포넌트에 대한 상세한 API 문서입니다.

## 목차

- [Layout](#layout)
- [InputForm](#inputform)
- [Preview](#preview)
- [DarkModeToggle](#darkmodetoggle)
- [Button](#button)

---

## Layout

메인 레이아웃 컴포넌트로, 전체 애플리케이션의 상태를 관리합니다.

### Import

```javascript
import Layout from "./components/Layout.jsx";
```

### Props

없음 (루트 컴포넌트)

### State

#### `properties`

**타입**: `Object`

CSS 속성 값을 저장하는 객체입니다.

```typescript
{
  width: number; // 너비 (px)
  height: number; // 높이 (px)
  background: string; // 배경색 (HEX)
  border: string; // 테두리 스타일
  padding: number; // 내부 여백 (px)
  color: string; // 텍스트 색상 (HEX)
}
```

**기본값**:

```javascript
{
  width: 200,
  height: 150,
  background: "#ffffff",
  border: "1px solid",
  padding: 10,
  color: "#000",
}
```

#### `cssStack`

**타입**: `Object`

선택된 CSS 스택을 저장하는 객체입니다.

```typescript
{
  tailwind: boolean;
  cssModule: boolean;
  styledComponents: boolean;
}
```

**기본값**:

```javascript
{
  tailwind: true,
  cssModule: true,
  styledComponents: true,
}
```

#### `selectedComponent`

**타입**: `string`

현재 선택된 컴포넌트 타입입니다.

**가능한 값**: `"Button"` | `"Card"` | `"Input"`

**기본값**: `"Button"`

### 사용 예시

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
```

### 레이아웃 구조

```jsx
<div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
  <div className="bg-white p-10 shadow-2xl rounded-xl w-full min-h-screnn flex flex-col items-center justify-start gap-10 lg:w-[1280px] lg:[720px] lg: mx-auto lg:flex-row lg:justify-between lg:items-center relative">
    <DarkModeToggle />
    <section className="w-full lg:w-1/3">
      <InputForm {...props} />
    </section>
    <section className="w-full lg:w-2/3">
      <Preview {...props} />
    </section>
  </div>
</div>
```

---

## InputForm

사용자 입력을 받는 폼 컴포넌트입니다.

### Import

```javascript
import { InputForm } from "./components/InputForm/InputForm.jsx";
```

### Props

| Prop                   | 타입       | 필수 | 설명                   |
| ---------------------- | ---------- | ---- | ---------------------- |
| `properties`           | `Object`   | ✅   | 현재 CSS 속성 값       |
| `setProperties`        | `Function` | ✅   | 속성 업데이트 함수     |
| `cssStack`             | `Object`   | ✅   | 선택된 CSS 스택        |
| `setCssStack`          | `Function` | ✅   | CSS 스택 업데이트 함수 |
| `selectedComponent`    | `string`   | ✅   | 선택된 컴포넌트 타입   |
| `setSelectedComponent` | `Function` | ✅   | 컴포넌트 업데이트 함수 |

### Props 상세

#### `properties`

```typescript
{
  width: number;
  height: number;
  background: string;
  border: string;
  padding: number;
  color: string;
}
```

#### `setProperties`

```typescript
(updater: (prev: Properties) => Properties) =>
  `이 함수는 아무것도 반환하지 않습니다.`;
```

**사용 예시**:

```javascript
setProperties((prev) => ({
  ...prev,
  width: 300,
}));
```

#### `cssStack`

```typescript
{
  tailwind: boolean;
  cssModule: boolean;
  styledComponents: boolean;
}
```

#### `setCssStack`

```typescript
(updater: (prev: CssStack) => CssStack) =>
  `이 함수는 아무것도 반환하지 않습니다.`;
```

#### `selectedComponent`

```typescript
"Button" | "Card" | "Input";
```

#### `setSelectedComponent`

```typescript
(component: string) => `이 함수는 아무것도 반환하지 않습니다.`;
```

### 내부 구조

#### Properties Fields

```javascript
const propertiesFields = [
  { name: "Width", key: "width", type: "number", value: properties.width },
  { name: "Height", key: "height", type: "number", value: properties.height },
  {
    name: "Background",
    key: "background",
    type: "color",
    value: properties.background,
  },
  {
    name: "Border",
    key: "border",
    type: "select",
    value: properties.border,
    options: ["1px solid", "2px dashed", "none"],
  },
  {
    name: "Padding",
    key: "padding",
    type: "number",
    value: properties.padding,
  },
  { name: "Color", key: "color", type: "color", value: properties.color },
];
```

#### CSS Stacks

```javascript
const cssStacks = [
  { name: "Tailwind", key: "tailwind" },
  { name: "CSS Module", key: "cssModule" },
  { name: "Styled-Components", key: "styledComponents" },
];
```

### 이벤트 핸들러

#### `handlePropertyChange`

속성 값 변경을 처리합니다.

```javascript
const handlePropertyChange = (e) => {
  const { name, value } = e.target;
  setProperties((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

#### `handleStackChange`

CSS 스택 선택을 처리합니다.

```javascript
const handleStackChange = (e) => {
  const { name, checked } = e.target;
  setCssStack((prev) => ({
    ...prev,
    [name]: checked,
  }));
};
```

### 사용 예시

```javascript
<InputForm
  properties={properties}
  setProperties={setProperties}
  cssStack={cssStack}
  setCssStack={setCssStack}
  selectedComponent={selectedComponent}
  setSelectedComponent={setSelectedComponent}
/>
```

---

## Preview

실시간 프리뷰와 코드를 표시하는 컴포넌트입니다.

### Import

```javascript
import { Preview } from "./components/Preview/Preview.jsx";
```

### Props

| Prop                | 타입     | 필수 | 설명                   |
| ------------------- | -------- | ---- | ---------------------- |
| `properties`        | `Object` | ✅   | 적용할 CSS 속성        |
| `cssStack`          | `Object` | ✅   | 표시할 CSS 스택        |
| `selectedComponent` | `string` | ✅   | 프리뷰할 컴포넌트 타입 |

### Props 상세

#### `properties`

프리뷰에 적용될 CSS 속성입니다 (읽기 전용).

#### `cssStack`

표시할 탭을 결정하는 CSS 스택입니다.

**예시**:

```javascript
{ tailwind: true, cssModule: false, styledComponents: true }
// → "Tailwind"과 "Styled-Components" 탭만 표시
```

#### `selectedComponent`

프리뷰할 컴포넌트 타입입니다.

### Internal State

#### `activeTab`

**타입**: `string`
**기본값**: `"tailwind"`
**설명**: 현재 활성화된 탭

#### `copySuccess`

**타입**: `boolean`
**기본값**: `false`
**설명**: 복사 성공 여부 (2초 후 자동 초기화)

### 주요 함수

#### `handleCopy`

클립보드에 코드를 복사합니다.

```javascript
const handleCopy = () => {
  navigator.clipboard.writeText(generatedCode);
  setCopySuccess(true);
  setTimeout(() => setCopySuccess(false), 2000);
};
```

#### `renderPreview`

선택된 컴포넌트의 프리뷰를 렌더링합니다.

```javascript
const renderPreview = () => {
  if (!selectedComponent) {
    return <div>컴포넌트 타입을 선택해 주세요.</div>;
  }

  const baseStyle = {
    width: `${properties.width}px`,
    height: `${properties.height}px`,
    backgroundColor: properties.background,
    // ...
  };

  if (selectedComponent === "Button") {
    return <button style={baseStyle}>Button</button>;
  }
  // ...
};
```

### Memoization

#### `generatedCode`

코드 생성을 메모이제이션하여 성능을 최적화합니다.

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

**의존성**: `selectedComponent`, `properties`, `activeTab`

### 사용 예시

```javascript
<Preview
  properties={properties}
  cssStack={cssStack}
  selectedComponent={selectedComponent}
/>
```

---

## DarkModeToggle

다크모드 전환 토글 컴포넌트입니다.

### Import

```javascript
import DarkModeToggle from "./components/UI/DarkModeToggle.jsx";
```

### Props

없음 (독립적인 컴포넌트)

### Internal State

#### `isDarkMode`

**타입**: `boolean`
**설명**: 다크모드 활성화 여부

**초기화**:

```javascript
const [isDarkMode, setIsDarkMode] = useState(() => {
  const savedMode = localStorage.getItem("darkMode");
  return savedMode === "true" ? true : false;
});
```

localStorage에서 저장된 값을 로드하여 초기화합니다.

### Effects

#### 다크모드 적용 및 저장

```javascript
useEffect(() => {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  localStorage.setItem("darkMode", isDarkMode);
}, [isDarkMode]);
```

**동작**:

1. `isDarkMode`가 변경될 때마다 실행
2. body 요소에 `dark-mode` 클래스 추가/제거
3. localStorage에 현재 상태 저장

### 함수

#### `toggleTheme`

다크모드를 토글합니다.

```javascript
const toggleTheme = () => {
  setIsDarkMode((prev) => !prev);
};
```

### 사용 예시

```javascript
<DarkModeToggle />
```

### 스타일

토글 스위치는 Tailwind CSS를 사용하여 스타일링됩니다:

```jsx
<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
```

---

## Button

컴포넌트 타입 선택을 위한 버튼 컴포넌트입니다.

### Import

```javascript
import { Btn } from "./components/UI/Button.jsx";
```

### Props

| Prop                   | 타입       | 필수 | 설명                 |
| ---------------------- | ---------- | ---- | -------------------- |
| `selectedComponent`    | `string`   | ✅   | 현재 선택된 컴포넌트 |
| `setSelectedComponent` | `Function` | ✅   | 컴포넌트 선택 함수   |

### Props 상세

#### `selectedComponent`

**타입**: `string`
**설명**: 현재 선택된 컴포넌트 타입

#### `setSelectedComponent`

**타입**: `(component: string) => void`
**설명**: 컴포넌트 타입을 변경하는 함수

### 사용 예시

```javascript
<Btn
  selectedComponent={selectedComponent}
  setSelectedComponent={setSelectedComponent}
/>
```

### 구현 예시

```javascript
export const Btn = ({ selectedComponent, setSelectedComponent }) => {
  return (
    <button
      onClick={() => setSelectedComponent("Button")}
      className={`px-4 py-2 rounded ${
        selectedComponent === "Button"
          ? "bg-indigo-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      Button
    </button>
  );
};
```

---

## 다음 단계

- [Code Generators](Code-Generators) - 코드 생성기 상세 문서
- [Development Guide](Development-Guide) - 개발 가이드
- [Customization](Customization) - 커스터마이징 가이드
