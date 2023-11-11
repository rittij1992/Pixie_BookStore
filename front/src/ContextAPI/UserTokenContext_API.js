import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userToken, setUserToken] = useState(()=>{
        const storedUser = localStorage.getItem("UserToken");
        return storedUser ? JSON.parse(storedUser) : null
    })

    useEffect(()=>{
        if(userToken){
            localStorage.setItem("UserToken", JSON.stringify(userToken))
        }else{
            localStorage.removeItem("UserToken")
        }
    },[userToken])

    return (
        <UserContext.Provider value={{userToken, setUserToken}}>
            {children}
        </UserContext.Provider>
    )
}