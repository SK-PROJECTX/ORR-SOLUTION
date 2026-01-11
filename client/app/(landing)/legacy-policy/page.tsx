'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

interface PolicyItem {
	id: number;
	number: string;
	description: string;
	order: number;
	is_active: boolean;
}

interface LegalPolicyPageData {
	id: number;
	hero_title: string;
	hero_description: string;
	meta_title?: string;
	meta_description?: string;
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
				console.log('🔄 Fetching Legal Policy data from backend...');
				const response = await axios.get('https://orr-backend-web-latest.onrender.com/admin-portal/v1/cms/legal-policy-content/');
				console.log('✅ Legal Policy API Response:', response.data);
				if (response.data.success) {
					console.log('📊 Legal Policy Data Structure:', {
						page: response.data.data.page,
						items: response.data.data.items.length + ' policy items'
					});
					setData(response.data.data);
				}
			} catch (error) {
				console.error('❌ Error fetching Legal Policy data:', error);
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
			const text = title.textContent;
			title.innerHTML = text!.split('').map((char, i) => 
				`<span style="display:inline-block;opacity:0">${char === ' ' ? '&nbsp;' : char}</span>`
			).join('');
			
			gsap.to(title.children, {
				opacity: 1,
				y: 0,
				duration: 0.05,
				stagger: 0.03,
				ease: "power2.out"
			});
		}

		gsap.fromTo(descRef.current,
			{ opacity: 0, y: 30 },
			{ opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
		);

		gsap.fromTo(cardRef.current,
			{ opacity: 0, scale: 0.9, rotateX: 15 },
			{ opacity: 1, scale: 1, rotateX: 0, duration: 1.2, ease: "power4.out",
				scrollTrigger: { trigger: cardRef.current, start: "top 80%", toggleActions: "play none none reverse" }
			}
		);

		itemsRef.current.forEach((item, i) => {
			if (item) {
				const number = item.querySelector('.policy-number');
				const text = item.querySelector('.policy-text');

				gsap.fromTo(number,
					{ opacity: 0, scale: 0, rotate: -180 },
					{ opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)",
						scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
					}
				);

				if (text) {
					const words = text.textContent!.split(' ');
					text.innerHTML = words.map(word => `<span style="display:inline-block;opacity:0">${word}&nbsp;</span>`).join('');
					
					gsap.to(text.children, {
						opacity: 1,
						y: 0,
						duration: 0.5,
						stagger: 0.02,
						delay: 0.3,
						ease: "power2.out",
						scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
					});
				}
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

	return (
		<div className="min-h-screen text-foreground star">
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 ref={titleRef} className="text-5xl font-bold mb-8 text-white">
						{data.page.hero_title || 'Legacy & Policy'}
					</h1>
					<p ref={descRef} className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						{data.page.hero_description || 'Loading policy information...'}
					</p>
				</div>
			</section>

			<section className="pb-16 px-6">
				<div className="max-w-4xl mx-auto">
					<div ref={cardRef} className="bg-card p-4 backdrop-blur-lg relative overflow-hidden rounded-2xl ">
						<Image
							src="/bgSvg.svg"
							alt="background"
							width={1500}
							height={1500}
							className="absolute top-1/2 left-1/2 scale-200 -translate-x-1/2 -translate-y-1/2 rotate-20 opacity-50"
						/>
						
						<div className="bg-card rounded-2xl p-4 relative">
							{data.items.map((item, index) => (
								<div key={item.id} ref={el => { itemsRef.current[index] = el; }} className={`flex gap-6 ${index < data.items.length - 1 ? 'mb-12' : 'pb-8'}`}>
									<div className="policy-number text-6xl font-bold text-primary shrink-0">
										{item.number}
									</div>
									<div className="flex-1 min-w-0">
										<p className="policy-text text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
											{item.description}
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
