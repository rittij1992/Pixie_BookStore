import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../ContextAPI/UserTokenContext_API";

const AuthGuard = ()=>{
    const {userToken}  = useContext(UserContext);
    return(
        userToken ? <Outlet></Outlet> : <Navigate to="/auth/login"></Navigate>
    )
}
export default AuthGuard;