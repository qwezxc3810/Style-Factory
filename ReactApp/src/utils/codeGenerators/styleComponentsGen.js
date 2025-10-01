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
