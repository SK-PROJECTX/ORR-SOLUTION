import React from "react";

export default function AccountSettingsPage() {
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
            <button className="px-6 py-2 border border-gray-400 rounded-md mr-4">
              Cancel
            </button>
            <button className="px-6 py-2 bg-[#22C55E] text-black rounded-md font-semibold">
              Save
            </button>
          </div>
        </div>
        {/* Page Title */}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Info Card */}
          <div className="col-span-2 bg-card p-6 rounded-xl border border-[#1E3A4B]">
            <h3 className="text-lg font-semibold mb-6">Personal information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Full Name", placeholder: "Enter first name" },
                { label: "Last Name", placeholder: "Enter last name" },
                { label: "Email Address", placeholder: "Enter email address" },
                { label: "Username", placeholder: "Enter user name" },
                { label: "Phone No", placeholder: "Enter phone no" },
                { label: "City", placeholder: "Enter your city" },
                { label: "Country Name", placeholder: "Enter country name" },
                { label: "Zip code", placeholder: "Enter zip code" },
              ].map((item) => (
                <div key={item.label}>
                  <label className="block text-sm mb-2">{item.label}</label>
                  <input
                    className="w-full  bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none"
                    placeholder={item.placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm mb-2">
                Bio(Write a short introduction)
              </label>
              <select className="w-full  bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none">
                <option>Normal text</option>
              </select>

              <p className="mt-4  bg-[rgb(var(--bg-card)_/_0.8)] text-gray-300 text-sm border border-[#1E3A4B] p-4 rounded-md">
                Lorem ipsum, in graphical and textual context, refers to filler
                text that is placed in a document or visual presentation. Lorem
                ipsum is derived from the Latin "dolorem ipsum" roughly
                translated as "pain itself."
              </p>
            </div>

            {/* Timezone */}
            <div className="mt-6">
              <label className="block text-sm mb-2">Timezone</label>
              <select className="w-full  bg-[rgb(var(--bg-card)_/_0.8)] border border-[#22C55E] rounded-md px-4 py-3 text-sm focus:outline-none">
                <option>Pacific Standard Time</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Photo Upload Card */}
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

            {/* Google Connect */}
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
        </div>
      </div>
    </div>
  );
}
