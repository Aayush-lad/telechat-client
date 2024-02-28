import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { BiArrowBack, BiSearchAlt2 } from 'react-icons/bi'
import { useStateProvider } from '../context/StateContext'
import { reducerCases } from '../context/Cases'
import ChatItem from './ChatItem'
import { GET_ALL_CONTACTS } from '../utils/AuthRoutes'



const ContactsList = () => {

    const [contacts,setContacts] = useState([])

    const [{},dispatch] = useStateProvider();



    useEffect(()=>{

        const getContacts=async()=>{

            try{
            const {data:{users}} = await axios.get(`${GET_ALL_CONTACTS}`)
            setContacts(users)
            console.log(users)
            }
            catch(e){
                console.log(e)
            }
        }
        getContacts()
    },[])
  return (
    <div className='h-full flex flex-col'>

        <div className="h-24 flex-itemspend px-3 py-4 text-white  bg-blue-800">
            <div className="flex items-center justify-between ">
                <BiArrowBack className='cursor-pointer text-xl' color="white" onClick={()=>dispatch({type:reducerCases.SET_CONTACTS_PAGE})}/>
                <span className="text-xl font-bold">Contacts</span>

            </div>
            {/* <div className="flex items-center  px-4 py-2 bg-white rounded-lg mt-3">
                <div className="flex items-center w-full text-black">
                    <BiSearchAlt2 className="text-2xl"/>
                    <input type="text" placeholder="Search" className="outline-none border-none ml-2 w-full"/>
                </div>
            </div>     */}
        </div>

        <div className="h-full overflow-auto custom-scrollbar">
            <div className="flex flex-col gap-2 p-4 text-white">
                {
                Object.entries(contacts).map(([initialLetter,usersList])=>{
                    return(

                        <div key={Date.now()+initialLetter} className="flex flex-col gap-2">

                            <span className="text-lg font-bold text-white">{initialLetter}</span>

                            {
                                usersList.map(user=>{

                                    return(

                                            <ChatItem data ={user} isContactPage={true} />                                        

                                    )
                                })
                            }

                        </div>
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default ContactsList