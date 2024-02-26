import React ,{useEffect}from 'react'
import dynamic from 'next/dynamic'
import { useStateProvider } from '../../context/StateContext'
const Container = dynamic(() => import('./Container'), { ssr: false })
const VideoCall = () => {

  const [{videoCall ,socket,userInfo},dispatch] = useStateProvider()

  useEffect(()=>{
    if(videoCall.type==="out-going"){

      socket.current.emit("outgoing-video-call",{
       to: videoCall.id,
       from:{
          id:userInfo.id,
          name:userInfo.name,
          image:userInfo.image
       },

       callType:videoCall.callType,
       roomId:videoCall.roomId

      })

    }
  },[videoCall])



  return (
    <Container data={videoCall}/>
  )
}

export default VideoCall