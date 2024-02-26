
import Image from "next/image";
import {GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {firebaseAuth} from "../configs/FirebaseConfig"
import { CHECK_USER_ROUTE } from "../utils/AuthRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/Cases";
import { useEffect } from "react";

const featuresList = [
    {name : "Real time messaging",icon:"/chat.png"},
    // {name : "Group messaging",icon:"/group.png"},
    {name : "Share images and videos",icon:"/image.png"},
    {name : "Voice calling ",icon:"/voice.png"},
    {name:"Video Calling",icon:"/video.png"},
]





function login(){
   
  const [{userInfo,newUser,userLoggedOut},dispatch] = useStateProvider();
  const useremail = userInfo?.email;

  useEffect(()=>{

    console.log(userInfo)
    if(userInfo && userInfo?.id ){
      router.push("/");
      
    }
  
},[userInfo]);


  const router = useRouter();
   const handleLogin=async()=>{

  
    const provider = new GoogleAuthProvider();
    const {user:{displayName,name,email,photoURL} }=await signInWithPopup(firebaseAuth,provider)

    try{

      if(email){

        const {data} = await axios.post(CHECK_USER_ROUTE,{email});
        console.log(data.status)
        if(!data.status){

          dispatch({type:reducerCases.SET_NEW_USER,newUser:true})
           dispatch({
            type:reducerCases.SET_USER_INFO,userInfo:{name,email,photoURL,status:""}
          })
          console.log("onboarding")
          dispatch({type:reducerCases.SET_USER_LOGGED_OUT,userLoggedOut:false})
          router.push("/onboarding")
        }
        else{
          const {id,name,image,email,status} = data.data;

          console.log(data)
          dispatch({
            type:reducerCases.SET_USER_INFO,userInfo:{
              id,
              name,
              email,
              image,
              status
            }
          })

        

         
          router.push("/")
        }
      }
      
    }
    catch(err){
      console.log(err);
    }


}
    return (
      <div className="h-screen w-screen bg-white text-white md:flex ">
        <div className="hidden md:flex w-1/3 bg-blue-700   h-screen bg-1 bg-cover">
        <div className="flex flex-col items-center">
    </div>

    </div>

        <div className="md:h-screen md:w-2/3 flex flex-col justify-center items-center">
          {/* Logo */}

          <Image src="/logo.png" alt="logo" width={300} height={300} />

          {/* get started now */}

          <div className="flex flex-col justify-center items-center gap-4 text-blue-600 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Unleash Your Potential
            </h1>
            <h3 className="text-lg leading-6 ">
              Embark on a journey to connect, collaborate, and create in
              real-time.
            </h3>
            <div className="flex flex-col justify-center items-center gap-4 mt-6">
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              {featuresList.map((feature) => (
                <div className="flex flex-col items-center gap-2">
                  <Image src={feature.icon} alt={feature.name} width={50} height={50} />
                  <p className="text-black">{feature.name}</p>
                </div>
              ))}
            </div>
            </div>
            
          </div>
          {/* Google sign in button */}
          <div className="flex flex-col justify-center items-center gap-4 mt-6">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded shadow-lg" onClick={handleLogin}>
              <div className="flex items-center justify-center">
                <Image src="/google.png" alt="google" width={30} height={30} />
                <p className="ml-2">Sign in with Google</p>
              </div>
            </button>
          </div>

          {/* Features */}
          
        </div>
      </div>    
    );
}
export default login;