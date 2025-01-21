import React from 'react';

export const TextArea = ({ 
  colorLabel, 
  text, 
  id, 
  type, 
  placeholder = '', 
  value, 
  register, 
  name, 
  errors, 
  validation,
  maxLength, 
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className={`block mb-2 font-semibold text-xs ${colorLabel}`}>
        {text}
      </label>
      <textarea
        maxLength={maxLength}
        aria-label={text}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className={`border rounded-lg px-3 py-2 text-sm w-full outline-none ${errors[name] ? 'border-red-500' : ''}`}
        {...(register && register(name, validation))}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">
          {errors[name].message}
        </span>
      )}
    </>
  );
};
