import React from 'react'
import Avatar from './Avatar'

import { useStateProvider } from '../context/StateContext'

import {BsFillChatLeftTextFill,BsThreeDotsVertical} from "react-icons/bs"
import Image from 'next/image';
import { reducerCases } from '../context/Cases';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../configs/FirebaseConfig';
import { useRouter } from 'next/router';
const ChatListHeader = () => {

    const [{userInfo,newUser,socket},dispatch] = useStateProvider();

    const router = useRouter();
    const showContacts = ()=>{
        dispatch({
            type:'SET_CONTACTS_PAGE'
        })
    }


    const handleLogout = async()=>{
        socket.current.emit("logout",userInfo.id)
        await signOut(firebaseAuth); 
        await dispatch({ type:reducerCases.SET_USER_INFO,userInfo: undefined});
        router.push('/login');
    }









    const img = userInfo?.photoURL || userInfo?.image

    console.log(userInfo)



    return (
    <div className='h-16 px-4 py-3 flex justify-between items-center bg-blue-800 mb-3 '>
        <div className='flex items-center mr-2 justify-start '>
            <Image src={img} height={50} width={50} alt="avatar" className="rounded-full mt-2 cursor-pointer "/>
            
        </div>

        <div className='flex  items-center justify-center '>
        <div className='flex  bg-blue-900 p-3 justify-center items-center mr-3 rounded-lg  hover:bg-blue-500 cursor-pointer' onClick={showContacts}>
            <span className='text-white mr-1'> New Chat</span>
            <BsFillChatLeftTextFill className="cursor-pointer" title="New Chat" color='white' />
        </div>
        
        {/* Logout */}

        <div className='flex p-3 bg-blue-900 rounded-lg text-white cursor-pointer hover:bg-blue-500' onClick={handleLogout}>
            Logout
        </div>
        </div>

    </div>
  )
}

export default ChatListHeader