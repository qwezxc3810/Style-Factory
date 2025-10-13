import React, { useState } from "react";
import { InputForm } from "./InputForm/InputForm.jsx";
import { Preview } from "./Preview/Preview.jsx";
import DarkModeToggle from "./UI/DarkModeToggle.jsx";

const Layout = () => {
  const [properties, setProperties] = useState({
    width: 200,
    height: 150,
    background: "#ffffff",
    border: "1px solid",
    padding: 10,
    color: "#000",
  });
  const [cssStack, setCssStack] = useState({
    tailwind: true,
    cssModule: true,
    styledComponents: true,
  });

  const [selectedComponent, setSelectedComponent] = useState("Button");

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-2xl rounded-xl w-full min-h-screnn flex flex-col items-center justify-start gap-10 lg:w-[1280px] lg:[720px] lg: mx-auto lg:flex-row lg:justify-between lg:items-center relative">
        <DarkModeToggle />
        <section className="w-full lg:w-1/3">
          <h2 className="sr-only">ControlBox</h2>
          <InputForm
            properties={properties}
            setProperties={setProperties}
            cssStack={cssStack}
            setCssStack={setCssStack}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
          />
        </section>
        <section className="w-full lg:w-2/3">
          <Preview
            properties={properties}
            cssStack={cssStack}
            selectedComponent={selectedComponent}
          />
        </section>
      </div>
    </div>
  );
};

export default Layout;
