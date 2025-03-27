import React ,  { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from '../services/authService';

export const AuthContext = createContext({
    isLoading: true,
    isLoggedIn: false,
    user: null,
    loginLoading: false,
    login: async () =>{},
    logout: async () =>{},
    refreshUser: async () =>{},
});

export const AuthProvider = ({children}) =>{
    const [isLoading , setIsLoading] = useState(true);
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [user , setUser] = useState(null);
    const [loginLoading , setLoginLoading] = useState(false);

    useEffect(()=>{
        // check authentication status on app start
        checkAuthStatus();
    },[])

    const checkAuthStatus = async () =>{
        try{
            let authenticated = await AuthService.isAuthenticated();
            // if not authenticated, try to refresh token
            if(!authenticated){
                try{
                    const {user} = await AuthService.refreshToken();
                    setUser(user);
                    setIsLoggedIn(true);
                    authenticated = true;
                }catch(error){
                    console.log('Error refreshing token:', error);
                }
            }
            if(authenticated){
                const currentUser = await AuthService.getCurrentUser();
                setUser(currentUser);
                setIsLoggedIn(true);
            }
        }catch(error){
            setIsLoggedIn(false);
            setUser(null);
        }finally{
            setIsLoading(false);
        }
    };

    const login = async (username , password) =>{
        setLoginLoading(true);
        try{
            const {tokens , user:userData} = await AuthService.login(username , password);
            setIsLoggedIn(true);
            setUser(userData);
            return userData;
        }catch(error){
            setIsLoggedIn(false);
            setUser(null);
            throw error;
        }finally{
            setLoginLoading(false);
        }
    };

    const logout = async () =>{
        setIsLoading(true);
        try{
            await AuthService.logout();
            setIsLoggedIn(false);
            setUser(null);
        }finally{
            setIsLoading(false);
        }
    }

    const refreshUser = async () => {
        try{
            const currentUser = await AuthService.getCurrentUser();
            setUser(currentUser);
            return currentUser;
        }catch(error){
            console.log('Error refreshing user:', error);
            return null;
        }
    };

    return(
        <AuthContext.Provider value={{
            isLoading,
            isLoggedIn,
            user,
            login,
            logout,
            refreshUser,
            loginLoading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);