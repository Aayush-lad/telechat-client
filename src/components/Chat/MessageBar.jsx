import React,{useEffect,useRef, useState} from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { ImAttachment } from 'react-icons/im'
import { MdSend } from 'react-icons/md'
import { useStateProvider } from '../../context/StateContext'
import axios from 'axios'
import { ADD_MESSAGE_ROUTE,ADD_IMAGE_MESSAGE_ROUTE } from '@/src/utils/AuthRoutes'
import {reducerCases} from "../../context/Cases"
import PhotoPicker from '../PhotoPicker'
import { FaMicrophone } from 'react-icons/fa'


import EmojiPicker from 'emoji-picker-react'
// Message Bar
const MessageBar = () => {


  const [{userInfo,currentChatUser,socket},dispatch]=useStateProvider();

  const [message,setMessage]=useState('') 
  const [emojiPicker,showEmojiPicker] = useState(false)
  const [grabPhoto, setGrabPhoto] = useState(false)
  

  const emojiRef = useRef(null)

  const handleEmojiModal = ()=>{

  
    showEmojiPicker(!emojiPicker)


  }

  useEffect(()=>{

    const handleClick = (e)=>{
      if(e.target.id!== 'emoji-opener'){
        showEmojiPicker(false)
      }
    }

    document.addEventListener('click',handleClick)

    return ()=>document.removeEventListener('click',handleClick)
  },[])

  useEffect(()=>{
    if(grabPhoto){
      const data = document.getElementById('photo-picker')

      data.click()
      document.body.onfocus=(e)=>{

        setTimeout(()=>
        setGrabPhoto(false),1000)
      }
    }
  },[grabPhoto])

  const handleEmoji = (emoji)=>{

    setMessage((prevMessage)=>prevMessage+emoji.emoji)
  }

  const photopickerchange=async(e)=>{
try{
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('image',file)

  const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE,formData,{
    headers:{
      'Content-Type':'multipart/form-data'
    },
    params:{
      from:userInfo?.id,
      to:currentChatUser?.id
    }

  })

  if(response.status ===201){

    socket.current.emit("send-msg",{
      
      to:currentChatUser?.id,
      from:userInfo?.id,
      message:response.data.message
      })

     console.log(response.data.message)

    dispatch({
      type:reducerCases.ADD_MESSAGE,
      newMessage:{
        ...response.data.message
      },
      fromSelf:true
    })
  }
}
catch{

}
    

  }


  const sendMessage =async () => {

    try{

   

      const {data} = await axios.post(ADD_MESSAGE_ROUTE,{

         to : currentChatUser?.id,
         from: userInfo?.id,
         message
       })

       console.log(data)

       socket.current.emit('send-msg',{
        to:currentChatUser?.id,
        from:userInfo?.id,
        message:data.message
      })
     

      dispatch({
        type:reducerCases.ADD_MESSAGE,
        newMessage:{
          ...data.message
        },
        fromSelf:true
      })

      setMessage('')

    }
    catch(err){
      console.log(err)
    }


  }

  return (
    <div className='h-20 px-4 flex items-center gap-6 bg-blue-600 relative'>

      
      
        <>
        <div  className="flex gap-6">
            <BsEmojiSmile className='text-white text-2xl cursor-pointer' title="emoji"
            id = "emoji-opener"
            onClick={handleEmojiModal}
            />

            {emojiPicker && 
            <div className="absolute bottom-24 left-13 z-40 cursor-pointer" id ="emoji-opener" >

                <EmojiPicker onEmojiClick = {handleEmoji} ref={emojiRef} height={400} width={250}/>


            </div>
            
            } 
            <ImAttachment className='text-white text-2xl cursor-pointer' title="attach file" onClick={()=> setGrabPhoto(true)}/>
        </div>

        <div className='w-full rounded-lg h-10 flex items-center'>
            <input type="text" placeholder="Type a message" className="w-full h- px-4 py-2 rounded-lg bg-blue-800 text-white"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            />
        </div>

        <div className="flex w-10 items-center justify-center">

         
          <button>
            <MdSend className='text-white text-2xl' title="send message" onClick={sendMessage}/>
            </button>
        
        </div>

        </>
      
        {grabPhoto && <PhotoPicker onChange={photopickerchange}/>}
 
        

    </div>
  )
}


export default MessageBar