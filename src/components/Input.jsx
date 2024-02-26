import React from 'react'

const Input = ({name , state,setState,label=false}) => {
  return (

    <div className="flex gap-4  text-white">
    {label ?  
        <label htmlFor={name} className='text-sm text-black my-2'>{label+" :"}</label> : null
    }
    <input 
        type='text' 
        name={name} 
        value={state} 
        onChange={e => setState(e.target.value)} 
        className=' text-black shadow-md h-10 w-64 rounded-lg my-1 text-center border-black focus:outline-none focus:ring-2 focus focus:border-transparent'
        placeholder={`${name}`} 
    />
</div>

  )
  
}

export default Input