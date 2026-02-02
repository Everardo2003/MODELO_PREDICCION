import React from 'react'

function BinaryLabel({ label, name, value, onChange, error }) {
  return (
    <div className="w-3/4 flex flex-col items-center gap-3 mx-auto mt-1 mb-7 lg:items-start">
      <p className={`self-start ${error ? 'text-red-500 font-semibold' : ''}`}>
        {label}
      </p>
      <div className={`flex gap-4 lg:ml-10 ${error ? 'border-red-500' : ''}`}>
        <label>
          <input
            type="radio"
            name={name}
            value="1"
            checked={value === 1}
            onChange={(e) => onChange(name, Number(e.target.value))}
          />
          Sí
        </label>
        <label>
          <input
            type="radio"
            name={name}
            value="0"
            checked={value === 0}
            onChange={(e) => onChange(name, Number(e.target.value))}
          />
          No
        </label>
      </div>
    </div>
  )
}

export default BinaryLabel
