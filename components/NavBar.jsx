import React from "react";

const NavBar = () => {
  return (
    <header className="fixed w-full top-4 lg:top-8 left-0 flex justify-center z-10">
      <nav className="h-16 bg-white bg-opacity-50 w-11/12 lg:w-9/12 flex justify-between items-center px-6 lg:px-20 backdrop-blur-sm shadow-2xl shadow-gray-200 rounded-full">
        <a href="/" className="uppercase text-xl">
          <span className="text-red-500 font-black">Fox</span>
          <span>IFY</span>
        </a>
        <div className="flex gap-4">
          <a href="/about">About team</a>
          <a href="https://www.buymeacoffee.com/zerok" target={"_blank"}>
            Coffe ☕
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
