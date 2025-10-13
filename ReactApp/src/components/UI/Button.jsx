const ComponentType = {
  Button: "Button",
  Input: "Input",
  Card: "Card",
};

export const Btn = ({ selectedComponent, setSelectedComponent }) => {
  return (
    <>
      {Object.values(ComponentType).map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => setSelectedComponent(type)}
          className={`
      px-4 py-2 rounded-lg border transition-colors cursor-pointer
      ${
        selectedComponent === type
          ? "bg-[#025CC8] text-white border-[#025CC8]"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
      }
    `}
        >
          {type}
        </button>
      ))}
    </>
  );
};
