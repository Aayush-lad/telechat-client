import React, { useEffect } from 'react'
import { useStateProvider } from '@/src/context/StateContext'
import {useState} from 'react'
import Image from 'next/image'
import { MdOutlineCallEnd } from 'react-icons/md'
import { reducerCases } from '@/src/context/Cases'
import { FaMicrophone } from 'react-icons/fa'
import { BiCamera } from 'react-icons/bi'



const Container = ({data}) => {
    const [{socket,userInfo,rtcClient,currentChatUser},dispatch] = useStateProvider();
    const [callAccepted,setCallAccepted] = useState(false);
    const [callRejected,setCallRejected] = useState(false);
    const [isMutedAudio , setIsMutedAudio] = useState(false);
    const [isMutedVideo , setIsMutedVideo] = useState(false);


    const leave = async()=>{
        if(data.callType == "voice"){
            await channelParameters?.localAudioTrack?.stop();
            await channelParameters?.localAudioTrack?.close();
            await agoraEngine?.leave();
        }

        if(data.callType === "video"){
            await channelParameters?.localVideoTrack?.stop();
            await channelParameters?.localAudioTrack?.stop();
            await channelParameters?.localAudioTrack?.close();
            await channelParameters?.localVideoTrack?.close();
            await agoraEngine?.leave();
            
        }

        dispatch({type:reducerCases.END_CALL});
}


    




    useEffect(()=>{

        if(data.type==="out-going"){
        socket.current.on("call-accepted",()=>{
            setCallAccepted(true);
        }
        )
        }
        else{
            setTimeout(()=>{
                setCallAccepted(true);
            },1000)
        }


        // handling rejected calls

        socket.current.on("video-call-rejected",()=>{
            console.log(" VIDEO call rejected");
            setCallRejected(true);
            leave()
        })

        socket.current.on("voice-call-rejected",()=>{
            console.log("VOICE call rejected");
            setCallRejected(true);
            leave()
        })


    })

    useEffect(()=>{

        console.log(callAccepted);
        const startCall = async()=>{

            const appid = "35cd809153b54d6bab736c6a2e957b6c"
            const roomId = Number.toString(data.roomId);
        
            global.channelParameters ={
                localAudioTrack : null,
                remoteAudioTrack:null,
                remoteUid:null,
                localVideoTrack:null,
                remoteVideoTrack:null,
            }
        
            const {default:AgoraClient} = await import("agora-rtc-sdk-ng");
        
            global.agoraEngine = AgoraClient.createClient({mode:"rtc",codec:"h264"});



            
     
            if( data.callType ==="voice"){
                agoraEngine.on("user-published",async(user,mediaType)=>{
                    await agoraEngine.subscribe(user,mediaType);
                    if(mediaType ==="audio"){
                        const remoteAudioTrack = user.audioTrack;
                        channelParameters.remoteAudioTrack = remoteAudioTrack;
                        remoteAudioTrack.play();
                    }
                })


                await agoraEngine.join(appid,roomId,null,null);

                channelParameters.localAudioTrack = await AgoraClient.createMicrophoneAudioTrack();
                await agoraEngine.publish([channelParameters.localAudioTrack]);

            }

            if(data.callType === "video"){
                agoraEngine.on("user-published",async(user,mediaType)=>{
                    await agoraEngine.subscribe(user,mediaType);
                    if(mediaType === "audio"){
                        const remoteAudioTrack = user.audioTrack;
                        channelParameters.remoteAudioTrack = remoteAudioTrack;
                        remoteAudioTrack.play();
                    }
                    if(mediaType === "video"){
                        const remoteVideoTrack = user.videoTrack;
                        channelParameters.remoteVideoTrack = remoteVideoTrack;
                        remoteVideoTrack.play(document.getElementById("remote-videos"));
                    }
                })

                await agoraEngine.join(appid,roomId,null,null);

                channelParameters.localAudioTrack = (await AgoraClient.createMicrophoneAudioTrack());
                await agoraEngine.publish([channelParameters.localAudioTrack]);

                channelParameters.localVideoTrack = await AgoraClient.createCameraVideoTrack();
                await agoraEngine.publish([channelParameters.localVideoTrack]);
                channelParameters.localVideoTrack.play(document.getElementById("local-video"));
            }
        }
        if(callAccepted)
        startCall(); 

        },[callAccepted])



  
          

        const handleEndCall = async () => {
            const id = data.id;
        
            if (data.callType === "voice")
                socket.current.emit("reject-voice-call", { from: id });
        
            if (data.callType === "video")
                socket.current.emit("reject-video-call", { from: id });

                if(data.callType == "voice")
                {
                    if(channelParameters){
                    await channelParameters?.localAudioTrack?.stop();
                    await channelParameters?.localAudioTrack?.close();
                    }
                    await agoraEngine?.leave();
                }

                if(data.callType === "video"){
                    if(global.channelParameters){
                    await global.channelParameters?.localVideoTrack?.stop();
                    await global.channelParameters?.localAudioTrack?.stop();
                    await global.channelParameters?.localAudioTrack?.close();
                    await global.channelParameters?.localVideoTrack?.close();
                    
                    await agoraEngine?.leave();
                    }
                  
                    
                }

                
                dispatch({type:reducerCases.END_CALL});
        };



        // toggle mute
        function toggleMute() {
            // Access the local audio track
            const localAudioTrack = channelParameters.localAudioTrack;
        
            if (localAudioTrack) {
                if (!isMutedAudio) {
                    // If not muted, mute the microphone
                    localAudioTrack?.setMuted(true)
                    console.log("Microphone muted");
                    setIsMutedAudio((prev)=> !prev);
                } else {
                    // If already muted, unmute the microphone
                    localAudioTrack?.setMuted(false);
                    console.log("Microphone unmuted");
                    setIsMutedAudio((prev)=> !prev);
                }
            }
        }


        function toggleCamera() {
            // Access the local video track
            const localVideoTrack = channelParameters.localVideoTrack;
        
            if (localVideoTrack) {
                if (!isMutedVideo) {
                    // If not muted, stop the camera
                    localVideoTrack.setMuted(true);
                    console.log("Camera turned off");
                    setIsMutedVideo((prev)=> !prev);
                } else {
                    // If already muted, start the camera
                    localVideoTrack.setMuted(false);
                    console.log("Camera turned on");
                    setIsMutedVideo((prev)=> !prev);
                }
            }
        }
        
    
  return (

    <div className='bg-[#10111A] border-1 w-full flex flex-col h-[100vh] items-center justify-center text-white'>
    <div className="flex flex-col gap-3 items-center">

    {data.callType === "voice" && (
    <div className='flex flex-col'>
        
        <span className='text-lg mb-3 text-center'>
            {callAccepted ? 'Ongoing Call' : 'Calling'}
        </span>

        <span className='text-5xl'>{data.name}</span>
    </div>
    )}
    </div> 
    {(!callAccepted || data.callType === "voice") && (
        <div className="my-4">
            <Image src={data.image} alt="avatar" height={300} width={300} className="rounded-full"/>
        </div>
    )}

    {callAccepted && data.callType === "video" && (
    <div className='flex flex-col md:flex-row items-center justify-center  ' id="videochatcontainer">

        <div>

        <div id="local-video" className='h-[300px] w-[300px] overflow-hidden md:h-[500px] md:w-[400px]'></div>
        <h1>YOU</h1>
        </div>
        <div className='mx-8 self-center ' id ="remote-video-container">
           
        <div id="remote-videos" className="h-[300px] w-[300px] overflow-hidden md:h-[500px] md:w-[400px]"></div>
        <h1>{data.name}</h1>
        </div>
    </div>
    )}

    <div className='h-16 flex gap-3 items-center justify-center relative bottom-11'>

        {data.callType === "video" && (
            <div className={`h-16 w-16  ${isMutedVideo ? "bg-red-600":"bg-green-600"}  flex items-center justify-center rounded-full mt-[100px]`} onClick={toggleCamera}>
                <BiCamera className="text-white text-3xl cursor-pointer"/>
            </div>
        )}

        <div className={`h-16 w-16 ${isMutedAudio ? "bg-red-600":"bg-green-600"} flex items-center justify-center rounded-full mt-[100px]`}>
            <FaMicrophone className ="text-white text-3xl cursor-pointer" onClick={toggleMute}/>
        </div>

        <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full mt-[100px]">
            <MdOutlineCallEnd className='text-white text-3xl cursor-pointer' onClick={handleEndCall} id="end-call" />
        </div>
    </div>
</div>
)
}

export default Container