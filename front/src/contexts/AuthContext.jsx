import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {login, signup, getMe} from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch current user only if token exists
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    enabled: !!token,
    retry: false,
    onError: () => {
      // invalid token -> logout
      localStorage.removeItem("token");
      queryClient.removeQueries(["user"]);
    }
  });

  // LOGIN
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login({email, password}),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries(["user"]); // refetch user
      navigate("/"); // redirect to homepage
    }
  });

  // REGISTER
  const registerMutation = useMutation({
    mutationFn: (info) =>
      signup(info),
    onSuccess: () => navigate("/login")
  });

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    queryClient.removeQueries(["user"]);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading || loginMutation.isPending || registerMutation.isPending,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout,
        isLoggedIn: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
