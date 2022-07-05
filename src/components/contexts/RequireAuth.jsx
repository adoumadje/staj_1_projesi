import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


export function RequireAuth({children}) {
    const { currentUser } = useAuth()
    const location = useLocation()

    if(currentUser) {
        return children
    } else {
        return <Navigate to='/login' state={{from: location}} replace />
    }
}