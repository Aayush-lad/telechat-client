import React, { useRef } from 'react'
import ChatList from './ChatList'
import Void from './Void'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../configs/FirebaseConfig'
import { useRouter } from 'next/router'
import { useStateProvider } from '../context/StateContext'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { CHECK_USER_ROUTE,GET_MESSAGES_ROUTE } from '../utils/AuthRoutes'
import { reducerCases } from '../context/Cases'
import Chat from './Chat/Chat'
import {io} from 'socket.io-client'
import VideoCall from './Call/VideoCall'
import VoiceCall from './Call/VoiceCall'
import IncomingVoiceCall from './Call/IncomingVoiceCall'
import IncomingVideoCall from './Call/IncomingVideoCall'
import Skeleton from 'react-loading-skeleton';

const Main = () => {

  const HOST ="https://telechat-server-3l6y.onrender.com"
  const router = useRouter();
  const [{userInfo,currentChatUser,searchMessage,videoCall,voiceCall,incomingVoiceCall,incomingVideoCall,userLoggedOut},dispatch] = useStateProvider()
  const [socketEvent, setSocketEvent] = useState(false);

  
  const [redirectLogin ,setRedirectLogin] = useState(false)
  const [prevmsgid ,setPrevMsgId] = useState(null)


  useEffect(()=>{
    if(redirectLogin){

      dispatch({type:reducerCases.SET_USER_LOGGED_OUT,userLoggedOut:false})
      router.push("/login")
    
    }
  
  },[redirectLogin])
  
  useEffect(()=>{
  onAuthStateChanged(firebaseAuth,async(currentuser)=>{    
    if(!currentuser) return setRedirectLogin(true)
    if(!currentuser) setRedirectLogin(true)
    if(!userInfo && currentuser?.email){
      const {data} = await axios.post(CHECK_USER_ROUTE,{email:currentuser.email})

      if(!data.status){
        
        router.push("/login")
       
      }

      try{

        if(!data){
  

          setRedirectLogin(true)

          
        }

        console.log(data);

      const {id,name,image,email,status} = data.data;
      await dispatch({
        type:reducerCases.SET_USER_INFO,userInfo:{
          id,
          name,
          email,
          image,
          status
        }
      })


    }
    catch(e){
      console.log(e)

    }}
  })
},[userInfo])




const socket = useRef(null);
useEffect(()=>{
  console.log(userInfo)

  if(userInfo?.id){

    socket.current = io(HOST)
    socket.current.emit("add-user", userInfo.id)

    dispatch({
      type:reducerCases.SET_SOCKET,
      socket
    })
  }
},[userInfo])

useEffect(()=>{

  if(socket.current && !socketEvent){
    socket.current.on("msg-recieve",(data)=>{
      

      

      
      dispatch({
        type:reducerCases.ADD_MESSAGE,
        newMessage:{
          ...data.message,
        }
      })
   
    
    

    })

    socket.current.on("incoming-voice-call",({from,roomId,callType})=>{
      dispatch({
        type:reducerCases.SET_INCOMING_VOICE_CALL,
        incomingVoiceCall:{...from ,roomId,callType}
      })
    })

    socket.current.on("incoming-video-call",({from,roomId,callType})=>{
      console.log(from,roomId,callType);
      dispatch({
        type:reducerCases.SET_INCOMING_VIDEO_CALL,
        incomingVideoCall:{...from ,roomId,callType}
      })
    })

    socket.current.on("voice-call-rejected",()=>{
      dispatch({
        type:reducerCases.END_CALL,
      })
    })

    socket.current.on("video-call-rejected",()=>{
      dispatch({
        type:reducerCases.END_CALL,
      })
    })


    socket.current.on("online-users",(onlineUsers)=>{
      console.log(onlineUsers)
      dispatch({
        type:reducerCases.SET_ONLINE_USERS,
        onlineUsers
      })
    })


    setSocketEvent(true)
  }
}
,[socket.current])






useEffect(()=>{

  const getMessages =  async()=>{

    console.log(userInfo?.id,currentChatUser?.id);

    const url =`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`

    if(currentChatUser){
    const {data:{messages}} = await axios.get(url)
    
    await dispatch({
      type:reducerCases.SET_MESSAGES,
      messages
    })

  }
}


  getMessages()

},[currentChatUser])





  return (

    <>
    {!userInfo  ? (
      // Loading Animation
      <div className="flex h-screen justify-center items-center">
        <Skeleton count={5} height={40} />
      </div>
    ) : (
      // Actual content when userInfo is defined
      <>
        {incomingVoiceCall && (
          <div className="top-0 left-0 w-screen bg-[#b9bbf8] shadow-lg z-50 flex items-center justify-center overflow-hidden h-12">
            <IncomingVoiceCall/>
          </div>
        )}

        {incomingVideoCall && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50 flex items-center justify-center overflow-hidden">
            <IncomingVideoCall />
          </div>
        )}

        {videoCall && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50 flex items-center justify-center overflow-hidden">
            <VideoCall/>
          </div>
        )}

        {voiceCall && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50 flex items-center justify-center overflow-hidden">
            <VoiceCall/>
          </div>
        )}

        <div className="hidden md:flex h-screen w-screen max-h-screen max-w-full">
          <div className='w-[300px]'>
            <ChatList />
          </div>
          <div className='h-screen flex-grow'>
            {currentChatUser ? <Chat/> : <Void/>}        
          </div>
        </div>

        <div className="h-screen w-screen max-h-screen max-w-full md:hidden "> 
          {currentChatUser ? <Chat/> :<ChatList />}        
        </div>
      </>
    )}
  </> 


  )
}

export default Main;

