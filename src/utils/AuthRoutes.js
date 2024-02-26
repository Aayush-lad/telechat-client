export const HOST = "https://telechat-server-3l6y.onrender.com";
export const AUTH_ROUTE = `${HOST}/api/auth`;
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/checkuser`;
export const ONBOARD_ROUTE = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;
export const GET_USER_DETAILS = `${AUTH_ROUTE}/user-details`;

export const MESSAGE_ROUTE = `${HOST}/api/messages`;

export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`;

export const GET_MESSAGES_ROUTE = `${MESSAGE_ROUTE}/get-messages`;
export const ADD_IMAGE_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-image-message`;
export const ADD_AUDIO_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-audio-message`;
export const GET_INITIAL_CONTACTS_ROUTE =`${MESSAGE_ROUTE}/get-current-contacts`;
export const SEARCH_MESSAGES_ROUTE = `${MESSAGE_ROUTE}/search-messages`;
