// import {createContext, useState} from "react";
//
// const LoginContext = createContext()
//
// const LoginProvider = ({children}) => {
//     const [isLoading , setIsLoading] = useState()
//
//     const setLoading = (status) => {
//         setIsLoading(status)
//     }
//
//     return (
//         <LoginContext.Provider value={{isLoading , setLoading}}>
//             {children}
//         </LoginContext.Provider>
//     )
// }
//
// export {LoginContext , LoginProvider}