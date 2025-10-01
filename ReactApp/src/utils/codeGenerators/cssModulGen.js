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
  color: ${properties.color};}`;
};
