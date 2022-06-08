import React from 'react'

const Btn = ({ children, onClick, bg, margin, className }) => {
  return <button onClick={onClick}
    className={`${bg ? bg : "bg-slate-600"} text-white px-2 py-1 rounded-lg block ${margin ? margin : "my-2"} ${className}`}>{children}</button>
}

export default Btn