import axios from "axios";


export default function requestApi(endpoint , method , body , responType = 'json') {
    const headers = {
        "Accept" : "application/json",
        "content-type" : "application/json",
        "Accept-Control-Allow-Origin" : "*",
        "x-api-key" : '1db16e2ffb221a72dafb256f0d3b5c7ff9e3c8115aebd43ca389c3091a4167a0441164ba9208e701cb3ec2e1b6fce7bcdfbda53af2bcb68bb89b2086a15c50f8'
    }

    const instance = axios.create({headers})

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token')
            const clientId = localStorage.getItem('x-client-id')
            if (token) {
                config.headers['authorization'] = token
                config.headers['x-client-id'] = clientId
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // instance.interceptors.response.use(
    //     (response) => {
    //         return response
    //     },
    //     async (error) => {
    //         const originalConfig = error.config
    //         console.log("Access token expired!")
    //         if (error.response && error.response.status === 500) {
    //             try {
    //                 console.log("call api refresh token api")
    //                 const result = await instance.post(
    //                     'http://localhost:3052/v1/api/shop/handlerRefreshToken',
    //                     {},
    //                     {
    //                         headers: {
    //                             "x-client-id" : localStorage.getItem('x-client-id'),
    //                             "x-rtoken-id" : localStorage.getItem('refresh_token')
    //                         } // Gắn headers vào yêu cầu
    //                     }
    //                 )
    //                 const { access_token , refresh_token } = result.data.metadata.tokens
    //             }catch (e) {
    //
    //             }
    //
    //         }
    //     }
    // )

    return instance.request({
        method : method,
        url : `http://localhost:3052/v1/api/${endpoint}`,
        data : body,
        responseType : responType
    })
}