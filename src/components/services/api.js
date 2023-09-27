import axios from "axios";
import { setCookies } from "../UniversalFunctions/UniversalFunctions";


export const api = axios.create ({
    baseURL: "https://supermarket-souza-production.up.railway.app"
})

export const createSession = async(username, password) => {
    return api.post("/auth/login" , {username, password})
}

export const sendStorage = async(body) => {
    return api.post("/supermercado-souza/product/add-product" , body)
}

export const recoveredToken = async(token) => {
    const responseToken = await api.get(`/auth/refresh-token?token=${token}`)

    if(responseToken.status === 200){
        await setCookies(responseToken)
    }
}

export const getProductByCode = async(codeProduct) => {
    return api.get(`/supermercado-souza/product/search?codeProduct=${codeProduct}`)
}

export const getProductByName = async(nameProduct) => {
    return api.get(`/supermercado-souza/product/search?nameProduct=${nameProduct}`)
}

export const getPrice = async(codeProduct) => {
    return api.get(`/supermercado-souza/product/${codeProduct}/get-price`)
}



