import { createContext, useState } from "react";

export const PageDetailContext = createContext();

export const PageDetailProvider = ({children}) => {
    const [pageTitle, setPageTitle] = useState("xyz");
    
    return(
        <PageDetailContext.Provider value={{pageTitle, setPageTitle}}>
            {children}
        </PageDetailContext.Provider>
    )
}
