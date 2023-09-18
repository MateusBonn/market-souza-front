import Cookies from "universal-cookie";
import {api} from "../services/api"


export const setCookies = async(responseToken) => {
    var cookie = new Cookies();

    if(responseToken.status === 200){

        console.log('Tokem recuperado');
        const loggedUser = responseToken.data.login;
        const token = responseToken.data.token;
        cookie.set('user', loggedUser.firstName, {
                    path: '/',
                    expires: new Date(new Date().getTime() + 3600000),})

        cookie.set('role', loggedUser.role, {
                    path: '/',
                    expires: new Date(new Date().getTime() + 3600000),})

        cookie.set('token', token.accessToken, {
                    path: '/',
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 3600000),})

        cookie.set('refreshToken', token.refreshToken, {
                    path: '/',
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 3600000),})
                    
        console.log('Tokem recuperado', responseToken.status);

        console.log('Atual', cookie.get('token'))

        api.defaults.headers.Authorization = `Bearer ${token.accessToken}`
    }

}