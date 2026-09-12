import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../../server';
import { toast } from "react-toastify";


export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePhoto: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // FormData use karo - files ke liye
  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('password', formData.password);
  formDataToSend.append('profilePhoto', formData.profilePhoto);
  
  try {
    const response = await fetch(`${server}/user/register`, {
      method: 'POST',
      // ❌ Content-Type header remove karo! FormData automatic set kar dega
      body: formDataToSend
    });
     const data = await response.json();
    console.log('Response:', data);

    if (data.success) {
      toast.success(data.message || "Registered successfully!");
    } else {
      toast.error(data.message || "Registration failed!");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Register as a new user
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Input with Eye Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.111l-1.781-1.818zM10 5a3.999 3.999 0 013.818 2.619l-3.818-3.818V5zm6.364 12.637l-.757-.757A9.980 9.980 0 0110 17c-4.478 0-8.268-2.943-9.542-7a9.947 9.947 0 011.563-3.029l-1.124-1.124A10.015 10.015 0 00.458 10c1.274 4.057 5.064 7 9.542 7 1.711 0 3.357-.276 4.914-.843l-.55-.551z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Upload Profile Photo
          </label>
          <div className="flex items-center justify-center">
            <label className="flex items-center gap-3 cursor-pointer">
              {photoPreview ? (
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-sm text-gray-600">Upload a file</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </form>

      {/* Sign In Link */}
      <div className="mt-6 text-center">
        <span className="text-gray-700">Already Have an account? </span>
        <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign In
        </a>
      </div>
    </div>
  );
}
