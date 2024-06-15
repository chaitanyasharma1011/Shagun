import React from "react";

export default function Tab({ tab = {}, pathname, onNavigate }) {
  const { title, path } = tab;
  return (
    <div
      className={`group cursor-pointer flex items-center relative${
        pathname.includes(path)
          ? " text-primary-200"
          : " hover:text-primary-200"
      }`}
      role="button"
      tabIndex="0"
      onClick={() => onNavigate(path)}
    >
      <div className="flex items-center space-x-1">
        <span>{title}</span>
      </div>

      <div
        className={`absolute bottom-0 h-[2px] bg-white transition-all${
          pathname.includes(path)
            ? " bg-primary-200"
            : " group-hover:bg-primary-200"
        } w-full`}
      />
    </div>
  );
}
