import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const InputField = ({
  colorLabel,
  wheigth = "w-full",
  higth = "h-10",
  text,
  id,
  type,
  placeholder = "",
  value,
  register,
  name,
  errors,
  validation,
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block mb-2 font-semibold text-xs ${colorLabel}`}
      >
        {text}
      </label>
      <div className="relative">
        <input
          maxLength={maxLength}
          aria-label={text}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          defaultValue={value}
          id={id}
          className={`border rounded-lg px-3 ${higth} py-2 text-sm ${wheigth} outline-none ${
            errors[name] ? "border-red-500" : ""
          }`}
          {...(register && register(name, validation))}
        />
        {type === "password" && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      {errors[name] && (
        <span className="absolute w-full text-center text-red-500 text-xs mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};
