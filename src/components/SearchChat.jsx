import React,{useState,useEffect} from 'react'
import {BiSearchAlt2} from "react-icons/bi"
import {BsFilter} from "react-icons/bs"
import { useStateProvider } from '../context/StateContext'
import { reducerCases } from '../context/Cases'
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { AiTwotoneAudio } from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";
import axios from 'axios'
import { SEARCH_MESSAGES_ROUTE } from '../utils/AuthRoutes'

const SearchChat = () => {

  
  const [{search,currentChatUser,userInfo,isSearch}, dispatch] = useStateProvider()

  const [searchValue, setSearchValue] = useState("")
  const [filter,showFilter] = useState(false)
  const [photoFilter,setPhotoFilter] = useState(false)
  const [audioFilter,setAudioFilter] = useState(false)
  const [messageFilter,setMessageFilter] = useState(false)

  useEffect(() => {
    const handleSearch = async () => {

      console.log("searching...")
     
      let current;
      if (!currentChatUser) {
        current = false;
      } else {
        current = currentChatUser;
      }
  
      if (searchValue.length > 0 || photoFilter || audioFilter ) {
        try {
          const res = await axios.get(`${SEARCH_MESSAGES_ROUTE}/${userInfo?.id ? userInfo.id : "none"}/${currentChatUser?.id ? currentChatUser.id : "none"}/${searchValue?searchValue:"null" }/${photoFilter}/${audioFilter}/${messageFilter}`);        
          dispatch({ type: reducerCases.SET_SEARCH, data: res.data.responseMessages });
          dispatch({type:reducerCases.SET_IS_SEARCH,isSearch:true})
          
          console.log("searched"+res.data.responseMessages );
          console.log(isSearch);          
          
          
        } catch (error) {
          console.error("Error fetching search messages:", error);
          dispatch({ type: reducerCases.SET_SEARCH, data: [] });
        }
      } else {
        dispatch({ type: reducerCases.SET_SEARCH, data: [] });
        dispatch({type:reducerCases.SET_IS_SEARCH,isSearch:false})
        console.log("empty" + isSearch)
      }
    };
  
    handleSearch();
  
    return () => {
      console.log("cleaning up");
      dispatch({ type: reducerCases.SET_SEARCH, data:[]});
      dispatch({ type:reducerCases.SET_IS_SEARCH,isSearch:false})
      console.log(isSearch)
    };
  
  }, [searchValue, photoFilter, audioFilter, messageFilter]);
  
  return (

    <>   

    <div className="items-center  px-4 py-2 bg-white rounded-lg">

        <div className="flex items-center justify-center">
        <div className="flex items-center w-full">
            <BiSearchAlt2 className="text-2xl"/>
            <input type="text" placeholder="Search" className="outline-none border-none ml-2 w-full" value={searchValue}  onChange={(e)=>setSearchValue(e.target.value)}  />
        </div>
        <div>
            <BsFilter className="text-2xl" onClick={()=>showFilter(!filter)}/>
        </div>
    </div>

        <div>

        {filter && <div className="bg-white p-4 rounded-lg shadow-lg flex gap-4 flex-wrap  items-center justify-center">
            <div  className={`cursor-pointer ${messageFilter? "bg-blue-500 text-white": ""} flex items-center gap-4 shadow-lg rounded-md  w-fit p-2`} onClick={()=>setMessageFilter(!messageFilter)}>
                {/* logo and text */}

                <IoChatbubblesOutline/>
                <p>Messages</p>

           
            </div>
            <div className={`cursor-pointer ${photoFilter? "bg-blue-500 text-white": ""} flex items-center gap-4 shadow-lg rounded-md  w-fit p-2`} onClick={()=>setPhotoFilter(!photoFilter)}>
              
                <MdOutlinePhotoLibrary/>
                <p>Photos</p>


            </div>
            <div  className={`cursor-pointer ${audioFilter? "bg-blue-500 text-white": ""} flex items-center gap-4 shadow-lg rounded-md  w-fit p-2`} onClick={()=>setAudioFilter(!audioFilter)}>
              <AiTwotoneAudio/>
                <p>Audio</p>
            </div>
            
            </div>

        }
        </div>
        </div>
    
        </>
    

  )
}

export default SearchChat