import { createContext, useReducer } from 'react'
import React from 'react';

export const UserContext = createContext()

const initialState = {
    isLogin: false,
    isAdmin: false,
    user: {},
}

const reducer = (state, action) => {
    const { type, userStat, payload } = action

    switch (type) {
        case 'LOGIN_SUCCESS':
        case 'LOGIN_USER':
            localStorage.setItem("token", payload.token);
            return {
                isLogin: true,
                isAdmin:userStat,
                user: payload,
            }
        case 'LOGOUT':
        case "AUTH_ERROR":
            localStorage.removeItem("token");
            return {
                isLogin: false,
                isAdmin: false, 
                user: {},
            }
        default:
            throw new Error()
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={ [state, dispatch] }>
            { children }
        </UserContext.Provider>
    )
}