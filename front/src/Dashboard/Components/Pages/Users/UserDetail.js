import { useContext, useEffect } from "react";
import { PageDetailContext } from "../../../../ContextAPI/PageDetailContext";

const UserPage = () => {
    const { setPageTitle } = useContext(PageDetailContext);

    useEffect(() => {
        setPageTitle("User Profile");
    }, []);


    return (
        <>
            user profile page
        </>
    )
};

export default UserPage;