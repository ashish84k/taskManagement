import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import url from "../services/url"; 
import Loader2 from "../components/ui/Loader2";
import { useDispatch } from "react-redux";
import { updateUser} from "../state_management/authSlice";

function ProtectedRoutes() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        
        const res = await fetch(`${url.localhost}/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
            
            const data = await res.json();
            
            dispatch(updateUser({...data.user}));
            
          if (data.success) setAuthenticated(true);
        } else if (res.status === 401) {
         
          const refreshRes = await fetch(`${url.localhost}/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (refreshRes.ok) {
            
            const retry = await fetch(`${url.localhost}/verify`, {
              method: "GET",
              credentials: "include",
            });
            if (retry.ok) {
              const retryData = await retry.json();
              
            dispatch(updateUser({...retryData.user}));
              if (retryData.success) setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
          } else {
            setAuthenticated(false);
          }
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loader2 />; 
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
