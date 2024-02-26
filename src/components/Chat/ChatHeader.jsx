import Image from 'next/image'
import React from 'react'
import {MdCall} from 'react-icons/md'
import { IoVideocam } from 'react-icons/io5'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useStateProvider } from '../../context/StateContext'
import { reducerCases } from '@/src/context/Cases'
import { FaArrowLeft } from 'react-icons/fa'


const ChatHeader = () => {


  const [{currentChatUser,socket,userInfo,onlineUsers},dispatch] = useStateProvider()

  const handleVoiceCall = ()=>{
    dispatch({
      type:reducerCases.SET_VOICE_CALL,
      voiceCall:{
        ...currentChatUser,
        type:"out-going",
        callType:"voice",
        roomId:Date.now()
      }
    })

    socket.current.emit("outgoing-voice-call",{
      to:currentChatUser.socketId,
      from:userInfo.id,
      callType:"voice",
      roomId:Date.now()
    })

    
  }


  const handleVideoCall = ()=>{
    dispatch({
      type:reducerCases.SET_VIDEO_CALL,
      videoCall:{
        ...currentChatUser,
        type:"out-going",
        callType:"video",
        roomId:Date.now()
      }
    })

    socket.current.emit("outgoing-video-call",{
      to:currentChatUser.socketId,
      from:userInfo.id,
      callType:"video",
      roomId:Date.now()
    })
  }

  console.log(currentChatUser)

  const handleBack = ()=>{
    dispatch({
      type:reducerCases.SET_CURRENT_CHAT_USER,
      user:null
    })
  }


  return (
    <div className='h-16 px-4 py-3 flex items-center justify-between bg-blue-800  z-20'>
      <div className="flex items-center justify-center gap-2">

        <FaArrowLeft color='white' className="lg:hidden" onClick={handleBack}/>

        
        <Image src={currentChatUser?.image} alt="avatar" width={40} height={40} className="rounded-full" />

        <div className='flex flex-col'>
          <p className='text-white text-sm font-bold'>{currentChatUser?.name}</p>
          <p className='text-white text-xs'>{
            onlineUsers?.includes(currentChatUser?.id) ? "Online" : "Offline"
          
          }</p>
        </div>

    


      </div>
      <div className='flex gap-6'>

          <MdCall className='text-white text-2xl' onClick={handleVoiceCall}/>
          <IoVideocam className='text-white text-2xl' onClick={handleVideoCall}/>
          
    </div>
    </div>

  )
}

export default ChatHeader