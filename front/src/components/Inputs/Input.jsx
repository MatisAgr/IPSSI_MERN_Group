import React from 'react'

export default function Input({ type, value, onChange, placeholder, label }) {
    return (
        <>
            <label htmlFor='username' className='text-white text-xl text-left w-full'>
                {label}
            </label>
            <input
                type={type}
                id={type}
                name={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
        </>
    )
}