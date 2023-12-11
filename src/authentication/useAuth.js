// auth.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signInUser as signInApi } from "../services/apiAuth";
import { signUpUser as signUpApi } from "../services/apiAuth";
import { forgotPassword as forgotPasswordApi } from "../services/apiAuth";
import { resetPassword as resetPasswordApi } from "../services/apiAuth";
import { logout as logoutApi } from "../services/apiAuth";
import { getUser } from "../services/apiAuth";

export function useSignInUser() {
  const navigate = useNavigate();

  const { mutate: handleSignIn, isPending } = useMutation({
    mutationFn: ({ email, password }) => signInApi({ email, password }),
    onSuccess: (responseData) => {
      if (responseData.status === "success" && responseData.token) {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(responseData.data.user)
        );
      }
      navigate("/menu", { replace: true });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Provided email or password is incorrect");
    },
  });
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const isTokenValid = payload.exp && Date.now() / 1000 < payload.exp;

      return isTokenValid;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  return { handleSignIn, isPending, isAuthenticated };
}

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { isLoading, user };
}

export function useSignUpUser() {
  const navigate = useNavigate();

  const { isPending, mutate: handleSignUp } = useMutation({
    mutationKey: "signup",
    mutationFn: (userData) => signUpApi(userData),
    onSuccess: () => {
      toast.success("Account Successfully Created");
      navigate("/sign_in", { replace: true });
    },
    onError: () => {
      toast.error("Error Creating Account or Account Already exist");
    },
  });

  return { handleSignUp, isPending };
}

export function useForgotPassword() {
  const navigate = useNavigate();

  const { isPending, mutate: handleForgotPassword } = useMutation({
    mutationKey: "forgotPassword",
    mutationFn: (userData) => forgotPasswordApi(userData),
    onSuccess: () => {
      toast.success("Reset link sent to mail");
      navigate("/sign_in", { replace: true });
    },
    onError: () => {
      toast.error("Invalid email address");
    },
  });

  return { handleForgotPassword, isPending };
}
// useAuth.js
export function useResetPassword() {
  const navigate = useNavigate();

  const { isPending, mutate: handleResetPassword } = useMutation({
    mutationKey: "resetPassword",
    mutationFn: async ({ token, resetData }) => {
      return await resetPasswordApi(token, resetData);
    },
    onSuccess: () => {
      toast.success("Password Reset Successful");
      navigate("/sign_in", { replace: true });
    },
    onError: () => {
      toast.error("Invalid or expired token");
    },
  });

  return { handleResetPassword, isPending };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      queryClient.removeQueries();
      navigate("/sign_in", { replace: true });
    },
  });

  return { logout, isPending };
}
