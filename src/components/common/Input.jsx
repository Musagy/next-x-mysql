import React from "react";

const Input = ({ type, name, label, onChange, value }) => {
  const style =
    " block w-full py-0.5 px-2 rounded-lg outline-none my-1 mb-3 border-gray-200 border-2";

  return (
    <>
      {label && (
        <label
          className="block font-semibold text-sm text-gray-500"
          htmlFor={name}
        >
          {name}
        </label>
      )}
      {type !== "textarea" ? (
        <input
          type={type}
          id={name}
          className={style}
          onChange={onChange}
          value={value}
        />
      ) : (
        <textarea
          id={name}
          className={style}
          onChange={onChange}
          value={value}
        />
      )}
    </>
  );
};

export default Input;
