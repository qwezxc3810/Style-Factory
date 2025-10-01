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
