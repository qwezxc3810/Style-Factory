import React, { useState } from "react";

export const InputForm = () => {
  const [properties, setProperties] = useState({
    width: 100,
    height: 100,
    background: "#ffffff",
    border: "1px solid",
    padding: 10,
  });

  const [cssStack, setCssStack] = useState({
    tailwind: true,
    cssModule: true,
    styledComponents: true,
  });

  const propertiesFields = [
    { name: "Width", key: "width", type: "number", value: properties.width },
    {
      name: "Height",
      key: "height",
      type: "number",
      value: properties.height,
    },
    {
      name: "Background",
      key: "background",
      type: "text",
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
  ];

  const cssStacks = [
    { name: "Tailwind", key: "tailwind" },
    { name: "CSS Module", key: "cssModule" },
    { name: "Styled-Components", key: "styledComponents" },
  ];

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    setProperties((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStackChange = (e) => {
    const { name, checked } = e.target;
    setCssStack((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="flex flex-col gap-10 border border-gray-200 p-10 rounded-lg shadow-sm">
      <form>
        <fieldset>
          <legend className="text-2xl mb-10">Properties</legend>
          <ul className="flex flex-col gap-10">
            {propertiesFields.map((field) => (
              <li
                key={field.key}
                className="flex justify-between items-center gap-10 "
              >
                <label htmlFor={field.key} className="text-gray-700">
                  {field.name}
                </label>
                {field.type === "select" ? (
                  <select
                    type={field.type}
                    id={field.key}
                    name={field.key}
                    value={field.value}
                    onChange={handlePropertyChange}
                    className="w-36 p-2 border border-gray-300 rounded-md text-center"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.key}
                    name={field.key}
                    value={field.value}
                    onChange={handlePropertyChange}
                    className="w-36 p-2 border border-gray-300 rounded-md text-center"
                  />
                )}
              </li>
            ))}
          </ul>
        </fieldset>
      </form>
      <section>
        <h2>Component Type</h2>
        <section>
          <h3 className="sr-only">Components List</h3>
          <button className="">Button</button>
          <button className="">Card</button>
          <button className="">Input</button>
        </section>
        <section>
          <h3 className="sr-only">CSS Stack</h3>
          <ul>
            {cssStacks.map((stack) => (
              <li key={stack.key} className="flex items-center">
                <input
                  type="checkbox"
                  id={stack.key}
                  name={stack.key}
                  checked={cssStack[stack.key]}
                  onChange={handleStackChange}
                  className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={stack.key}
                  className="ml-3 text-base font-medium text-gray-900"
                >
                  {stack.name}
                </label>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};
