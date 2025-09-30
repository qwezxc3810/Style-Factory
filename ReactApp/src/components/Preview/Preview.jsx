import React, { useState, useEffect, useMemo } from "react";
import { Btn } from "../UI/Button.jsx";
import { generateTailwindCode } from "../../utils/codeGenerators/tailwindGen.js";

export const Preview = ({ properties, cssStack, selectedComponent }) => {
  const [activeTab, setActiveTab] = useState("tailwind");
  const [copySuccess, setCopySuccess] = useState(false);

  const allTabs = [
    { name: "Tailwind", key: "tailwind" },
    { name: "CSS Module", key: "cssModule" },
    { name: "Styled-Components", key: "styledComponents" },
  ];

  const tabs = allTabs.filter((tab) => cssStack[tab.key]);

  useEffect(() => {
    if (tabs.length > 0 && !tabs.find((tab) => tab.key === activeTab)) {
      setActiveTab(tabs[0].key);
    }
  }, [tabs, activeTab]);

  const generatedCode = useMemo(() => {
    if (!selectedComponent) return;

    if (activeTab === "tailwind") {
      return generateTailwindCode(selectedComponent, properties);
    } else if (activeTab === "cssModule") {
      return generateCSSModuleCode(selectedComponent, properties);
    } else if (activeTab === "styledComponents") {
      return generateStyledComponents(selectedComponent, properties);
    }
  }, [selectedComponent, properties, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const renderPreview = () => {
    if (!selectedComponent) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          컴포넌트 타입을 선택해 주세요.
        </div>
      );
    }
  };

  const style = {
    width: `${properties.width}px`,
    height: `${properties.height}px`,
    backgroundColor: properties.background,
    border: properties.border === "none" ? "none" : `${properties.border} #000`,
    padding: `${properties.padding}px`,
    color: properties.color,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (selectedComponent === "Button") {
    return (
      <button style={style} className="cursor-pointer">
        Button
      </button>
    );
  } else if (selectedComponent === "Card") {
    return (
      <div style={{ ...style }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Card Title</h2>
      </div>
    );
  } else if (selectedComponent === "Input") {
    return <input type="text" placeholder="Input Text" style={{ ...style }} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-white dark:bg-gray-800 text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="mx-4 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto bg-gray-900 text-gray-100">
          <code className="text-sm">{generatedCode}</code>
        </pre>
      </section>

      <section className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 p-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Preview
        </h2>
        <div className="flex items-center justify-center min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
          {renderPreview()}
        </div>
      </section>
    </div>
  );
};
