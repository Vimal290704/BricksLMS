import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import jwtDecode from "jwt-decode";


const API_URL = 'http://localhost:8000/api';

export const AuthService = {
    //login method
    async login(username , password){
        try{
            const response = await axios.post(`${API_URL}/token/` , {
                username ,
                password
            });
            //check if response has access and refresh token
            if (!response.data?.access || !response.data?.refresh) {
                throw new Error("Invalid login response. Missing access or refresh token.");
            }
                const {refresh , access} = response.data;
                //decode the access token to get user details
                const decodedUser = jwtDecode(access);
                // Store the access token in SecureStore
                await SecureStore.setItemAsync('accessToken' , access);
                await SecureStore.setItemAsync('refreshToken' , refresh);
                await SecureStore.setItemAsync('user' , JSON.stringify(decodedUser));
            
            return{
                tokens: response.data,
                user: decodedUser
            };
        }catch(error){
            console.log('Login error:' , error.response?.data || error.message);
            throw error;
        }
    },

    getCurrentUser: async () => {
        try{
            const userString = await SecureStore.getItemAsync('user');
            return userString ? JSON.parse(userString) : null;
        }catch(error){
            console.log('Get user error:' , error.response?.data || error.message);
            return null;
        }
    },

    //refresh token method gives new access token
    refreshToken: async () =>{
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        try{
            const response = await axios.post(`${API_URL}/token/refresh`);
            
                const {access} = response.data;
                const decodedUser = jwtDecode(access);
                await SecureStore.setItemAsync('accessToken' , access);
                await SecureStore.setItemAsync('user' , JSON.stringify(decodedUser));
            
            return{
                access,
                user: decodedUser
            };
        }catch(error){
            await AuthService.logout();
            console.log('Refresh token error:' , error.response?.data || error.message);
            throw error;
        }
    },
    //logout
    logout: async () =>{
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('user');
    },
    //check if user is authenticated
    isAuthenticated: async () => {
        const token = await SecureStore.getItemAsync('accessToken');
        return !!token;
    }
}