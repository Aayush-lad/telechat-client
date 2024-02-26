import React, { useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'

const CapturePhoto = ({setImage,hide}) => {
  
  const videoRef = useRef(null)

  useEffect(()=>{
    let stream;
    const startCamera= async()=>{
        stream = await  navigator.mediaDevices.getUserMedia({video:true ,audio:false});
        videoRef.current.srcObject = stream
    }

    startCamera()
    return ()=>{
        stream.getTracks().forEach(track => {
            track.stop()
            
        });
}
},[])


  const capturePhoto = ()=>{
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext('2d').drawImage(videoRef.current,0,0,300,150);
    setImage(canvas.toDataURL("images/jpeg"))
    hide()
  }
    return (
    <div className='absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center'>
        <div className='flex flex-col gap-4 w-full'>
            <div  className='pt-2 pr-2 cursor-pointer flex items-end justify-end'
            onClick={hide}
            >
                <IoClose className='h-5 w-5 cursor-pointer absolute top-0'/>
            </div>

            <div className="flex justify-center items-center">
                <video id="video" width="400"  ref={videoRef} autoPlay></video>
                <button className='h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 absolute bottom-0' onClick={capturePhoto}>

                </button>
            </div>

        </div>
    </div>
  )
}

export default CapturePhoto