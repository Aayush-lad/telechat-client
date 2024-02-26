import React from 'react'
import {IoClose} from 'react-icons/io5'

const PhotoLibrary = ({setImage,hidePhotoLibrary}) => {

    const avatars = []
    for(let i = 1;i<=10;i++){
        avatars.push(`/avatars/${i}.avif`)
    }
  return (
    <div className='fixed bottom-[10px] right-[10px] max-h-[100vh] max-w-[100vw] h-full w-full flex justify-center items-center'>
        <div className='h-max w-max bg-gray-900 gap-6 rounded-lg p-3'>
            <div className='pt-e px-2 cursor-pointer flex items-end justify-end' onClick={hidePhotoLibrary}>
                <IoClose className='h-5 w-5' />
            </div>
            <ul className="grid grid-cols-3 gap-8">
                {avatars.map((src,index)=>(
                    <li key={index} onClick={()=>{setImage(src); hidePhotoLibrary()}} >
                        <img src={src} alt="" className='w-full h-32 object-cover rounded-md shadow-sm'/>

                    </li>
                )
                )}

            </ul>
        </div>

    </div>
  )
}

export default PhotoLibrary