"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuthStore } from "@/store/authStore";
export default function Page() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { forgotPassword, isLoading, error } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(formData.email);
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image + Text */}

    
     

        {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-12">
        <div className="max-w-3xl w-full">
          {/* Top right sign-in */}
           <div className="flex md:hidden flex-col items-center justify-center mb-8">
              <img
                src="/images/logo.svg"
                alt="ORR solutions"
                className="w-16 h-16 mb-4"
              />
            </div>
         

          <div className="flex justify-between items-center mb-6">
                   <div className="mt-0">
                         <h2 className="text-2xl font-extrabold mb-8 md:text-start text-center text-[#FFFFFF]">
                         Forgot Your Password
                       </h2>
                   </div>
                  
         
                   <div className="mb-8">
                     <ThemeToggle />
                   </div>
                   
                   </div>


          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-7" onSubmit={handleSubmit}>
           

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-b-1 border-gray-300 px-6 py-5 focus:outline-none text-white"
              required
            />

          
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#13BE77]  py-5 rounded-lg cursor-pointer mt-4 transition disabled:opacity-50"
            >
              {isLoading ? "Recovering Password..." : "Forgot Password"}
            </button>

                <div className="hidden md:flex items-end  justify-end mt-4 ">
                <Link
                  href="/login"
                  className="px-6 font-extrabold text-md text-[#FFFFFF] "
                >
                  Already have an account <span className="text-[#61FD51] underline">Login</span>
                </Link>
              </div>
          </form>
        
        </div>

        
      </div>

       <div
        className="hidden md:flex flex-1 bg-cover m-3 rounded-lg bg-center relative text-white"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/depeqzb6z/image/upload/v1764168892/side-image_1_jwpnup.png')",
        }}
      >
        {/* <div className="absolute inset-0 bg-black/80"></div> */}
        {/* <div className="relative text-center px-6 flex  justify-center h-full py-12">
          <div className="flex justify-center">
            <img
              src="/images/logo.svg"
              alt="ORR Solutions"
              className="mx-auto mb-6 w-28 h-auto"
            />
          <p className="text-3xl font-extrabold md:text-xl  mx-auto mt-auto">
          ORR Solutions - Listen. 
          Solve. Optimise.
          </p>
          </div>
          
        </div> */}
        <div className='justify-between flex flex-row w-full'>
          <div className="justify-start flex items-start">
            <img 
              src="/images/logo.svg"
              alt="ORR Solutions"
              className="w-32 h-32 mt-5 ml-10" />
          </div>

          <div className="px-10 mt-18 flex flex-row item-center justify-center text-center"> 
              <ChevronLeft className="my-0" /> 
              <Link href={"/"} className="text-sm font-poppins font-regular">Back to Hompage</Link>
          </div>
        </div>


        <div className="absolute bottom-10 w-full px-6 text-start">
          <p className="text-[48px] font-poppins font-extrabold text-[32px] md:text-[48px] lg:text-[48px] xl:text-[40px] ml-5 mx-auto">
            <span className="text-[#86FF22] ">ORR Solutions</span> - Listen. <br />
            Solve. Optimise.
          </p>
        </div>
      </div>    

    </div>
  );
}
