import React,{useEffect} from 'react'
import { useStateProvider } from '../../context/StateContext'
import { HOST } from '@/src/utils/AuthRoutes'
import Image from 'next/image'



//Chat container

const ChatContainer = () => {


  const [{messages,currentChatUser,userInfo},dispatch] = useStateProvider()

  const timeExtract = (dateTimeString)=>{
      const dateTime = new Date(dateTimeString);
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const seconds = dateTime.getSeconds();
      const timeOnly = `${hours}:${minutes}:${seconds}`;
      return timeOnly;
  }

  const dateExtract = (dateTimeString)=>{
    const dateTime = new Date(dateTimeString);
    const date = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getFullYear();
    const dateOnly = `${date}/${month}/${year}`;
    return dateOnly;
  }



  const checkNewDay = (current, previous)=>{
    current = dateExtract(current);
    previous = dateExtract(previous);

    if(current !== previous){
      return false;
    }
    else{
      return true;
    }

  }

  
  return (

    
    userInfo &&(

    <div className='flex-1 overflow-y-auto bg-gray-200 custom-scrollbar' id="chat-container">
      {/* message -container */}
      <div className='flex flex-col p-4 space-y-4'>

        {/* message */}

        {messages.map((message,index)=>(

          

          <>
          <div>

            {/* check if new day */}
            {!checkNewDay(messages[index].createdAt,messages[index-1]?.createdAt) && (
              <div className='text-center text-xs text-gray-500'>
                {dateExtract(message.createdAt)}
              </div>
            )}

          </div>

          <div key={index} className={`flex flex-col space-y-2 ${message.senderId === userInfo?.id ? 'items-end' : 'items-start'}`}>

            {message.type == "text" && !message.message.startsWith("https://telechat.blob.core.windows.net/telechat/")&&(


            <div id={message.Id} className={`p-2 rounded-lg max-w-[200px] ${message.senderId === userInfo.id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
              {message.message}
            </div>
            )}

            {message.type == "image" && (
              
              <div className={`p-2 rounded-lg max-w-[400px] ${message.senderId === userInfo.id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`} id={message.Id}>
               
            {message.message.startsWith("https://telechat.blob.core.windows.net/telechat/") &&
                <Image src={ `${message.message}`} alt="image" width={500} height={500} className='w-full h-auto rounded-lg'/>
            }
              </div>
            )}

            {message.type == "audio" && (
              
             
              <div id={message.Id}>
                 {message.message.startsWith("https://telechat.blob.core.windows.net/telechat/") &&
                <audio src={`${HOST}/${message.message}`} controls className={`${message.senderId === userInfo?.id ? "audio-player":"bg-[#F1F3F4] p-3" }`}/>
                }
              </div>
            
            )}
            <div className={`text-xs ${message.senderId === userInfo.id ? 'text-right' : 'text-left'}`} id={message.Id}>
              {/* time and sender you or current user */}   

              {!message.message.startsWith("https://telechat.blob.core.windows.net/") &&
              <span>{timeExtract(message.createdAt)} </span>
            }
            </div>
          </div>
          </>
        ))}
        </div>
    </div>
  )
  )
}

export default ChatContainer