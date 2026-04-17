"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageToggle } from "../components/LanguageToggle";
import { useAuthStore } from "@/store/authStore";
import { useLanguage } from "../components/LanguageProvider";

export default function Page() {
  const { t, language, interpolate } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { register, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      const success = await register(formData.email, formData.password, formData.firstName, formData.lastName);
      if (success) {
        router.push(`/email-confirmation?email=${encodeURIComponent(formData.email)}`);
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-12">
        <div className="max-w-3xl w-full">
          {/* Top right sign-in */}
          <div className="flex md:hidden flex-col items-center justify-center mb-8">
            <Link href="/">
              <img
                src="/images/logo.svg"
                alt="ORR solutions"
                className="w-16 h-16 mb-4"
              />
            </Link>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="mt-0">
              <h2 className="text-2xl font-extrabold mb-2 md:text-start mr-4 text-center text-[#FFFFFF]">
                {interpolate(t.register.welcome)}
              </h2>
              <p className="text-sm font-medium mb-10 text-[#FFFFFF]  md:text-start text-center">
                {interpolate(t.register.createAccount)}
              </p>
            </div>


            <div className="mb-8 flex items-center gap-4">
              <LanguageToggle />
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
              type="text"
              placeholder={interpolate(t.register.firstName)}
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full border-b-1 border-gray-300 px-6 py-5 focus:outline-none text-white"
              required
            />

            <input
              type="text"
              placeholder={interpolate(t.register.lastName)}
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full border-b-1 border-gray-300 px-6 py-5 focus:outline-none text-white"
              required
            />

            <input
              type="email"
              placeholder={interpolate(t.register.email)}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-b-1 border-gray-300 px-6 py-5 focus:outline-none text-white"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={interpolate(t.register.password)}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-b-1 border-gray-300 px-6 py-5 focus:outline-none text-white bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={interpolate(t.register.confirmPassword)}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full border-b-1 border-gray-300 px-6 py-5 focus:outline-none text-white bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>


            <button
              type="submit"
              disabled={isLoading || formData.password !== formData.confirmPassword}
              className="w-full bg-[#13BE77] text-white py-5 rounded-lg cursor-pointer mt-4 transition disabled:opacity-50"
            >
              {isLoading ? interpolate(t.register.signingUp) : interpolate(t.register.signUp)}
            </button>

            {formData.password !== formData.confirmPassword && formData.confirmPassword && (
              <p className="text-red-400 text-sm mt-2">{interpolate(t.register.passwordsDoNotMatch)}</p>
            )}

            <div className="hidden md:flex items-end  justify-end mt-4 ">
              <Link
                href="/login"
                className="px-6 font-extrabold text-md text-[#FFFFFF] "
              >
                {interpolate(t.register.alreadyHaveAccount)} <span className="text-[#61FD51] underline">{interpolate(t.register.login)}</span>
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
            <Link href="/">
              <img
                src="/images/logo.svg"
                alt="ORR Solutions"
                className="w-32 h-32 mt-5 ml-10" />
            </Link>
          </div>

          <div className="px-10 mt-18 flex flex-row item-center justify-center text-center">
            <ChevronLeft className="my-0" />
            <Link href={"/"} className="text-sm font-poppins font-regular">{interpolate(t.common.backToHomepage)}</Link>
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
