"use client"
import React,{useEffect} from 'react'
import dynamic from 'next/dynamic'
const Container = dynamic(() => import('./Container'), { ssr: false })
import { useStateProvider } from '../../context/StateContext'

const VoiceCall = () => {
  const [{voiceCall ,socket,userInfo,rtcClient},dispatch] = useStateProvider()


  useEffect(() => {
    if (voiceCall.type === "out-going") {
      socket.current.emit("outgoing-voice-call", {
        to: voiceCall.id,
        from: {
          id: userInfo.id,
          name: userInfo.name,
          image: userInfo.image
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId
      });
  
     
    }
  }, [voiceCall]);
  

  return (
    
   <Container data ={voiceCall}/>
  )
}

export default VoiceCall