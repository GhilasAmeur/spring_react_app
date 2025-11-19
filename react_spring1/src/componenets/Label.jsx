import React from 'react'

const Label = ({label,value,placeholder, onChange}) => {
  return (


       <label className="form-control w-full max-w-md">
        <span className="label-text">{label}</span>
        <input 
        
        className="input input-bordered w-full shadow-sm"
        type="text"
        onChange={onChange}
        placeholder={placeholder} 
        value={value}
        required
          
        />
      </label>
  )
}

export default Label