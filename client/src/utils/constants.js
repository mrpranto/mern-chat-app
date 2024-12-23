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