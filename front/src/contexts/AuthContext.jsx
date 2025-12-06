import { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {login, signup, getMe} from "../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  
  
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    enabled: !!token,
    retry: false,
    
    onError: () => {
      
      localStorage.removeItem("token");
      queryClient.removeQueries(["user"]);
      
    }
  });

  // LOGIN
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login({email, password}),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries(["user"]); 
      toast.success("Logged in successfully!");
      navigate("/"); 
    }
  });

  // REGISTER
  const registerMutation = useMutation({
    mutationFn: (info) =>
      signup(info),
    onSuccess: () => {
      toast.success("Registered successfully!");
      navigate("/login")
    }
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
