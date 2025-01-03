export const HOST = import.meta.env.VITE_SERVER_URL;

// This routes are all auth related route

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_ROUTE = `${AUTH_ROUTES}/user`;
export const UPDATE_PROFIE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFIE_PICTURE_ROUTE = `${AUTH_ROUTES}/add-profile-picture`;
export const REMOVE_PROFIE_PICTURE_ROUTE = `${AUTH_ROUTES}/remove-profile-picture`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

//This routes are all contact related routes

export const CONTACTS_ROUTE = "api/contact";
export const GET_ALL_CONTACTS = `${CONTACTS_ROUTE}/all`;
export const GET_DM_CONTACTS_ROUTES = `${CONTACTS_ROUTE}/get-contacts-for-dm`;

//This routes are all message related routes

export const MESSAGE_ROUTE = "api/messages";
export const USER_MESSAGE = `${MESSAGE_ROUTE}`;
export const UPLOAD_FILE_ROUTE = `${MESSAGE_ROUTE}/upload-files`;

//This route are all channel related routes

export const CHANNEL_ROUTE = "api/channel";
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTE}/create`;
export const GET_USER_CHANNELS = `${CHANNEL_ROUTE}/get-users`;
export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTE}/get-messages`;