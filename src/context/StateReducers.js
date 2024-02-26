
import { reducerCases } from "./Cases";

export const initialState = {
    userInfo:undefined,
    newUser:false,
    contactPage:false,
    currentChatUser:undefined,
    messages:[],
    socket: undefined,
    searchMessage:false,
    search:[],
    userContacts:[],
    onlineUsers:[],
    videoCall:undefined,
    voiceCall:undefined,
    incomingVideoCall:undefined,
    incomingVoiceCall:undefined,
    onlineUsers : [],
    userLoggedOut:false,
    isSearch : false

}

const reducer = (state,action)=>{
    switch(action.type){
        case reducerCases.SET_USER_INFO:
            return {
                ...state,
                userInfo:action.userInfo
            }

        case reducerCases.SET_NEW_USER:
            return {
                ...state,
                newUser:action.newUser
            }
        case reducerCases.SET_CONTACTS_PAGE:
            return {
                ...state,
                contactPage:!state.contactPage
            }

        case reducerCases.SET_CURRENT_CHAT_USER:
            return {
                ...state,
                currentChatUser:action.user
            }

        case reducerCases.SET_MESSAGES:
            return {
                ...state,
                messages:action.messages
            }

        case reducerCases.SET_SOCKET:
            return {
                ...state,
                socket:action.socket
            }

        case reducerCases.ADD_MESSAGE:
            return {
                ...state,
                messages:[...state.messages,action.newMessage]
            }

        case reducerCases.SET_SEARCH_MESSAGES:
            return {
                ...state,
                searchMessage :! state.searchMessage
            }

        case reducerCases.SET_SEARCH:
            return {
                ...state,
                search:action.data
            }

        case reducerCases.SET_USER_CONTACTS:
            return{
                ...state,
                userContacts: action.userContacts
            }

        case  reducerCases.SET_ONLINE_USERS:
            return {

                ...state,
                onlineUsers:action.onlineUsers
            }

        case reducerCases.SET_VIDEO_CALL:
            return{
                ...state,
                videoCall:action.videoCall
            }
        case reducerCases.SET_VOICE_CALL:
            return {
                ...state,
                voiceCall:action.voiceCall
            }
        case reducerCases.SET_INCOMING_VIDEO_CALL:
            return {
                ...state,
                incomingVideoCall:action.incomingVideoCall
            }
        case reducerCases.SET_INCOMING_VOICE_CALL:
            return {
                ...state,
                incomingVoiceCall:action.incomingVoiceCall
            }
        case reducerCases.END_CALL:
            return {
                ...state,
                videoCall:undefined,
                voiceCall:undefined,
                incomingVoiceCall:undefined,
                incomingVideoCall:undefined
            }

        case reducerCases.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers:action.onlineUsers
            }
        case reducerCases.SET_USER_LOGGED_OUT:
            return {
                ...state,
                userLoggedOut:true
            }
        case reducerCases.SET_IS_SEARCH:
            return {
                ...state,
                isSearch:action.isSearch
            }    

        default:
            return state;
    }
}

export default reducer;
