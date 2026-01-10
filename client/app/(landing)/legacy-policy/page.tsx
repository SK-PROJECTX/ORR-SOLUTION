'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LegacyPolicy() {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef(null);
	const cardRef = useRef(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
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
	}, []);

	return (
		<div className="min-h-screen text-foreground star">
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 ref={titleRef} className="text-5xl font-bold mb-8 text-white">
						Legacy & Policy
					</h1>
					<p ref={descRef} className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Lorem ipsm jgdu mplexity. From regulatory and sustainability
						frameworks to biotechnology and compliance consulting, our experts
						guide clients through evolving legal, scientific, and operational
						standards. Our approach combines deep technical insight with
						strategic foresight — ensuring every initiative is compliant,
						sustainable, and built for growth.
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
							<div ref={el => { itemsRef.current[0] = el; }} className="flex gap-6 mb-12 ">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									01
								</div>
								<div className="flex-1 min-w-0">
									<p className="policy-text text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
										Lorem ipsm jgdu mplexity. From regulatory and sustainability
										frameworks to biotechnology and compliance consulting, our
										experts guide clients through evolving legal, scientific,
										and operational standards. Our approach combines deep
										technical insight with strategic foresight — ensuring every
										initiative is compliant, sustainable, and built for growth.
									</p>
								</div>
							</div>

							<div ref={el => { itemsRef.current[1] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									02
								</div>
								<div className="flex-1 min-w-0">
									<p className="policy-text text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
										Lorem ipsm jgdu mplexity. From regulatory and sustainability
										frameworks to biotechnology and compliance consulting, our
										experts guide clients through evolving legal, scientific,
										and operational standards. Our approach combines deep
										technical insight with strategic foresight — ensuring every
										initiative is compliant, sustainable, and built for growth.
									</p>
								</div>
							</div>

							<div ref={el => { itemsRef.current[2] = el; }} className="flex gap-6 pb-8">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									03
								</div>
								<div className="flex-1 min-w-0">
									<p className="policy-text text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
										Lorem ipsm jgdu mplexity. From regulatory and sustainability
										frameworks to biotechnology and compliance consulting, our
										experts guide clients through evolving legal, scientific,
										and operational standards. Our approach combines deep
										technical insight with strategic foresight — ensuring every
										initiative is compliant, sustainable, and built for growth.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
