"use client";
import { useState } from 'react';
import { useToastStore } from '@/store/toastStore';

const categories = [
    "Technology",
    "Health",
    "Science",
    "Lifestyle",
    "Business",
    "Entertainment",
];

function page() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
  });
  const { addToast } = useToastStore();

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    const action = isDraft ? 'saved as draft' : 'published';
    addToast(`Post ${action} successfully!`, 'success');
    
    // Reset form
    setFormData({ title: '', content: '', category: '', tags: '' });
  };
  return (
    <div>
      <div className="min-h-screen text-white relative overflow-hidden star">
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

        <div className="relative z-10 p-8">
          <div className="bg-card backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-white">Add New Post</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-card p-3 rounded-lg text-foreground" 
                  placeholder="Enter Post Title" 
                  required
                />
                <textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-card p-3 rounded-lg text-foreground min-h-[200px]" 
                  placeholder="Enter Post Content" 
                  required
                />
                <h2 className="text-2xl font-semibold text-white">Categories</h2>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-fit bg-card p-3 rounded-lg text-foreground" 
                  name="categories" 
                  id="categories"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option className="text-black" key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <h2 className="text-2xl font-semibold text-white">Tags</h2>
                <input 
                  type="text" 
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="bg-card p-3 rounded-lg text-foreground" 
                  placeholder="Enter Tags (comma separated)" 
                />
                <h2 className="text-2xl font-semibold text-white">Featured Image</h2>
                <div className="border-4 border-dashed border-primary p-8 rounded-lg flex items-center justify-center text-center min-h-[30vh]">
                    <div>
                        <p className="font-semibold text-2xl">Set Featured Image</p>
                        <p>Choose an image to represent the post</p>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button 
                      type="button"
                      onClick={(e) => handleSubmit(e, true)}
                      className="ml-4 bg-secondary/20 p-3 rounded-xl text-foreground hover:bg-secondary/30 transition"
                    >
                      Save as Draft
                    </button>
                    <button 
                      type="submit"
                      className="bg-lemon p-3 rounded-xl text-black hover:bg-lemon/90 transition"
                    >
                      Publish Post
                    </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
