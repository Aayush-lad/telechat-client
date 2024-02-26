import { useStateProvider } from '@/src/context/StateContext'
import Image from 'next/image'
import React from 'react'

import { reducerCases } from '@/src/context/Cases';

const IncomingVideoCall = () => {

  const [{incomingVideoCall,socket},dispatch] = useStateProvider();

  const acceptCall = ()=>{

    dispatch({
      type:reducerCases.SET_VIDEO_CALL,
      videoCall:{
        ...incomingVideoCall,
        type:"in-coming",
      }
    })

    dispatch({
      type:reducerCases.SET_INCOMING_VIDEO_CALL,
      incomingVideoCall:undefined
    })

    socket.current.emit("accept-incoming-call",{
      id:incomingVideoCall.id,
    })


    



  }

  const rejectCall = ()=>{
    dispatch({
      type:reducerCases.END_CALL
    })

    socket.current.emit("reject-video-call",{
      from:incomingVideoCall.id,

    }
      
      )


  }



  return (

    <div className='flex flex-col'>


      
    <div className="text-white text-3xl mb-4">
      <h1>{incomingVideoCall.name} is calling you !!</h1>
    </div>
    <div>
      {console.log(incomingVideoCall)}
      <Image src={incomingVideoCall.image} alt="avatar" height={300} width={300} className='rounded-full'/>
    </div>


    <div className='flex items-center justify-center my-6'>
      <button className ="bg-green-600 p-2 mr-2" onClick={acceptCall}>Accept</button>
      <button className="bg-red-600 p-2"onClick={rejectCall}>Reject</button>
    </div>
    </div>


  )
}

export default IncomingVideoCall