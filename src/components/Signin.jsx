import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import VR from "../../public/Icon/vr.jpg"

function SignIn() {
  // State to manage password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="h-screen md:px-40 px-20 flex justify-center items-center bg-gradient-to-r from-[#080357] to-[#0A2FB9]">
      <div className="w-full max-w-[1280px] h-auto lg:h-[620px] bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 md:px-[60px] px-[30px] md:py-[69px] py-[39px] flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl text-center font-extrabold text-blue-900 mb-6 md:mb-8">Sign In</h1>
          <form className="space-y-4 md:space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#15186D99]">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-b-2 text-[#0b2f8a] font-medium border-[#15186D99] outline-none py-2"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#15186D99]">Password</label>
              <input
                type={passwordVisible ? "text" : "password"} // Conditionally render input type
                placeholder="Enter your password"
                className="w-full border-b-2 text-[#0b2f8a] font-medium border-[#15186D99] outline-none py-2"
              />
              {/* Eye Icon */}
              <span
                onClick={togglePasswordVisibility} // Toggle visibility on click
                className="absolute top-2/4 transform -translate-y-2/4 right-2 cursor-pointer text-xl mt-4"
              >
                {passwordVisible ? (
                  <FaEyeSlash className="w-6 h-6 text-gray-600" /> // Show "eye-slash" when password is visible
                ) : (
                  <FaEye className="w-6 h-6 text-gray-600" /> // Show "eye" when password is hidden
                )}
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="w-[220px] h-[45px] bg-blue-900 text-white py-2 rounded-[16px] hover:bg-blue-700 transition-all"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="text-sm text-gray-500 mx-4">Or sign in with</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-8 text-3xl justify-center">
            <FcGoogle className='cursor-pointer rounded-full shadow-stone-600 shadow-lg' />
            <FaFacebook className='text-[#1877f2] cursor-pointer rounded-full shadow-stone-600 shadow-lg' />
            <AiFillTwitterCircle className='text-[#1da1f2] cursor-pointer rounded-full shadow-stone-600 shadow-lg' />
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-gray-500 text-center">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="bg-gradient-to-b sm:w-1/2 from-[#0A2FB9] to-[#080357] items-center justify-center hidden lg:block">
          <img
            src={VR} // Make sure the image is placed in public/images folder
            alt="VR User"
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
