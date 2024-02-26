import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { useStateProvider } from '../context/StateContext';
import Input from '../components/Input';
import Avatar from '../components/Avatar';
import axios from 'axios';
import { ONBOARD_ROUTE } from '../utils/AuthRoutes';
import { reducerCases } from "../context/Cases";
import { useRouter } from 'next/router';



function onboarding () {

  const router = useRouter();
  const [{userInfo,newUser},dispatch] = useStateProvider()

  const [name , setName ] = useState(userInfo?.name||"");
  const [about,setAbout]= useState("");
  const [image,setImage]=useState("/avatar.png")
  

  useEffect(()=>{
    if(!newUser && !userInfo?.email) router.push("/login");
    else if(!newUser && userInfo.email) router.push("/")
  },[newUser,userInfo])

  const handleCreateProfile=async()=>{

    console.log("creating profile")

    if(validateDetails()){
      const email = userInfo.email;


      try{
        const {data} =  await axios.post(ONBOARD_ROUTE,{
          name,
          email,
          about,
          image,
          
        })

        console.log(data)
        
        if(data.status){

       

          console.log(data)
           dispatch({type:reducerCases.SET_NEW_USER,newUser:false})
           dispatch({
            type:reducerCases.SET_USER_INFO,userInfo:{id:data.user.id ,name,email,photoURL:image,status:about}
          })



          console.log(userInfo)

          router.push("/")
        }

      }
      catch(e){
       
        console.log(e)
      }
    }
  }

  const validateDetails =()=>{
    
    if(name.length < 3){
      return false
    }
    return true
  }





  return (
    <div className="h-screen w-screen bg-white text-white overflow-hidden md:flex ">
      <div className="hidden md:flex w-1/3 bg-blue-700   h-screen bg-1 bg-cover">
  
      </div>

      <div className="md:h-screen md:w-2/3 flex flex-col  items-center justify-center">
        {/* Logo */}

        <Image src="/logo.png" alt="logo" width={250} height={250} />

        {/* get started now */}

        <div className="flex flex-col justify-center items-center gap-4  text-black text-center">
      
          <div className=" text-lg flex justify-center items-center  font-black ">
              Lets create your profile
        
          </div>

          {/* CREATE PROFILE FORM  */}

          <div  className=" w-full border-black  text-white flex gap-5 flex-col-reverse justify-center items-center">

            <div className='justify-center items-center'>
             <Input name="Display Name" state={name} setState={setName} label={"Display name"} />
             <Input name="About" state={about}  setState={setAbout} label={"Bio Description"} />

             {/* submit to server */}
             <button onClick={handleCreateProfile} className="flex items-center justify-center bg-blue-600 p-3 relative left-[125px] mt-3">
              Create Profile
             </button>
             </div>

             <Avatar type='lg' image={image} setImage={setImage}  />

          </div>
        </div>
     
      </div>
      


    </div>
  );
}


export default onboarding