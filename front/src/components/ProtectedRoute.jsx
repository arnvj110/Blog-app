import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {

  const {isLoggedIn, loading} = useAuth();
  
  if (loading) {
    return (
      <div className="bg-slate-900  text-white text-center p-10 box-border">
        Checking authentication...
      </div>
    );
  }

  if (!isLoggedIn) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
}
