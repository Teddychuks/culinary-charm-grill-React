/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import useDetectClickOutside from "../hooks/useDetectClickOutside";

function CustomSelect({
  options,
  onSelectChange,
  icon: Icon,
  selectedOption: propSelectedOption,
  placeholder,
}) {
  const customSelectRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setSelectedOption(propSelectedOption || "");
  }, [propSelectedOption]);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setDropdownVisible(false);
    onSelectChange && onSelectChange(value);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSelectClose = () => {
    if (isDropdownVisible) {
      setDropdownVisible(false);
    }
  };

  useDetectClickOutside(customSelectRef, handleSelectClose);

  return (
    <div className="relative" ref={customSelectRef}>
      <button
        type="button"
        className="relative py-3 px-4 pe-9 flex text-nowrap w-44 cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1]"
        onClick={toggleDropdown}
      >
        {selectedOption || placeholder}
        <div className="absolute top-1/2 end-3 -translate-y-1/2 transform">
          {Icon && <Icon className="w-3.5 h-3.5 text-gray-500" />}
        </div>
      </button>

      {isDropdownVisible && (
        <div
          className="absolute top-full mt-2 left-0 z-50 w-48 max-h-[300px] p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto transform transition-transform duration-200 delay-200 ease-in-out"
          style={{
            transition: "max-height 300ms ease-in-out",
            maxHeight: isDropdownVisible ? "300px" : "0",
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="py-2 px-4 w-48 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 "
              onClick={() => handleSelectChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
