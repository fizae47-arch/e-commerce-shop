import { useEffect} from 'react';
import Login from "../components/Login/Login";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true ){
      navigate("/")
    }
  })
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Login />
    </div>
  )
}