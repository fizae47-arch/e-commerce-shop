import SignUp from "../components/SignUp/SignUp";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from "react";

export default function SignUpPage() {
   const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
  
    useEffect(() => {
      if (isAuthenticated === true ){
        navigate("/")
      }
    })
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <SignUp />
    </div>
  )
}