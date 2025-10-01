import React, { useState, useEffect, useMemo } from "react";
import { Btn } from "../UI/Button.jsx";
import { generateTailwindCode } from "../../utils/codeGenerators/tailwindGen.js";
import { generateCSSModuleCode } from "../../utils/codeGenerators/cssModulGen.js";
import { generateStyledComponentsCode } from "../../utils/codeGenerators/styleComponentsGen.js";

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
      return generateStyledComponentsCode(selectedComponent, properties);
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

    const baseStyle = {
      width: `${properties.width}px`,
      height: `${properties.height}px`,
      backgroundColor: properties.background,
      border:
        properties.border === "none" ? "none" : `${properties.border} #000`,
      padding: `${properties.padding}px`,
      color: properties.color,
      borderRadius: "8px",
    };

    if (selectedComponent === "Button") {
      return (
        <button
          style={{
            ...baseStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          Button
        </button>
      );
    } else if (selectedComponent === "Card") {
      return (
        <div
          style={{
            ...baseStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Card Title</h2>
        </div>
      );
    } else if (selectedComponent === "Input") {
      return (
        <input
          type="text"
          placeholder="Input Text"
          style={{
            ...baseStyle,
            outline: "none",
          }}
        />
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="border border-gray- rounded-lg shadow-sm bg-white overflow-hidden h-[400px] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray- bg-gray-50 flex-shrink-0">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
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
        <pre className="p-4 overflow-auto flex-1">
          <code className="text-m">{generatedCode}</code>
        </pre>
      </section>

      <section className="border border-gray-200= rounded-lg shadow-sm bg-white= p-8 h-[400px] flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-gray-900= flex-shrink-0">
          Preview
        </h2>
        <div className="flex items-center justify-center flex-1 bg-gray-50= rounded-lg p-8 overflow-auto font-bold text-2xl">
          {renderPreview()}
        </div>
      </section>
    </div>
  );
};
