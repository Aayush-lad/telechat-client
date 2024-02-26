import React, { useEffect, useRef } from 'react'

function ContextMenu({options,coordinates,contextMenu,setContextMenu}) {

    const contextMenuRef =  useRef(null)

    

    useEffect(() => {
        const handleClick = (e) => {
          console.log(e.target.id)

          if(e.target.id !== 'context-opener') {
            if(contextMenuRef.current && !contextMenuRef.current.contains(e.target)){
                setContextMenu(false)
            }
          }
        }
        document.addEventListener('click',handleClick)

        return () => {
            document.removeEventListener('click',handleClick)
        }
    })

    const handleClick = (e,callback) => {
        e.stopPropagation()
        setContextMenu(false)        
        callback()
    }

   

  return (
    <div className= {`bg-blue-400 fixed py-2 z-[100]`} ref={contextMenuRef}
    style={{

      top: coordinates.y,
      left: coordinates.x,
    }}
    >
      <ul className='list-none'>
        {options.map(({name,callback}) => (
            <li key={name} onClick={e=> handleClick(e,callback)} className='border-b border-blue-200'>
                <span className='block px-4 py-2 text-blue-800 hover:bg-blue-200'>{name}</span>
            </li>
        ))}

      </ul>
    </div>
  )
}

export default ContextMenu