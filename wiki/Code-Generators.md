# Code Generators

StyleFactory의 코드 생성기 구현을 상세히 설명합니다.

## 목차
- [개요](#개요)
- [Tailwind Generator](#tailwind-generator)
- [CSS Module Generator](#css-module-generator)
- [Styled-Components Generator](#styled-components-generator)
- [생성기 확장하기](#생성기-확장하기)

---

## 개요

코드 생성기는 사용자가 설정한 CSS 속성을 받아 각 CSS 방법론에 맞는 코드를 생성하는 유틸리티 함수들입니다.

### 위치
```
src/utils/codeGenerators/
├── tailwindGen.js
├── cssModulGen.js
└── styleComponentsGen.js
```

### 공통 인터페이스

모든 생성기는 동일한 함수 시그니처를 따릅니다:

```javascript
function generateCode(type, properties)
```

**매개변수**:
- `type` (string): 컴포넌트 타입 (`"Button"`, `"Input"`, `"Card"`)
- `properties` (object): CSS 속성 객체

**반환값**:
- `string`: 생성된 코드

**Properties 객체 구조**:
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

---

## Tailwind Generator

### 파일
`src/utils/codeGenerators/tailwindGen.js`

### 함수
```javascript
export const generateTailwindCode = (type, properties)
```

### 구현 상세

#### 1. 클래스 생성
각 CSS 속성을 Tailwind 유틸리티 클래스로 변환합니다.

```javascript
const widthClass = `w-[${properties.width}px]`;
const heightClass = `h-[${properties.height}px]`;
const bgClass = `bg-[${properties.background}]`;
const paddingClass = `p-[${properties.padding}px]`;
const colorClass = `text-[${properties.color}]`;
```

**임의 값 사용**: Tailwind CSS v3+ 의 임의 값 구문 `[]`을 사용합니다.

#### 2. Border 처리
Border는 삼항 연산자를 중첩하여 처리합니다:

```javascript
const borderClass =
  properties.border === "none"
    ? ""
    : properties.border === "1px solid"
    ? "border border-black"
    : "border-2 border-dashed border-black";
```

**매핑 테이블**:
| 입력 | Tailwind 클래스 |
|------|-----------------|
| `"none"` | `""` (빈 문자열) |
| `"1px solid"` | `"border border-black"` |
| `"2px dashed"` | `"border-2 border-dashed border-black"` |

#### 3. 클래스 필터링
빈 문자열을 제거합니다:

```javascript
const classes = [
  widthClass,
  heightClass,
  bgClass,
  borderClass,
  paddingClass,
  colorClass,
].filter(Boolean);
```

#### 4. 포맷팅
클래스를 2개씩 묶어 포맷팅합니다:

```javascript
let formattedClasses = "";

for (let i = 0; i < classes.length; i += 2) {
  formattedClasses += `\n\t${classes[i]}`;
  if (classes[i + 1]) {
    formattedClasses += `${classes[i + 1]}`;
  }
}

formattedClasses = formattedClasses.trim();
```

**결과**:
```
w-[200px]h-[50px]
bg-[#3b82f6]border border-black
p-[10px]text-[#ffffff]
```

#### 5. 컴포넌트 타입별 JSX 생성

```javascript
if (type === "Button") {
  return `<button className="${formattedClasses} cursor-pointer">Button</button>`;
} else if (type === "Card") {
  return `<div className="${formattedClasses}>
    <h2 className="text-2xl font-bold">Card Title</h2>
    </div>`;
} else if (type === "Input") {
  return `<input type="text" placeholder = "Input Text" className="${formattedClasses}/>`;
}
```

### 전체 코드

```javascript
export const generateTailwindCode = (type, properties) => {
  const widthClass = `w-[${properties.width}px]`;
  const heightClass = `h-[${properties.height}px]`;
  const bgClass = `bg-[${properties.background}]`;
  const borderClass =
    properties.border === "none"
      ? ""
      : properties.border === "1px solid"
      ? "border border-black"
      : "border-2 border-dashed border-black";
  const paddingClass = `p-[${properties.padding}px]`;
  const colorClass = `text-[${properties.color}]`;

  const classes = [
    widthClass,
    heightClass,
    bgClass,
    borderClass,
    paddingClass,
    colorClass,
  ].filter(Boolean);

  let formattedClasses = "";

  for (let i = 0; i < classes.length; i += 2) {
    formattedClasses += `\n\t${classes[i]}`;
    if (classes[i + 1]) {
      formattedClasses += `${classes[i + 1]}`;
    }
  }

  formattedClasses = formattedClasses.trim();

  if (type === "Button") {
    return `<button className="${formattedClasses} cursor-pointer">Button</button>`;
  } else if (type === "Card") {
    return `<div className="${formattedClasses}>
    <h2 className="text-2xl font-bold">Card Title</h2>
    </div>`;
  } else if (type === "Input") {
    return `<input type="text" placeholder = "Input Text" className="${formattedClasses}/>`;
  }
};
```

### 사용 예시

**입력**:
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

**출력**:
```jsx
<button className="w-[200px]h-[50px] bg-[#3b82f6]border border-black p-[10px]text-[#ffffff] cursor-pointer">Button</button>
```

---

## CSS Module Generator

### 파일
`src/utils/codeGenerators/cssModulGen.js`

### 함수
```javascript
export const generateCSSModuleCode = (type, properties)
```

### 구현 상세

#### 1. 클래스명 생성
컴포넌트 타입을 소문자로 변환하여 클래스명으로 사용합니다:

```javascript
const className = type.toLowerCase();
```

**예시**:
- `"Button"` → `"button"`
- `"Card"` → `"card"`
- `"Input"` → `"input"`

#### 2. Border 값 처리
Border 속성을 처리합니다:

```javascript
const borderValue =
  properties.border === "none" ? "none" : `${properties.border}`;
```

**매핑**:
| 입력 | CSS 값 |
|------|--------|
| `"none"` | `"none"` |
| `"1px solid"` | `"1px solid"` |
| `"2px dashed"` | `"2px dashed"` |

#### 3. CSS 클래스 생성
템플릿 리터럴로 CSS 코드를 생성합니다:

```javascript
return `.${className} {
  width: ${properties.width}px;
  height: ${properties.height}px;
  background-color: ${properties.background};
  border: ${borderValue};
  padding: ${properties.padding}px;
  color: ${properties.color};
}`;
```

### 전체 코드

```javascript
export const generateCSSModuleCode = (type, properties) => {
  const className = type.toLowerCase();

  const borderValue =
    properties.border === "none" ? "none" : `${properties.border}`;

  return `.${className} {
  width: ${properties.width}px;
  height: ${properties.height}px;
  background-color: ${properties.background};
  border: ${borderValue};
  padding: ${properties.padding}px;
  color: ${properties.color};
}`;
};
```

### 사용 예시

**입력**:
```javascript
generateCSSModuleCode("Button", {
  width: 200,
  height: 50,
  background: "#3b82f6",
  border: "1px solid",
  padding: 10,
  color: "#ffffff"
})
```

**출력**:
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

### 실제 프로젝트 사용법

생성된 CSS를 모듈 파일로 저장:

**Button.module.css**:
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

**Button.jsx**:
```jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Button</button>;
}
```

---

## Styled-Components Generator

### 파일
`src/utils/codeGenerators/styleComponentsGen.js`

### 함수
```javascript
export const generateStyledComponentsCode = (type, properties)
```

### 구현 상세

#### 1. Border 값 처리
Border 속성에 색상을 추가합니다:

```javascript
const borderValue =
  properties.border === "none" ? "none" : `${properties.border} #000`;
```

**매핑**:
| 입력 | Styled-Components 값 |
|------|----------------------|
| `"none"` | `"none"` |
| `"1px solid"` | `"1px solid #000"` |
| `"2px dashed"` | `"2px dashed #000"` |

**참고**: Styled-Components에서는 border에 색상을 명시해야 합니다.

#### 2. Element 타입 결정
컴포넌트 타입에 따라 HTML 요소를 결정합니다:

```javascript
const elementType =
  type === "Input" ? "input" : type === "Button" ? "button" : "div";
```

**매핑**:
| 컴포넌트 타입 | HTML 요소 |
|---------------|-----------|
| `"Input"` | `input` |
| `"Button"` | `button` |
| `"Card"` | `div` |

#### 3. Styled-Components 코드 생성
템플릿 리터럴로 코드를 생성합니다:

```javascript
return `const Styled${type} = styled.${elementType}\`
  width: ${properties.width}px;
  height: ${properties.height}px;
  background-color: ${properties.background};
  border: ${borderValue};
  padding: ${properties.padding}px;
  color: ${properties.color};
  border-radius: 8px;
\`;`;
```

**참고**:
- `border-radius: 8px`가 자동으로 추가됩니다
- 변수명은 `Styled${type}` 형식입니다 (예: `StyledButton`)

### 전체 코드

```javascript
export const generateStyledComponentsCode = (type, properties) => {
  const borderValue =
    properties.border === "none" ? "none" : `${properties.border} #000`;
  const elementType =
    type === "Input" ? "input" : type === "Button" ? "button" : "div";

  return `const Styled${type} = styled.${elementType}\`
  width: ${properties.width}px;
  height: ${properties.height}px;
  background-color: ${properties.background};
  border: ${borderValue};
  padding: ${properties.padding}px;
  color: ${properties.color};
  border-radius: 8px;
\`;`;
};
```

### 사용 예시

**입력**:
```javascript
generateStyledComponentsCode("Button", {
  width: 200,
  height: 50,
  background: "#3b82f6",
  border: "1px solid",
  padding: 10,
  color: "#ffffff"
})
```

**출력**:
```javascript
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

### 실제 프로젝트 사용법

**Button.jsx**:
```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #3b82f6;
  border: 1px solid #000;
  padding: 10px;
  color: #ffffff;
  border-radius: 8px;
`;

function Button() {
  return <StyledButton>Button</StyledButton>;
}

export default Button;
```

---

## 생성기 확장하기

### 새로운 CSS 속성 추가

#### 1. Properties State 확장
`Layout.jsx`에서 새 속성 추가:

```javascript
const [properties, setProperties] = useState({
  width: 200,
  height: 150,
  background: "#ffffff",
  border: "1px solid",
  padding: 10,
  color: "#000",
  // 새 속성 추가
  margin: 0,
  borderRadius: 8,
});
```

#### 2. InputForm 필드 추가
`InputForm.jsx`의 `propertiesFields` 배열에 추가:

```javascript
const propertiesFields = [
  // 기존 필드...
  {
    name: "Margin",
    key: "margin",
    type: "number",
    value: properties.margin,
  },
  {
    name: "Border Radius",
    key: "borderRadius",
    type: "number",
    value: properties.borderRadius,
  },
];
```

#### 3. 각 생성기 업데이트

**tailwindGen.js**:
```javascript
const marginClass = `m-[${properties.margin}px]`;
const roundedClass = `rounded-[${properties.borderRadius}px]`;

const classes = [
  widthClass,
  heightClass,
  bgClass,
  borderClass,
  paddingClass,
  marginClass,
  roundedClass,
  colorClass,
].filter(Boolean);
```

**cssModulGen.js**:
```javascript
return `.${className} {
  width: ${properties.width}px;
  height: ${properties.height}px;
  background-color: ${properties.background};
  border: ${borderValue};
  padding: ${properties.padding}px;
  margin: ${properties.margin}px;
  border-radius: ${properties.borderRadius}px;
  color: ${properties.color};
}`;
```

**styleComponentsGen.js**:
```javascript
return `const Styled${type} = styled.${elementType}\`
  width: ${properties.width}px;
  height: ${properties.height}px;
  background-color: ${properties.background};
  border: ${borderValue};
  padding: ${properties.padding}px;
  margin: ${properties.margin}px;
  border-radius: ${properties.borderRadius}px;
  color: ${properties.color};
\`;`;
```

#### 4. Preview 업데이트
`Preview.jsx`의 `baseStyle`에 추가:

```javascript
const baseStyle = {
  width: `${properties.width}px`,
  height: `${properties.height}px`,
  backgroundColor: properties.background,
  border: properties.border === "none" ? "none" : `${properties.border} #000`,
  padding: `${properties.padding}px`,
  margin: `${properties.margin}px`,
  borderRadius: `${properties.borderRadius}px`,
  color: properties.color,
};
```

### 새로운 컴포넌트 타입 추가

#### 1. 버튼 컴포넌트 추가
`UI/Button.jsx`에 새 버튼 추가:

```javascript
export const Btn = ({ selectedComponent, setSelectedComponent }) => {
  const components = ["Button", "Card", "Input"];

  return (
    <div className="flex gap-2">
      {components.map((comp) => (
        <button
          key={comp}
          onClick={() => setSelectedComponent(comp)}
          className={`px-4 py-2 rounded ${
            selectedComponent === comp
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {comp}
        </button>
      ))}
    </div>
  );
};
```

#### 2. 생성기에 케이스 추가
각 생성기의 `if-else` 문에 새 타입 추가:

```javascript
if (type === "Button") {
  // Button 코드
} else if (type === "Card") {
  // Card 코드
} else if (type === "Input") {
  // Input 코드
} else if (type === "NewComponent") {
  // 새 컴포넌트 코드
}
```

#### 3. Preview에 렌더링 추가
`Preview.jsx`의 `renderPreview` 함수에 추가:

```javascript
if (selectedComponent === "Button") {
  // Button 렌더링
} else if (selectedComponent === "NewComponent") {
  return (
    <div style={baseStyle}>
      <p>New Component Content</p>
    </div>
  );
}
```

---

## 최적화 및 베스트 프랙티스

### 1. 메모이제이션
Preview 컴포넌트에서 `useMemo`를 사용하여 코드 생성 최적화:

```javascript
const generatedCode = useMemo(() => {
  // 생성기 호출
}, [selectedComponent, properties, activeTab]);
```

### 2. 에러 처리
생성기에 유효성 검사 추가:

```javascript
export const generateTailwindCode = (type, properties) => {
  if (!type || !properties) {
    console.error("Invalid arguments");
    return "";
  }

  // 코드 생성...
};
```

---

## 다음 단계

- [Development Guide](Development-Guide) - 개발 환경 설정 및 워크플로우
- [Customization](Customization) - 프로젝트 커스터마이징 가이드
- [Contributing](Contributing) - 기여 방법
