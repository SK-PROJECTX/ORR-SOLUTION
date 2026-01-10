"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useAuthStore } from "@/store/authStore";

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword, isLoading, error } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid') || '';
  const token = searchParams.get('token') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return;
    }
    const success = await resetPassword(uid, token, formData.newPassword);
    if (success) {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-12">
        <div className="max-w-3xl w-full">
          <div className="flex md:hidden flex-col items-center justify-center mb-8">
            <img src="/images/logo.svg" alt="ORR solutions" className="w-16 h-16 mb-4" />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="mt-0">
              <h2 className="text-2xl font-extrabold mb-8 md:text-start text-center text-[#FFFFFF]">
                Reset Your Password
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
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
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
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

            {formData.newPassword !== formData.confirmPassword && formData.confirmPassword && (
              <p className="text-red-400 text-sm mt-2">Passwords do not match</p>
            )}

            <button
              type="submit"
              disabled={isLoading || formData.newPassword !== formData.confirmPassword}
              className="w-full bg-[#13BE77] py-5 rounded-lg cursor-pointer mt-4 transition disabled:opacity-50"
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>

            <div className="hidden md:flex items-end justify-end mt-4">
              <Link href="/login" className="px-6 font-extrabold text-md text-[#FFFFFF]">
                Remember your password? <span className="text-[#61FD51] underline">Login</span>
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
        <div className='justify-between flex flex-row w-full'>
          <div className="justify-start flex items-start">
            <img src="/images/logo.svg" alt="ORR Solutions" className="w-32 h-32 mt-5 ml-10" />
          </div>
          <div className="px-10 mt-18 flex flex-row item-center justify-center text-center"> 
            <ChevronLeft className="my-0" /> 
            <Link href={"/"} className="text-sm font-poppins font-regular">Back to Hompage</Link>
          </div>
        </div>

        <div className="absolute bottom-10 w-full px-6 text-start">
          <p className="text-[48px] font-poppins font-extrabold text-[32px] md:text-[48px] lg:text-[48px] xl:text-[40px] ml-5 mx-auto">
            <span className="text-[#86FF22]">ORR Solutions</span> - Listen. <br />
            Solve. Optimise.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
