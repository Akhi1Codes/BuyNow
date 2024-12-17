import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useProtectedRouteRedirect = (error) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error.status === 401) {
      navigate("/login");
    }
  }, [error, navigate]);
};

export default useProtectedRouteRedirect;
