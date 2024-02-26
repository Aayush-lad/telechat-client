import React ,{useEffect,useState}from 'react'

import ChatListHeader from './ChatListHeader'
import SearchChat from './SearchChat'
import ChatListItem from './ChatListItem'
import { useStateProvider } from '../context/StateContext'
import ContactsList from './ContactsList'

const ChatList = () => {

  const [{contactPage}] = useStateProvider()
  const [pageType,setPageType] = useState("default")

  useEffect(()=>{
    if(contactPage){
      setPageType("contact")
    }
    else{
      setPageType("default")
    }
  },[contactPage])


  return (
    <div  className="bg-blue-700 flex flex-col max-h-screen z-30 h-screen ">

      {pageType==="default" &&(

        <>
          <ChatListHeader/>
          <SearchChat/>
          <ChatListItem/> 
       </> 
      )}

      {pageType==="contact" &&(
        

      <>

      <ContactsList/>

      </> 
      )}


      
    </div>
  )
}

export default ChatList