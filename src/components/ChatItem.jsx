import React, { useState ,useEffect} from 'react'
import Image from 'next/image'
import { useStateProvider } from '../context/StateContext'
import { reducerCases } from '../context/Cases'
import { FaCamera, FaMicrophone } from 'react-icons/fa'
import axios from 'axios'
import { GET_USER_DETAILS } from '../utils/AuthRoutes'
import {FadeLoader} from "react-spinners"

const ChatItem = ({data,isContactPage=false}) => {

    const [{userInfo,currentChatUser,search,isSearch},dispatch]=useStateProvider();

    const [isLoading , setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 3000);
        return () => clearTimeout(timer); 
    },[isSearch,search])

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async (sid, rid) => {
            try {
                console.log("getting user", sid, rid); 
                
                const response = await axios.get(`${GET_USER_DETAILS}/${userInfo.id === sid ? rid : sid}`);
                console.log(response.data);
                setUser(response.data.user);
            } catch (error) {
                console.log("Error fetching user:", error);
            }
        };
        if(data.senderId || data.receiverId){
        getUser(data.senderId, data.receiverId);
        }
    }, [data.senderId, data.receiverId]);


    

  
    






    function extractTimeFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
    
        // Format the time as per your requirement, for example:
        const formattedTime = `${hours}:${minutes}:${seconds}`;
    
        return formattedTime;
    }



    

       
    const handleContactClick =async ()=>{

        if(!isContactPage ){

            await dispatch({
                type:reducerCases.SET_CURRENT_CHAT_USER,
                user:{...data}
            })

        }
      

        else{

        await dispatch({
            type:reducerCases.SET_CURRENT_CHAT_USER,
            user:{...data}
        })

        await dispatch ({
            type:reducerCases.SET_CONTACTS_PAGE,
            contactPage:false
        })
    }
}

 const handleSearchClick =async()=>{
    await dispatch({
        type:reducerCases.SET_CURRENT_CHAT_USER,
        user:{...user}
    })

    await dispatch({
        type:reducerCases.SET_IS_SEARCH,
        isSearch:false
    })

    await dispatch({
        type:reducerCases.SET_SEARCH,
        search:[]
    })
}

  return (

  <>
  <div className='flex items-center justify-center'>

    { isLoading && 
    <FadeLoader color="#3498db" loading={isLoading} size={50} className='flex items-center justify-center' /> 
    }
    </div>

    { !isLoading &&
    <>
  

    
    <div className='flex cursor-pointer items-center text-white hover:bg-blue-800' onClick={handleContactClick}>

        {!isSearch &&(
            <>
        <div className="min-w-fit mr-1 pt-3 pb-1">
            <Image src={data.image} height={50} width={50} alt="avatar" className="rounded-full"/>
        </div>
        <div className="flex flex-col min-h-fulll justify-center mt-3 pr-2 w-full border-b-2 border-blue-600 ">
            <div className='flex justify-between'>
            <span className="text-lg font-bold">{data.name}</span>
            </div>

            <div className="flex justify-between ">


                {isContactPage && <span className="text-sm">{data?.about}</span>}

                {!isContactPage  && <span className="text-sm ">
                    {data.type ==="image" || data.message.startsWith("https://") &&<div className='flex gap-2'> <FaCamera/> Image</div>}
                    {data.type === "text" && !data.message.startsWith("https://")&&<div>{data.message.length >10 ?data.message.substring(0,10)+ "...": data.message}</div>}
                </span>}
            </div>
        </div>
        </>
        )}
    
    

        {!isContactPage && 

        <div className="flex flex-col ">
            <div className="flex flex-col ">
                <span className="text-sm text-white">{extractTimeFromTimestamp(data.createdAt)}</span>

            {/* number of unread messages */}

            <span className='bg-white text-black rounded-xl text-center' >{data.totalUnreadMessages>0? data.totalUnreadMessages :"" }</span>
            </div>

        </div>
        }

        
    </div>




    {
    isSearch &&  
    <div className='flex cursor-pointer items-center text-white hover:bg-blue-800' onClick={handleSearchClick}>

        {console.log(user)}
        <div className="min-w-fit mr-1 pt-3 pb-1">
        {user && user.image && (
            <Image src={user.image} height={50} width={50} alt="avatar" className="rounded-full" />
        )}
        </div>
        <div className="flex flex-col min-h-fulll justify-center mt-3 pr-2 w-full border-b-2 border-blue-600 ">
            <div className='flex justify-between'>
            <span className="text-lg font-bold">{user?.name}</span>
            </div>

            <div className="flex justify-between ">
                
                <span className="text-sm">
                    {data.type ==="audio" && <div className='flex gap-2'><FaMicrophone/> Audio</div> }
                    {data.type ==="image" &&<div className='flex gap-2'> <FaCamera/> Image</div>}
                    {data.type === "text" &&<div>{data.message.length >10 ?data.message.substring(0,10)+ "...": data.message}</div>}
                </span>
            </div>
        </div>
        
    
    </div>
     }
   


    </>   
    }
     

    </>
  )
}

export default ChatItem