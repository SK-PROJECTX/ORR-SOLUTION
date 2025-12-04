"use client";
import React, { useState } from "react";
import { useProfileStore } from "@/store/profileStore";

export default function AccountSettingsPage() {
  const { profile, isLoading, isEditing, updateProfile, setEditing, setProfile } = useProfileStore();
  const [formData, setFormData] = useState(profile);

  const handleSave = async () => {
    await updateProfile(formData);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div className="min-h-screen w-full bg-background text-white px-12 py-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full">
        <div className="flex justify-between max-w-6xl">

        <h1 className="text-3xl font-semibold text-[#22C55E] mb-6">
          Account/Setting
        </h1>


        {/* Search Bar */}
        <div className="w-full flex justify-center mb-10">
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Search anything here..."
              className="w-full  bg-[rgb(var(--bg-card)_/_0.8)] border border-[#1E3A4B] rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#22C55E]">
              🔍
            </button>
          </div>
        </div>
        </div>


        <div className="flex justify-between ">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Setting Details</h2>
            <p className="text-sm text-gray-300 mb-8">
              Update your photo and personal details here.
            </p>
          </div>
          {/* Buttons */}
          <div className="gap-4">
            {isEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-400 rounded-md mr-4"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-6 py-2 bg-[#22C55E] text-black rounded-md font-semibold disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </>
            ) : (
              <button 
                onClick={handleEdit}
                className="px-6 py-2 bg-[#22C55E] text-black rounded-md font-semibold"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        {/* Page Title */}

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8">
          {/* Personal Info Card */}
          <div className="bg-card p-6 rounded-xl border border-[#1E3A4B]">
            <h3 className="text-lg font-semibold mb-6">Personal information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <input
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Nickname</label>
                <input
                  value={formData.nickname}
                  onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                  placeholder="Enter nickname"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value as 'male' | 'female' | 'other'})}
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Country</label>
                <input
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                  placeholder="Enter country"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Language</label>
                <input
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                  placeholder="Enter language"
                />
              </div>

              {/* Commented out fields not in API schema */}
              {/* 
              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <input
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Phone No</label>
                <input
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                  placeholder="Enter phone no"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">City</label>
                <input
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                  placeholder="Enter your city"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Zip code</label>
                <input
                  disabled={!isEditing}
                  className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50"
                  placeholder="Enter zip code"
                />
              </div>
              */}
            </div>



            {/* Bio - Commented out as not in API schema */}
            {/*
            <div className="mt-6">
              <label className="block text-sm mb-2">
                Bio(Write a short introduction)
              </label>
              <textarea
                value={formData.bio || 'Lorem ipsum, in graphical and textual context, refers to filler text that is placed in a document or visual presentation. Lorem ipsum is derived from the Latin "dolorem ipsum" roughly translated as "pain itself."'}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                disabled={!isEditing}
                className="w-full bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 min-h-[100px]"
                placeholder="Write your bio..."
              />
            </div>
            */}

            {/* Timezone */}
            <div className="mt-6">
              <label className="block text-sm mb-2">Timezone</label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                disabled={!isEditing}
                className="w-full bg-card border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-white"
              >
                <option value="">Select timezone</option>
                <option value="UTC-12:00">UTC-12:00 (Baker Island)</option>
                <option value="UTC-11:00">UTC-11:00 (American Samoa)</option>
                <option value="UTC-10:00">UTC-10:00 (Hawaii)</option>
                <option value="UTC-09:00">UTC-09:00 (Alaska)</option>
                <option value="UTC-08:00">UTC-08:00 (Pacific Standard Time)</option>
                <option value="UTC-07:00">UTC-07:00 (Mountain Standard Time)</option>
                <option value="UTC-06:00">UTC-06:00 (Central Standard Time)</option>
                <option value="UTC-05:00">UTC-05:00 (Eastern Standard Time)</option>
                <option value="UTC-04:00">UTC-04:00 (Atlantic Standard Time)</option>
                <option value="UTC-03:00">UTC-03:00 (Argentina, Brazil)</option>
                <option value="UTC-02:00">UTC-02:00 (South Georgia)</option>
                <option value="UTC-01:00">UTC-01:00 (Azores)</option>
                <option value="UTC+00:00">UTC+00:00 (London, Dublin)</option>
                <option value="UTC+01:00">UTC+01:00 (Central European Time)</option>
                <option value="UTC+02:00">UTC+02:00 (Eastern European Time)</option>
                <option value="UTC+03:00">UTC+03:00 (Moscow, Turkey)</option>
                <option value="UTC+04:00">UTC+04:00 (Dubai, Baku)</option>
                <option value="UTC+05:00">UTC+05:00 (Pakistan, Kazakhstan)</option>
                <option value="UTC+05:30">UTC+05:30 (India, Sri Lanka)</option>
                <option value="UTC+06:00">UTC+06:00 (Bangladesh, Bhutan)</option>
                <option value="UTC+07:00">UTC+07:00 (Thailand, Vietnam)</option>
                <option value="UTC+08:00">UTC+08:00 (China, Singapore)</option>
                <option value="UTC+09:00">UTC+09:00 (Japan, South Korea)</option>
                <option value="UTC+10:00">UTC+10:00 (Australia East)</option>
                <option value="UTC+11:00">UTC+11:00 (Solomon Islands)</option>
                <option value="UTC+12:00">UTC+12:00 (New Zealand)</option>
              </select>
            </div>
          </div>

          {/* Right Column - Commented out */}
          {/*
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-[#1E3A4B]">
              <h3 className="text-lg font-semibold mb-4">Your Photo</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                <div>
                  <p>Edit your photo</p>
                  <button className="text-red-400 text-xs">Delete</button>
                </div>
              </div>

              <div className="border border-[#22C55E] border-dashed rounded-xl h-40 flex flex-col justify-center items-center text-center px-4">
                <span className="text-[#22C55E] text-3xl mb-2">⬆</span>
                <p className="text-sm text-gray-300">
                  Click to upload or drag and drop
                  <br />
                  SVG, PNG, JPG or GIF
                  <br />
                  (max, 800×400px)
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-[#1E3A4B] flex justify-between items-center">
              <div>
                <div className="flex justify-between">

                <h4 className="text-lg font-semibold mb-1">Google</h4>
                <button className="px-4 py-2 rounded-md bg-lemon text-black font-semibold">
                Connected
              </button>
                </div>
                <p className="text-sm text-gray-300">
                  Use Google to sign in to your account. Click here to learn
                  more.
                </p>
              </div>
              
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
