import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const accesstoken = localStorage.getItem("accessToken");

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!accesstoken) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_URL_BACKEND}/api/auth/authorize`,
          {
            headers: { Authorization: `Bearer ${accesstoken}` },
          }
        );

        const userRole = response.data.role;
        if (!roleRequired || userRole === roleRequired) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, [accesstoken, roleRequired]);

  if (isAuthorized === null) return <p>Loading...</p>; // Hiển thị khi đang xác thực

  if (!isAuthorized) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
