import React from "react"

interface HandlerChange {
  target: { id: string; value: string }
}

interface props {
  type: string
  name: string
  label: boolean
  onChange: (a: HandlerChange) => void
  value?: string | number
}

const Input = ({ type, name, label, onChange, value }: props) => {
  const style =
    " block w-full py-0.5 px-2 rounded-lg outline-none my-1 mb-3 border-gray-200 border-2"

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
  )
}

export default Input
