'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


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

	useEffect(() => {

		const title = titleRef.current;
		if (title) {
			const spans = title.querySelectorAll('span');
			gsap.fromTo(spans,
				{ opacity: 0, y: -30, rotateX: -90 },
				{
					opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)",
					scrollTrigger: { trigger: title, start: "top 80%", toggleActions: "play none none none" }
				}
			);
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
				const content = item.querySelector('.policy-content');

				gsap.fromTo(number,
					{ opacity: 0, scale: 0, rotate: -180 },
					{ opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)",
						scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
					}
				);

				if (text) {
					gsap.fromTo(text,
						{ opacity: 0, x: -50, rotateZ: -5 },
						{
							opacity: 1, x: 0, rotateZ: 0, duration: 0.9, delay: 0.8, ease: "power3.out",
							scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
						}
					);
				}
			}
		});
	}, []);

	return (
		<div className="min-h-screen text-foreground star">
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 ref={titleRef} className="text-5xl font-bold mb-8 text-white">
						<span dangerouslySetInnerHTML={{ __html: data.page.hero_title || 'Legacy & Policies ' }} />
					</h1>
					<p ref={descRef} className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						<span dangerouslySetInnerHTML={{ __html: data.page.hero_description || 'Loading policy information...' }} />
					</p>
				</div>
			</section>

			<section className="pb-16 px-6">
				<div className="max-w-4xl mx-auto">
					<div ref={cardRef} className="bg-card p-4 backdrop-blur-lg relative overflow-hidden rounded-2xl">
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
											<span dangerouslySetInnerHTML={{ __html: item.description || '' }} />
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