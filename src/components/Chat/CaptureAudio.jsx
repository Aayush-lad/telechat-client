import { reducerCases } from '@/src/context/Cases';
import { useStateProvider } from '@/src/context/StateContext'
import React, { useEffect, useRef, useState } from 'react'
import { FaPauseCircle, FaPlay, FaStop, FaTrash ,FaMicrophone} from 'react-icons/fa'
import { MdSend } from 'react-icons/md';
import WaveSurfer from 'wavesurfer.js'
import axios from 'axios'
import { ADD_AUDIO_MESSAGE_ROUTE } from '@/src/utils/AuthRoutes';


const CaptureAudio = ({hide}) => {

    const[{socket,currentChatUser,userInfo},dispatch] = useStateProvider();

    const [isRecording,setIsRecording] = useState(false)
    const [recordedAudio,setRecordedAudio] = useState(null)
    const [waveform,setWaveform] = useState(null)
    const [currentPlaybacktime , setcurrentPlaybacktime]=useState(0);
    const [totalDuration , setTotalDuration ] = useState(0)
    const [recordingDuration, setRecordingDuration] = useState(0);
    const[isPlaying,setisPlaying] =useState(false)
    const[renderedAudio,setRenderedAudio] = useState(null)
    
    const audioRef = useRef(null)
    const mediaRecRef = useRef(null)
    const waveFormRef = useRef(null)


    useEffect(()=>{

        const wavesurfer = WaveSurfer.create({
            container:waveFormRef.current,
            waveColor:"#ccc",
            progressColor:"#4a9eff",
            cursorColor:"#7ae3c3",
            barWidth:2,
            height:30,
            responsive:true,
        })

        setWaveform(wavesurfer)

        wavesurfer.on("finish",()=>{
            setisPlaying(false)

        })

        return ()=>{
            wavesurfer.destroy()
        }
    },[]);



    useEffect(()=>{
        if(waveform) handleStartRecording();
    },[waveform])

    


    const handlePlayRecording =()=>{

        if(recordedAudio){
            waveform.stop();
            waveform.play();
            recordedAudio.play();
            setisPlaying(true);
        }
    }

    const handleStopRecording =()=>{

        if(mediaRecRef.current && isRecording){
            mediaRecRef.current.stop();
            setIsRecording(false);
            waveform.stop();
            const audioChunks =[];

            mediaRecRef.current.addEventListener("dataavailable",(event)=>{
                audioChunks.push(event.data)
            });

            mediaRecRef.current.addEventListener("stop",()=>{
                const audioBlob = new Blob(audioChunks,{type:'audio/mp3; codecs=opus'})
                const audioFile = new File([audioBlob],`audio_${Date.now()}.mp3`)
                setRenderedAudio(audioFile)
            }
            )
        }

    }

   
    
    

    const handleStartRecording =()=>
    {
        setRecordingDuration(0);
        setcurrentPlaybacktime(0);
        setTotalDuration(0);
        setIsRecording(true);
        
        navigator.mediaDevices.getUserMedia({audio:true})
        .then((stream)=>{
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecRef.current = mediaRecorder;
            audioRef.current.srcObject = stream;

            const chunks = [];


            mediaRecorder.ondataavailable = (e)=>{chunks.push(e.data)}
            mediaRecorder.onstop = ()=>{
                const blob = new Blob(chunks,{type:'audio/ogg; codecs=opus'})
                const audioURL= URL.createObjectURL(blob)
                const audio = new Audio(audioURL);
                setRecordedAudio(audio);
                waveform.load(audioURL);

            }
            mediaRecorder.start();
            
        })
        .catch((err)=>{
            console.log(err);
        }
        )
    }

        useEffect(()=>{
            let interval ;
            if(isRecording){

                interval = setInterval(()=>{
                    setRecordingDuration((prev)=>{

                        setTotalDuration(prev+1);
                        return prev+1;
                        
                    })

                },1000)
            }

            return ()=>clearInterval(interval);

    },[isRecording])


    const handlePauseRecording=()=>{

        if(recordedAudio){
        waveform.stop();
        recordedAudio.pause();
        setisPlaying(false);
        }
    }

    useEffect(()=>{

        if(recordedAudio){
            const updatePlaybackTime = ()=>{
                setcurrentPlaybacktime(recordedAudio.currentTime);
            }

            recordedAudio.addEventListener("timeupdate",updatePlaybackTime);
            return ()=>recordedAudio.removeEventListener("timeupdate",updatePlaybackTime);

        }
    },[recordedAudio])

    const sendRecording =async()=>{
        if(renderedAudio){
            const formData = new FormData();
            formData.append('audio',renderedAudio);

            const response = await axios.post(ADD_AUDIO_MESSAGE_ROUTE,formData,{
                
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                params:{
                    from:userInfo?.id,
                    to:currentChatUser?.id
                }
            })

            if(response.status === 201){
                socket.current.emit('send-msg',{
                    message:response.data.messsage,
                    to:currentChatUser?.id,
                    type:'audio'
                })

                dispatch({
                    type: reducerCases.ADD_MESSAGE,
                    newMessage:{
                        ...response.data.message
                    },
                    fromSelf:true
                })
            }



         
        }
    }

      return (
        <div className="flex text-2xl justify-end items-center">
        <div>
            <FaTrash onClick={hide} color='white' />
        </div>
    
        <div className='mx-4 py-2 px-4 text-white text-lg flex justify-center items-center'>

            {isRecording?(
            <div className="text-white animate-pulse text-center">
                Recording 
            </div>
            ):(
            <div>
                {
                    recordedAudio && (
                        <>
                        {
                            isPlaying? <FaStop onClick={handlePauseRecording} />:<FaPlay onClick={handlePlayRecording} />
                        }
                        </>
                     
                    )
               }
            </div>
            )}
        

    
                <div className='w-60' ref={waveFormRef} hidden={isRecording} />
                
                {recordedAudio && isPlaying && (
                    <div className="text-center">
                        {currentPlaybacktime}/{totalDuration}
                    </div>
                )}
    
                {recordedAudio && !isPlaying && (
                    <div className="text-center">
                        {totalDuration}
                    </div>
                )}
                </div>
                
                <audio ref={audioRef} hidden />
            
            <div className='flex justify-center items-center ml-5 mr-5'>
                {!isRecording ? (
                    <FaMicrophone onClick={handleStartRecording} className='text-red-500' />
                ) : (
                    <FaPauseCircle onClick={handleStopRecording} className='text-red-500 ' />
                )}
            </div>
            <div>
                <MdSend className="cursor-pointer mr-4" onClick={sendRecording} />
            </div>
        </div>
    )
}


export default CaptureAudio