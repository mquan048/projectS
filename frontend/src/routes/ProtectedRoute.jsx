import React from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children, roleRequired})
{
    const accesstoken = localStorage.getItem("access_token");
    const userRole = localStorage.getItem("user_role");
    // ko có token
    if(!accesstoken)
        return <Navigate to="/login"/>;
    //có token nhưng không đúng role
    if(roleRequired && userRole != roleRequired)
        return <Navigate to="*"/>;
    return children;
}