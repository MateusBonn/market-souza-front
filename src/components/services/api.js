import axios from "axios";

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
    return api.get(`/auth/refresh-token?token=${token}`)
}

export const getPrice = async(codeProduct) => {
    return api.get(`/supermercado-souza/product/${codeProduct}/get-price`)
}



