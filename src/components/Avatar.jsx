import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {FaCamera} from "react-icons/fa"
import ContextMenu from './ContextMenu';
import PhotoPicker from './PhotoPicker';
import PhotoLibrary from './PhotoLibrary';
import CapturePhoto from './CapturePhoto';

const Avatar = ({type,image,setImage}) => {

    const [hover,setHover] = useState(false);
    const [iscontextMenuVisible,setContextMenuVisible] = useState(false)
    const [coordinates,setContextMenuCoordinates] =  useState({x:0,y:0})
    const [grabPhoto, setGrabPhoto] = useState(false)
    const [photoLibrary,showPhotoLibrary] = useState(false);
    const [capturePhoto , showCapturePhoto] = useState(false)

    //const [{userInfo},dispatch]= useStateProvider();


    console.log(image);
    let height = 200;
    let width = 200;

    if(type =="sm"){
      height = 40;
       width = 40;
    }
    else if(type=="lg"){
       height = 200;
       width = 200;
    }
    else if(type=="xl"){
      height = 200;
       width = 200;
    
    }

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


    const photopickerchange=async(e)=>{

      const file = e.target.files[0]
      const reader = new FileReader()
      const data =  document.createElement("img")

      reader.onload=function(e){
        data.src = e.target.result
        data.setAttribute("data-src",e.target.result)

      }

      reader.readAsDataURL(file)
      setTimeout(()=>{
        setImage(data.src)
      },100)

    }


  
    const options =[
      
        // {name:'Take a photo',callback:()=>{
        //   showCapturePhoto(true)
        // }},
        {name:'Choose from library', callback:()=>{

          showPhotoLibrary(true)

        }},
        {name:'Remove image',callback:()=>setImage("/avatar.png")},
        
    ]


    const showContextMenu = (e) => {
      e.preventDefault()
      setContextMenuCoordinates({
          x:e.clientX,
          y:e.clientY
      })
      setContextMenuVisible(true)
      console.log(coordinates)
      
      
  }

  const hidePhotoLibrary=()=>{
    showPhotoLibrary(false);
  }

  const hide =()=>{
    showCapturePhoto(false)
  }

  return (
    <>
    <div className='relative  text-md  text-black text-start mb-10 cursor-pointer '
         onMouseEnter={()=>setHover(true)}
         onMouseLeave={()=>setHover(false)}
         id="context-opener"
    >

        <div className={`absolute top-[70px] left-[80px] ${hover? "visible" :"hidden"} text-center justify-center items-center z-50`} onClick={(e)=>showContextMenu(e)} id="context-opener">
            <FaCamera className="text-2xl ml-2 " id="context-opener " />
            <span className='text-sm ' id="context-opener">Change<br/> profile<br/> image</span>
        </div> 

        <div className='hover:blur-sm rounded-full' onClick={(e)=> showContextMenu(e)}>
        <Image src={image} alt="avatar" height={height} width={width} className='rounded-full' id="context-opener"/> 
        </div>


    
    </div>
    {
      iscontextMenuVisible && (<ContextMenu

      options={options}
      coordinates={coordinates}
      contextMenu={iscontextMenuVisible}
      setContextMenu={setContextMenuVisible}
          
      />
      )}

      {grabPhoto && <PhotoPicker onChange={photopickerchange}/>}
      {photoLibrary && <PhotoLibrary setImage={setImage} hidePhotoLibrary={hidePhotoLibrary}/>}
      {capturePhoto &&  <CapturePhoto setImage={setImage} hide={hide} />}

   </>
  )
}

export default Avatar