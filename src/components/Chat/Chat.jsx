import React from 'react'
import ChatHeader from './ChatHeader'
import ChatContainer from './ChatContainer'
import MessageBar from './MessageBar'

const Chat = () => {
  return (
    <>
  
    <div className=' hidden md:flex flex-col h-[100vh]  z-20  border-1 border-black '>
        <ChatHeader/>
        <ChatContainer/>
        <MessageBar/>
    </div>

    <div className='flex flex-col h-[100vh] w-[100vw]  z-20  border-1 border-black  md:hidden '>
        <ChatHeader/>
        <ChatContainer/>
        <MessageBar/>
    </div>

    

    </>
    


  )
}

export default Chat