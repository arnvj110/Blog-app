import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import ViewPost from "./pages/ViewPost";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <Navbar /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={
              <ProtectedRoute>
                  <CreatePost/>

                </ProtectedRoute>
              } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/posts/:id" element={<ViewPost />} />
          </Routes>
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
