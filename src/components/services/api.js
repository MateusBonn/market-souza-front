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

export const sendSold = async(body) => {
    return api.post("/supermercado-souza/product/product-sold" , body)
}

export const recoveredToken = async(token) => {
    const responseToken = await api.get(`/auth/refresh-token?token=${token}`)

    if(responseToken.status === 200){
        await setCookies(responseToken)
    }
}

export const getProduct = async(data) => {
    var itemsPerPage = 25
    var pageIndex = 1
    var orderBy = "name_product%2Basc"
    var searchBy = "code%2Cname"
    var startIndex = 1

    return api.get(`/supermercado-souza/product/search?itemsPerPage=${itemsPerPage}&pageIndex=${pageIndex}&startIndex=${startIndex}&orderBy=${orderBy}&searchBy=${searchBy}&search=${data}`)
}


export const getPrice = async(codeProduct) => {
    return api.get(`/supermercado-souza/product/${codeProduct}/get-price`)
}



