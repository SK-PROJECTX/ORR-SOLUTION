"use client";
import React, { useState, useEffect } from "react";
import { useProfileStore } from "@/store/profileStore";

interface Country {
  name: { common: string };
  cca2: string;
}

export default function AccountSettingsPage() {
  const { profile, isLoading, isEditing, updateProfile, setEditing, fetchProfile } = useProfileStore();
  const [formData, setFormData] = useState(profile);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchCountries();
  }, [fetchProfile]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
      const data = await response.json();
      const sortedCountries = data.sort((a: Country, b: Country) => 
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedCountries);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    } finally {
      setLoadingCountries(false);
    }
  };

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

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

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    
    // Show immediate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setFormData({...formData, profile_pic: preview});
    };
    reader.readAsDataURL(file);
    
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', 'ml_default');
      
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/djoahpirg/image/upload',
        {
          method: 'POST',
          body: formDataUpload
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }
      
      if (data.secure_url) {
        setFormData({...formData, profile_pic: data.secure_url});
      } else {
        throw new Error('Upload failed - no URL returned');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      alert(`Image upload failed: ${error}`);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-white px-12 py-8 flex flex-col items-center">
      <div className="w-full">
        <div className="flex justify-between max-w-6xl">
          <h1 className="text-3xl font-semibold text-primary mb-6">Account/Setting</h1>
          <div className="w-full flex justify-center mb-10">
            <div className="w-full max-w-xl relative">
              <input
                type="text"
                placeholder="Search anything here..."
                className="w-full bg-card border border-secondary rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">🔍</button>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Setting Details</h2>
            <p className="text-sm text-gray-300 mb-8">Update your photo and personal details here.</p>
          </div>
          <div className="gap-4">
            {isEditing ? (
              <>
                <button onClick={handleCancel} className="px-6 py-2 border border-gray-400 rounded-md mr-4">Cancel</button>
                <button onClick={handleSave} disabled={isLoading} className="px-6 py-2 bg-primary text-black rounded-md font-semibold disabled:opacity-50">
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className="px-6 py-2 bg-primary text-black rounded-md font-semibold">Edit</button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-8">
          <div className="bg-card p-6 rounded-xl border border-secondary flex-1">
            <h3 className="text-lg font-semibold mb-6">Personal information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">First Name</label>
                <input
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last Name</label>
                <input
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Username</label>
                <input
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  disabled={!isEditing || loadingCountries}
                  className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
                >
                  <option value="">{loadingCountries ? 'Loading countries...' : 'Select a country'}</option>
                  {countries.map((country) => (
                    <option key={country.cca2} value={country.name.common}>{country.name.common}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">City</label>
                <input
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Zip Code</label>
                <input
                  value={formData.zip_code}
                  onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
                  placeholder="Enter zip code"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <input
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                  disabled={!isEditing}
                  className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm mb-2">Bio</label>
              <textarea
                value={formData.bio_text}
                onChange={(e) => setFormData({...formData, bio_text: e.target.value})}
                disabled={!isEditing}
                className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground min-h-[100px]"
                placeholder="Write your bio..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm mb-2">Timezone</label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                disabled={!isEditing}
                className="w-full bg-card border border-primary rounded-md px-4 py-3 text-sm focus:outline-none disabled:opacity-50 text-foreground"
              >
                <option value="">Select timezone</option>
                <option value="UTC+00:00">UTC+00:00 (London, Dublin)</option>
                <option value="UTC+01:00">UTC+01:00 (Central European Time)</option>
                <option value="UTC+02:00">UTC+02:00 (Eastern European Time)</option>
                <option value="UTC-05:00">UTC-05:00 (Eastern Standard Time)</option>
                <option value="UTC-08:00">UTC-08:00 (Pacific Standard Time)</option>
              </select>
            </div>
          </div>

          <div className="w-full lg:w-80">
            <div className="bg-card p-6 rounded-xl border border-secondary">
              <h3 className="text-lg font-semibold mb-4">Your Photo</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-400">
                  {formData.profile_pic ? (
                    <img src={formData.profile_pic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-xl">
                      {formData.first_name?.[0] || 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm">Edit your photo</p>
                  {formData.profile_pic && (
                    <button 
                      onClick={() => setFormData({...formData, profile_pic: ''})}
                      disabled={!isEditing}
                      className="text-red-400 text-xs hover:text-red-300 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <div className="border border-primary border-dashed rounded-xl h-40 flex flex-col justify-center items-center text-center px-4 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  disabled={!isEditing || uploadingImage}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                {uploadingImage ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                ) : (
                  <>
                    <span className="text-primary text-3xl mb-2">⬆</span>
                    <p className="text-sm text-gray-300">
                      Click to upload or drag and drop<br />
                      SVG, PNG, JPG or GIF<br />
                      (max, 800×400px)
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}