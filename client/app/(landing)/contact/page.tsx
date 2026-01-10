'use client';

import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

interface ContactPageData {
  id: number;
  hero_title: string;
  contact_info_title: string;
  contact_info_subtitle: string;
  phone_number: string;
  email_address: string;
  address: string;
  first_name_label: string;
  last_name_label: string;
  email_label: string;
  phone_label: string;
  subject_label: string;
  message_label: string;
  first_name_placeholder: string;
  last_name_placeholder: string;
  email_placeholder: string;
  phone_placeholder: string;
  message_placeholder: string;
  subject_option_1: string;
  subject_option_2: string;
  subject_option_3: string;
  subject_option_4: string;
  submit_button_text: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
}

export default function Contact() {
  const titleRef = useRef(null);
  const infoCardRef = useRef(null);
  const formCardRef = useRef(null);
  const contactItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching Contact data from backend...');
        const response = await axios.get('http://127.0.0.1:8000/admin-portal/v1/cms/contact-content/');
        console.log('✅ Contact API Response:', response.data);
        if (response.data.success) {
          console.log('📊 Contact Data Structure:', response.data.data);
          setData(response.data.data);
        }
      } catch (error) {
        console.error('❌ Error fetching Contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const title = titleRef.current;
    if (title) {
      gsap.fromTo(title,
        { opacity: 0, y: -50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }

    gsap.fromTo(infoCardRef.current,
      { opacity: 0, x: -100, rotateY: -15 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: infoCardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      }
    );

    gsap.fromTo(formCardRef.current,
      { opacity: 0, x: 100, rotateY: 15 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: formCardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      }
    );

    contactItemsRef.current.forEach((item, i) => {
      if (item) {
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, delay: 0.3 + i * 0.15, ease: "back.out(1.7)",
            scrollTrigger: { trigger: infoCardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
          }
        );
      }
    });

    formFieldsRef.current.forEach((field, i) => {
      if (field) {
        gsap.fromTo(field,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.2 + i * 0.1, ease: "power2.out",
            scrollTrigger: { trigger: formCardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
          }
        );
      }
    });
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen text-foreground star flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen text-foreground star flex items-center justify-center">
        <div className="text-white text-xl">Error loading content</div>
      </div>
    );
  }

  const subjectOptions = [
    data.subject_option_1 || 'General Inquiry',
    data.subject_option_2 || 'General Inquiry',
    data.subject_option_3 || 'General Inquiry',
    data.subject_option_4 || 'General Inquiry'
  ];

  return (
    <div className="min-h-screen text-foreground star">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white">
            {data.hero_title?.split(' ').map((word, index) => (
              <span key={index} className={word === 'Us' ? 'text-primary' : 'text-white'}>
                {word}{' '}
              </span>
            )) || 'Contact Us'}
          </h1>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-card p-3 sm:p-4 rounded-2xl">
          {/* Contact Information Card - Left */}
          <div ref={infoCardRef} className="bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{data.contact_info_title || 'Contact Information'}</h2>
            <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base">
              {data.contact_info_subtitle || 'Say something to start a live chat!'}
            </p>

            {/* Phone */}
            <div ref={el => { contactItemsRef.current[0] = el; }} className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-base sm:text-lg">{data.phone_number || '+012 3456 789'}</p>
            </div>

            {/* Email */}
            <div ref={el => { contactItemsRef.current[1] = el; }} className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-base sm:text-lg">{data.email_address || 'demo@gmail.com'}</p>
            </div>

            {/* Address */}
            <div ref={el => { contactItemsRef.current[2] = el; }} className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="text-base sm:text-lg">
                {data.address || '132 Dartmouth Street Boston, Massachusetts 02156 United States'}
              </p>
            </div>
          </div>

          {/* Contact Form - Right */}
          <div ref={formCardRef} className="bg-card/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border-white/10">
            <form className="space-y-4 sm:space-y-6">
              {/* First Name and Last Name Row */}
              <div ref={el => { formFieldsRef.current[0] = el; }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    {data.first_name_label || 'First Name'}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder={data.first_name_placeholder || 'John'}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    {data.last_name_label || 'Last Name'}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder={data.last_name_placeholder || 'Doe'}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div ref={el => { formFieldsRef.current[1] = el; }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    {data.email_label || 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder={data.email_placeholder || 'your@email.com'}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-300 text-sm mb-2"
                  >
                    {data.phone_label || 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder={data.phone_placeholder || '+1 012 3456 789'}
                    className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2"
                  />
                </div>
              </div>

              {/* Select Subject */}
              <div ref={el => { formFieldsRef.current[2] = el; }}>
                <label className="block text-gray-300 text-sm mb-4">
                  {data.subject_label || 'Select Subject?'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {subjectOptions.map((subject, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="subject"
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-gray-300 text-sm">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div ref={el => { formFieldsRef.current[3] = el; }}>
                <label
                  htmlFor="message"
                  className="block text-gray-300 text-sm mb-2"
                >
                  {data.message_label || 'Message'}
                </label>
                <textarea
                  id="message"
                  placeholder={data.message_placeholder || 'Write your message...'}
                  rows={1}
                  className="w-full bg-transparent border-b border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors pb-2 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div ref={el => { formFieldsRef.current[4] = el; }} className="pt-4 flex justify-center sm:justify-end">
                <div className="relative inline-block">
                  <button
                    type="submit"
                    className="bg-gradient-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
                  >
                    {data.submit_button_text || 'Send Message'}
                  </button>
                  {/* Lucide-style send icon positioned overlapping the button */}
                  <Send className="absolute right-20 sm:right-28 -bottom-6 sm:-bottom-8 w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}