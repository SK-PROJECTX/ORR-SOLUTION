"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import Spinner from "../../../components/ui/Spinner";

gsap.registerPlugin(ScrollTrigger);

interface PolicyItem {
  id: number;
  number: string;
  description: any;
  order: number;
  is_active: boolean;
}

interface LegalPolicyPageData {
  id: number;
  hero_title: any;
  hero_description: any;
  meta_title?: any;
  meta_description?: any;
  is_active: boolean;
}

interface LegalPolicyData {
  page: LegalPolicyPageData;
  items: PolicyItem[];
}

export default function LegacyPolicy() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [data, setData] = useState<LegalPolicyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔄 Fetching Legal Policy data from backend...");
        const response = await axios.get(
          "https://orr-backend.orr.solutions/admin-portal/v1/cms/legal-policy-content/",
        );
        console.log("✅ Legal Policy API Response:", response.data);
        if (response.data.success) {
          console.log("📊 Legal Policy Data Structure:", {
            page: response.data.data.page,
            items: response.data.data.items,
          });
          console.log("📋 Policy Items:", response.data.data.items);
          setData(response.data.data);
        }
      } catch (error) {
        console.error("❌ Error fetching Legal Policy data:", error);
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
      const spans = title.querySelectorAll("span");
      gsap.fromTo(
        spans,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" },
    );

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    itemsRef.current.forEach((item, i) => {
      if (item) {
        const number = item.querySelector(".policy-number");
        const text = item.querySelector(".policy-text");

        gsap.fromTo(
          number,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      }
    });
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="min-h-screen text-foreground star flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">No Policy Items Found</h2>
          <p className="text-gray-400">Please check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground star">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-5xl font-bold mb-8 text-white">
            <span
              dangerouslySetInnerHTML={{
                __html: data.page.hero_title?.content || "Legacy & Policies ",
              }}
            />
          </h1>
          <p
            ref={descRef}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            <span
              dangerouslySetInnerHTML={{
                __html:
                  data.page.hero_description?.content || "Loading policy information...",
              }}
            />
          </p>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            ref={cardRef}
            className="bg-card p-4 backdrop-blur-lg relative overflow-hidden rounded-2xl"
          >
            <Image
              src="/bgSvg.svg"
              alt="background"
              width={1500}
              height={1500}
              className="absolute top-1/2 left-1/2 scale-200 -translate-x-1/2 -translate-y-1/2 rotate-20 opacity-50"
            />

            <div className="bg-card rounded-2xl p-4 relative">
              {data.items.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className={`flex gap-6 ${index < data.items.length - 1 ? "mb-12" : "pb-8"}`}
                >
                  <div className="policy-number text-6xl font-bold text-primary shrink-0">
                    <span dangerouslySetInnerHTML={{ __html: item.number }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="policy-text text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.description?.content || "",
                        }}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
