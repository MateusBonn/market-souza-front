import axios from "axios";
import Cookies from "universal-cookie";


export const api = axios.create ({
    baseURL: "http://localhost:8081"
})

export const createSession = async(username, password) => {
    return api.post("/auth/login" , {username, password})
}

export const sendStorage = async(body) => {
    return api.post("/supermercado-souza/product/add-product" , body)
}

export const recoveredToken = async(token) => {
    var cookie = new Cookies();
    const responseToken = await api.get(`/auth/refresh-token?token=${token}`)

    if(responseToken.status === 200){

        console.log('Tokem recuperado');
        const loggedUser = responseToken.data.login;
        const token = responseToken.data.token;
        cookie.set('user', loggedUser.firstName)
        cookie.set('role', loggedUser.role)
        cookie.set('token', token.accessToken)
        cookie.set('refreshToken', token.refreshToken)
        console.log('Tokem recuperado', responseToken.status);

        console.log('Atual', cookie.get('token'))

        api.defaults.headers.Authorization = `Bearer ${token.accessToken}`
    }

}

export const getPrice = async(codeProduct) => {
    return api.get(`/supermercado-souza/product/${codeProduct}/get-price`)
}



