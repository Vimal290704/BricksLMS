import * as SecureStore from 'expo-secure-store';
import axios from "axios";


const API_URL = 'http://localhost:8000/api';

export const authService = {
    //login method
    async login(username , password){
        try{
            const response = await axios.post(`${API_URL}/token` , {
                username ,
                password
            });

            if(response.ok){
                const data = await response.json();

                // Store the access token in SecureStore
                await SecureStore.setItemAsync('accessToken' , data.access);
                await SecureStore.setItemAsync('refreshToken' , data.refresh);
            }
            return data;
        }catch(error){
            console.log('Login error:' , error.response?.data || error.message);
            throw error;
        }
    },
    //refresh token method gives new access token
    refreshToken: async () =>{
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        try{
            const response = await axios.post(`${API_URL}/token/refresh`);

            if(response.ok){
                const {access} = response.data;
                await SecureStore.setItemAsync('accessToken' , access);
            }
            return access;
        }catch(error){
            await authService.logout();
            console.log('Refresh token error:' , error.response?.data || error.message);
            throw error;
        }
    },
    //logout
    logout: async () =>{
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');
    },
    //check if user is authenticated
    isAuthenticated: async () => {
        const token = await SecureStore.getItemAsync('accessToken');
        return !!token;
    }
}