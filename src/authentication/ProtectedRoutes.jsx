/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInUser } from "./useAuth";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSignInUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/sign_in");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
