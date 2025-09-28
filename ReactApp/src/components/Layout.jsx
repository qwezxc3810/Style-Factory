import React from "react";
import { InputForm } from "./InputForm/InputForm.jsx";

const Layout = ({ left, right }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="bg-white p-4 shadow-2xl rounded-xl w-full min-h-screnn flex flex-col items-center justify-start lg:w-[1280px] lg:[720px] lg: mx-auto lg:flex-row lg:justify-between lg:items-center">
        <section>
          <InputForm />
        </section>
        <section>{right}</section>
      </div>
    </div>
  );
};

export default Layout;
