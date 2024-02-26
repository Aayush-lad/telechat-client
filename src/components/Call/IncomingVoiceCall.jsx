import React, { useState } from 'react'
import { useStateProvider } from '../../context/StateContext'
import Image from 'next/image'
import { reducerCases } from '../../context/Cases'

const IncomingVoiceCall = () => {
  

  const [{incomingVoiceCall,socket,voiceCall},dispatch] = useStateProvider()


  const acceptCall = ()=>{

    dispatch({
      type:reducerCases.SET_VOICE_CALL,
      voiceCall:{
        ...incomingVoiceCall,
        type:"in-coming",
      }
    })



    dispatch({
      type:reducerCases.SET_INCOMING_VOICE_CALL,
      incomingVoiceCall:undefined
    })

    socket.current.emit("accept-incoming-call",{
      id:incomingVoiceCall.id,
    })

    
    };

  const rejectCall = ()=>{


    socket.current.emit("reject-voice-call",{
      from:incomingVoiceCall.id,
    })

    dispatch({
      type:reducerCases.END_CALL
    })
  }


  return (
    <div className='flex '>

      <Image src = "/incomingcall.gif" alt="avatar" height={50} width={50} className='rounded-full'/>
    <div>
      <Image src={incomingVoiceCall.image} alt="avatar" height={50} width={50} className='rounded-full'/>
    </div>

    <div className="flex justify-center items-center ml-2 text-blue-800  font-bold">
      <h1>{incomingVoiceCall.name} is calling you...</h1>
    </div>

    <div className='flex justify-center items-center gap-2'>
      <button className ="bg-green-600 p-2 " onClick={acceptCall}>Accept</button>
      <button className="bg-red-600 p-2"onClick={rejectCall}>Reject</button>
    </div>
    </div>
  )
}

export default IncomingVoiceCall