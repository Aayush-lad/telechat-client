import React, { useEffect,useState } from 'react'
import { useStateProvider } from '../context/StateContext'
import axios from 'axios';
import { GET_INITIAL_CONTACTS_ROUTE } from '../utils/AuthRoutes';
import { reducerCases } from '../context/Cases';
import {RingLoader} from 'react-spinners'

import ChatItem from './ChatItem';
import { useRouter } from 'next/router';

const ChatListItem = () => {

  const [{userInfo,userContacts,onlineUsers,isSearch,search},dispatch] = useStateProvider();
  useEffect(()=>{
    const getContacts = async()=>{
       try{ 
        const {data:{users,onlineUsers}} = await axios.get(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`) 
        dispatch( {type:reducerCases.SET_USER_CONTACTS,userContacts:users} )
        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers })
      }
      catch(err){
        console.log(err)
        
      }
    }
    getContacts();
  },[userInfo])

  return (


    <>
        

    
       
      <div className= 'flex-auto overflow-auto  custom-scrollbar '>
      {!isSearch &&
         userContacts.map((contact)=>(
            <ChatItem data={contact} isContactPage={false}/>                                  
         ))
      }
    

      

      {
        
      isSearch && (
      search.map((contact)=>(
          <ChatItem data={contact} isContactPage={true}/>                                  
        ))
        )
      }
      </div>

    

     
   

      </>
  )
}

export default ChatListItem