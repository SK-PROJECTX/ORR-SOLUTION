// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import axios from "axios";
// import Spinner from "../../../components/ui/Spinner";

// gsap.registerPlugin(ScrollTrigger);

// interface PolicyItem {
//   id: number;
//   number: string;
//   description: any;
//   order: number;
//   is_active: boolean;
// }

// interface LegalPolicyPageData {
//   id: number;
//   hero_title: any;
//   hero_description: any;
//   meta_title?: any;
//   meta_description?: any;
//   is_active: boolean;
// }

// interface LegalPolicyData {
//   page: LegalPolicyPageData;
//   items: PolicyItem[];
// }

// export default function LegacyPolicy() {
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const descRef = useRef(null);
//   const cardRef = useRef(null);
//   const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const [data, setData] = useState<LegalPolicyData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("🔄 Fetching Legal Policy data from backend...");
//         const response = await axios.get(
//           "https://orr-backend.orr.solutions/admin-portal/v1/cms/legal-policy-content/",
//         );
//         console.log("✅ Legal Policy API Response:", response.data);
//         if (response.data.success) {
//           console.log("📊 Legal Policy Data Structure:", {
//             page: response.data.data.page,
//             items: response.data.data.items,
//           });
//           console.log("📋 Policy Items:", response.data.data.items);
//           setData(response.data.data);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching Legal Policy data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (!data) return;

//     const title = titleRef.current;
//     if (title) {
//       const spans = title.querySelectorAll("span");
//       gsap.fromTo(
//         spans,
//         { opacity: 0, y: 20 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           stagger: 0.1,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: title,
//             start: "top 80%",
//             toggleActions: "play none none none",
//           },
//         },
//       );
//     }

//     gsap.fromTo(
//       descRef.current,
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" },
//     );

//     gsap.fromTo(
//       cardRef.current,
//       { opacity: 0, y: 30 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: cardRef.current,
//           start: "top 80%",
//           toggleActions: "play none none none",
//         },
//       },
//     );

//     itemsRef.current.forEach((item, i) => {
//       if (item) {
//         const number = item.querySelector(".policy-number");
//         const text = item.querySelector(".policy-text");

//         gsap.fromTo(
//           number,
//           { opacity: 0, scale: 0.8 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.5,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: item,
//               start: "top 85%",
//               toggleActions: "play none none none",
//             },
//           },
//         );

//         if (text) {
//           gsap.fromTo(
//             text,
//             { opacity: 0, x: -20 },
//             {
//               opacity: 1,
//               x: 0,
//               duration: 0.5,
//               delay: 0.1,
//               ease: "power2.out",
//               scrollTrigger: {
//                 trigger: item,
//                 start: "top 85%",
//                 toggleActions: "play none none none",
//               },
//             },
//           );
//         }
//       }
//     });
//   }, [data]);

//   if (loading) {
//     return <Spinner />;
//   }

//   if (!data || !data.items || data.items.length === 0) {
//     return (
//       <div className="min-h-screen text-foreground star flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl text-white mb-4">No Policy Items Found</h2>
//           <p className="text-gray-400">Please check back later.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen text-foreground star">
//       <section className="pt-32 pb-16 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 ref={titleRef} className="text-5xl font-bold mb-8 text-white">
//             <span
//               dangerouslySetInnerHTML={{
//                 __html: data.page.hero_title?.content || "Legacy & Policies ",
//               }}
//             />
//           </h1>
//           <p
//             ref={descRef}
//             className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
//           >
//             <span
//               dangerouslySetInnerHTML={{
//                 __html:
//                   data.page.hero_description?.content || "Loading policy information...",
//               }}
//             />
//           </p>
//         </div>
//       </section>

//       <section className="pb-16 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div
//             ref={cardRef}
//             className="bg-card p-4 backdrop-blur-lg relative overflow-hidden rounded-2xl"
//           >
//             <Image
//               src="/bgSvg.svg"
//               alt="background"
//               width={1500}
//               height={1500}
//               className="absolute top-1/2 left-1/2 scale-200 -translate-x-1/2 -translate-y-1/2 rotate-20 opacity-50"
//             />

//             <div className="bg-card rounded-2xl p-4 relative">
//               {data.items.map((item, index) => (
//                 <div
//                   key={item.id}
//                   ref={(el) => {
//                     itemsRef.current[index] = el;
//                   }}
//                   className={`flex gap-6 ${index < data.items.length - 1 ? "mb-12" : "pb-8"}`}
//                 >
//                   <div className="policy-number text-6xl font-bold text-primary shrink-0">
//                     <span dangerouslySetInnerHTML={{ __html: item.number }} />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="policy-text text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
//                       <span
//                         dangerouslySetInnerHTML={{
//                           __html: item.description?.content || "",
//                         }}
//                       />
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


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
				const content = item.querySelector('.policy-content');

				gsap.fromTo(number,
					{ opacity: 0, scale: 0, rotate: -180 },
					{ opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)",
						scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
					}
				);

				gsap.fromTo(content,
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out",
						scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
					}
				);
			}
		});
	}, []);

	return (
		// <div className="min-h-screen text-foreground star">
		// 	<section className="pt-32 pb-16 px-6">
		// 		<div className="max-w-4xl mx-auto text-center">
		// 			<h1 ref={titleRef} className="text-5xl font-bold mb-8 text-white">
		// 				<span dangerouslySetInnerHTML={{ __html: data.page.hero_title || 'Legacy & Policies ' }} />
		// 			</h1>
		// 			<p ref={descRef} className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
		// 				<span dangerouslySetInnerHTML={{ __html: data.page.hero_description || 'Loading policy information...' }} />
		// 			</p>
		// 		</div>
		// 	</section>

		// 	<section className="pb-16 px-6">
		// 		<div className="max-w-4xl mx-auto">
		// 			<div ref={cardRef} className="bg-card p-4 backdrop-blur-lg relative overflow-hidden rounded-2xl">
		// 				<Image
		// 					src="/bgSvg.svg"
		// 					alt="background"
		// 					width={1500}
		// 					height={1500}
		// 					className="absolute top-1/2 left-1/2 scale-200 -translate-x-1/2 -translate-y-1/2 rotate-20 opacity-50"
		// 				/>
						
		// 				<div className="bg-card rounded-2xl p-4 relative">
		// 					{data.items.map((item, index) => (
		// 						<div key={item.id} ref={el => { itemsRef.current[index] = el; }} className={`flex gap-6 ${index < data.items.length - 1 ? 'mb-12' : 'pb-8'}`}>
		// 							<div className="policy-number text-6xl font-bold text-primary shrink-0">
		// 								<span dangerouslySetInnerHTML={{ __html: item.number }} />
		// 							</div>
		// 							<div className="flex-1 min-w-0">
		// 								<p className="policy-text text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
		// 									<span dangerouslySetInnerHTML={{ __html: item.description || '' }} />
		// 								</p>
		// 							</div>
		// 						</div>
		// 					))}
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</section>
		// </div>


		<div className="min-h-screen text-foreground star">
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 ref={titleRef} className="text-5xl font-bold mb-8 text-white">
						Terms of Service
					</h1>
					<p ref={descRef} className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						These Terms of Service govern your access to and use of the ORR Network Platform, 
						including all services, consultations, and subscription features.
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
							{/* Section 1: Introduction */}
							<div ref={el => { itemsRef.current[0] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									01
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">INTRODUCTION</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										These Terms of Service ("Terms", "Agreement") govern your access to and use of the ORR Network Platform, including the Client Portal, Admin Portal, consultations, DS modules, Workspace tools, Document Vault, and subscription services (collectively, the "Services"), operated by ORR Network ("ORR", "we", "us", "our"). Certain advanced features, including DS modules, Workspace tools, and PM-led service delivery, are available only to subscribed clients.
									</p>
									<p className="text-gray-300 leading-relaxed mb-3">
										By creating an account or using any part of the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.
									</p>
									<p className="text-gray-300 leading-relaxed font-semibold">
										If you do not agree to these Terms, do not use the Platform.
									</p>
								</div>
							</div>
							{/* Section 2: Definitions */}
							<div ref={el => { itemsRef.current[1] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									02
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">DEFINITIONS</h2>
									<ul className="space-y-2 text-gray-300 leading-relaxed">
										<li><strong className="text-white">Account</strong> — your registered ORR user profile.</li>
										<li><strong className="text-white">Platform</strong> — the ORR Client Portal, Admin Portal, and associated digital services.</li>
										<li><strong className="text-white">Consultation</strong> — a booked session with ORR for business and strategic advisory.</li>
										<li><strong className="text-white">Workspace</strong> — personalised tools, DS modules, and resources, not available under free tier.</li>
										<li><strong className="text-white">DS (Data Structure)</strong> — a structured module configured for your business context.</li>
										<li><strong className="text-white">Document Vault</strong> — secure storage for reports, documents, and system-generated outputs.</li>
										<li><strong className="text-white">Subscription</strong> — ongoing retainer agreement granting access to Workspace and DS tools. Pricing is bespoke.</li>
										<li><strong className="text-white">Wallet</strong> — pre-funded credit system used for billing and consultations.</li>
										<li><strong className="text-white">Project Manager (PM)</strong> — the ORR-appointed professional responsible for scoping, designing, refining, and managing the client's DS and Workspace configuration.</li>
										<li><strong className="text-white">DS Discovery Stage</strong> — the structured information-gathering phase preceding DS design.</li>
										<li><strong className="text-white">Subscription Services</strong> — the package of PM-led DS services and Workspace access provided under a retainer.</li>
									</ul>
								</div>
							</div>

							{/* Section 3: Eligibility */}
							<div ref={el => { itemsRef.current[2] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									03
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">ELIGIBILITY</h2>
									<p className="text-gray-300 leading-relaxed mb-3">To use the Platform, you must:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>be at least 18 years old;</li>
										<li>provide accurate registration information;</li>
										<li>have the legal authority to enter into this agreement;</li>
										<li>comply with all applicable laws in your jurisdiction.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-3">
										Subscriptions are offered only after ORR determines project suitability.
									</p>
									<p className="text-gray-300 leading-relaxed">
										ORR may refuse service or terminate accounts that violate these requirements.
									</p>
								</div>
							</div>

							{/* Section 4: Account Creation */}
							<div ref={el => { itemsRef.current[3] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									04
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">ACCOUNT CREATION AND SECURITY</h2>
									<p className="text-gray-300 leading-relaxed mb-3">You agree to:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>provide complete and accurate information;</li>
										<li>keep your login credentials confidential;</li>
										<li>notify ORR immediately of any unauthorised access;</li>
										<li>bear responsibility for all activities conducted under your account.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										ORR is not liable for damages caused by negligence in securing your account.
									</p>
								</div>
							</div>

							{/* Section 5: Description of Services */}
							<div ref={el => { itemsRef.current[4] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									05
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">DESCRIPTION OF SERVICES AND ACCESS LEVELS</h2>
									
									<h3 className="text-xl font-semibold text-white mb-3">5.1 General Description</h3>
									<p className="text-gray-300 leading-relaxed mb-4">
										The ORR Platform provides digital tools, consultations, Data Structure (DS) modules, personalised Workspace features, document automation, and support services designed to assist users in structuring and developing their business operations. The Platform consists of multiple functional areas including the Dashboard, Profile management, Consultations, Document Vault, Notifications, Support, and (for subscribed users) Workspace and DS modules.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">5.2 Free Access Tier</h3>
									<p className="text-gray-300 leading-relaxed mb-2">ORR offers a free basic access tier, which allows users to:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>create and maintain an account;</li>
										<li>browse general platform pages;</li>
										<li>receive system notifications;</li>
										<li>update personal and business profile information;</li>
										<li>upload a limited number of documents;</li>
										<li>request consultations;</li>
										<li>fund and manage their Wallet;</li>
										<li>access the Document Vault for their consultation outputs.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										The free tier does not require payment, does not activate Workspace, and does not provide access to DS modules.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">5.3 Limitations of the Free Tier</h3>
									<p className="text-gray-300 leading-relaxed mb-2">Users on the free tier do not have access to:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>Workspace</li>
										<li>DS modules</li>
										<li>personalised templates</li>
										<li>project blocks</li>
										<li>resource packs</li>
										<li>AI-driven recommendations</li>
										<li>ongoing operational or strategic advisory</li>
										<li>system-generated business insights</li>
										<li>premium content or industry-specific tools</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										These features require an active subscription or retainer agreement with ORR. Free-tier users may request consultations, but reports, outputs, and functionality are limited compared to subscribed users.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">5.4 Consultations</h3>
									<p className="text-gray-300 leading-relaxed mb-2">Consultations may be requested by free-tier or subscribed users; however:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>consultations require Wallet pre-funding;</li>
										<li>ORR may require minimum funding before confirming a meeting;</li>
										<li>consultation outputs may vary based on engagement level;</li>
										<li>consultations do not automatically activate Workspace or a subscription.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										Consultation charges are applied only after client approval through the Wallet billing process.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">5.5 Subscription and Workspace Access</h3>
									<p className="text-gray-300 leading-relaxed mb-2">
										Access to ORR's premium services — including Workspace, DS modules, personalised resource packs, project blocks, and full advisory capabilities — requires:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>Acceptance of a customised fee proposal provided by ORR;</li>
										<li>Payment of the initial portal configuration fee;</li>
										<li>Activation of an ongoing monthly or annual subscription or retainer.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										Subscription pricing is not displayed publicly in the Platform, as it varies based on project complexity, operational intensity, and the scope of DS modules required.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">5.6 DS (Data Structure) Design, Assignment and Implementation</h3>
									
									<h4 className="text-lg font-semibold text-white mb-2 mt-4">5.6.1 Appointment of Project Manager</h4>
									<p className="text-gray-300 leading-relaxed mb-4">
										Upon subscription activation, ORR assigns a Project Manager ("PM") who becomes the primary point of contact for the design, configuration, and implementation of the client's personalised Data Structure ("DS"). The PM coordinates the technical, operational, and advisory aspects required for DS creation and ongoing refinement.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.2 DS Discovery and Scoping Process</h4>
									<p className="text-gray-300 leading-relaxed mb-2">
										Before any DS module is deployed, the PM will conduct one or more scoping meetings with the client to gather sufficient detail regarding:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>current business processes</li>
										<li>operational challenges</li>
										<li>system needs and constraints</li>
										<li>regulatory or industry requirements</li>
										<li>document workflows</li>
										<li>automation opportunities</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										The client agrees to participate actively and to provide all necessary information. This stage is a mandatory prerequisite to DS design and subscription delivery.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.3 Use of AI, LLMs, and Automated Systems in DS Design</h4>
									<p className="text-gray-300 leading-relaxed mb-2">
										The client acknowledges and agrees that DS design may incorporate:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>large language models (LLMs)</li>
										<li>AI agents</li>
										<li>automated reasoning engines</li>
										<li>process-mapping tools</li>
										<li>predictive or recommendation systems</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										These components are used to structure the DS, automate workflows, and support advisory outputs. AI components do not replace ORR's human oversight; final DS decisions remain under PM and ORR control.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.4 Involvement of Additional ORR Professionals</h4>
									<p className="text-gray-300 leading-relaxed mb-2">
										If the PM identifies the need for specialised expertise to solve specific problems (e.g., compliance, marketing, operations, finance, strategic modelling, technical architecture), ORR may involve internal or external professionals. Such involvement may occur through:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>additional meetings</li>
										<li>technical assessments</li>
										<li>written reports</li>
										<li>workflow reviews</li>
										<li>collaborative scoping sessions</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										ORR will notify the client when additional expertise is brought into the project.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.5 Purpose of DS Implementation</h4>
									<p className="text-gray-300 leading-relaxed mb-2">The objective of the DS is to:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>define, structure, and document the client's operational model</li>
										<li>address the client's immediate business challenges</li>
										<li>create clarity around processes and decision points</li>
										<li>prepare the foundation for digital automation</li>
										<li>support ongoing optimisation of business activities</li>
										<li>integrate with AI-based modules for future enhancements</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										The DS is not static and may evolve as the client's business grows or changes.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.6 Activation and Access</h4>
									<p className="text-gray-300 leading-relaxed mb-2">A DS becomes accessible to the client only after:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>completion of the initial scoping meetings;</li>
										<li>PM confirmation that sufficient data has been collected;</li>
										<li>ORR has configured the DS to a functional baseline;</li>
										<li>subscription status remains active and in good standing.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										Clients cannot preview or use DS components until these conditions are met.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.7 Client Responsibilities</h4>
									<p className="text-gray-300 leading-relaxed mb-2">To enable DS creation and refinement, the client agrees to:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>provide accurate and complete information;</li>
										<li>participate in discovery meetings;</li>
										<li>review documents or prototypes when requested;</li>
										<li>identify business requirements in a timely manner;</li>
										<li>notify ORR of operational changes that affect DS logic.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										Failure to provide required information may delay DS activation or affect quality.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.8 ORR Responsibilities</h4>
									<p className="text-gray-300 leading-relaxed mb-2">ORR agrees to:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>provide reasonable skill and care in DS design;</li>
										<li>maintain oversight of all AI/LLM-generated content;</li>
										<li>ensure DS modules remain aligned with agreed scope;</li>
										<li>refine DS logic as the subscription continues;</li>
										<li>update DS modules when required to address new problems or operational needs.</li>
									</ul>

									<h4 className="text-lg font-semibold text-white mb-2 mt-4">5.6.9 Evolution and Optimisation of the DS</h4>
									<p className="text-gray-300 leading-relaxed mb-2">After initial deployment, the DS enters an optimisation phase wherein the PM:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>monitors operational bottlenecks,</li>
										<li>refines workflows,</li>
										<li>enhances DS tools,</li>
										<li>incorporates client feedback,</li>
										<li>integrates additional automation or AI components when appropriate.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										This process is continuous throughout the subscription.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.10 Ownership and Intellectual Property</h4>
									<p className="text-gray-300 leading-relaxed mb-3">
										All DS modules, workflows, logic, tools, templates, and AI-generated structures remain the sole intellectual property of ORR. The client receives a limited licence to use the DS for internal business purposes during the term of their subscription.
									</p>

									<h4 className="text-lg font-semibold text-white mb-2">5.6.11 No Guarantee of Outcomes</h4>
									<p className="text-gray-300 leading-relaxed mb-4">
										ORR does not guarantee specific financial, operational, or business results arising from DS design, AI usage, consultancy, or optimisation processes. All services are advisory and operational-support in nature.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">5.7 Platform Modifications</h3>
									<p className="text-gray-300 leading-relaxed mb-2">ORR may modify:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>available free-tier functionality,</li>
										<li>subscription features,</li>
										<li>DS modules,</li>
										<li>Workspace tools,</li>
										<li>system interfaces,</li>
										<li>usage limitations,</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										...at any time, provided that subscribed users receive reasonable notice of changes affecting their paid services.
									</p>
								</div>
							</div>

							{/* Section 6: Payment Terms */}
							<div ref={el => { itemsRef.current[5] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									06
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">PAYMENT TERMS</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										Use of the ORR Platform is free at the basic access level.
									</p>
									<p className="text-gray-300 leading-relaxed mb-2">
										Fees apply only when the user chooses to:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>fund the Wallet to access consultations, or</li>
										<li>enter into a paid subscription/retainer agreement for Workspace and DS modules.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										Subscription prices are not displayed publicly on the Platform and are provided privately based on project complexity.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">6.1 Pricing Model</h3>
									<p className="text-gray-300 leading-relaxed mb-2">
										ORR does not display subscription or retainer pricing on the Platform. All pricing for subscription services, Workspace access, DS module deployment, and ongoing advisory services is determined individually, based on:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>the complexity of the client's business,</li>
										<li>the scope of DS modules required,</li>
										<li>the expected operational workload,</li>
										<li>the strategic depth of ORR's involvement.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4">
										Each client receives a custom proposal, which must be accepted before subscription activation.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">6.2 Wallet Funding for Consultations</h3>
									<p className="text-gray-300 leading-relaxed mb-3">
										Certain services, such as consultations, operate through Wallet pre-funding. An initial deposit of €45 is required before the first consultation to cover the first hour.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">6.3 Subscription Activation</h3>
									<p className="text-gray-300 leading-relaxed mb-2">Subscription access (Workspace + DS modules) activates only after:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>Client accepts the customised pricing proposal</li>
										<li>Client pays the initial portal configuration fee</li>
										<li>Monthly retainer begins as agreed privately</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">6.4 Billing Visibility</h3>
									<p className="text-gray-300 leading-relaxed mb-2">The Platform may show:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>subscription status</li>
										<li>next billing date</li>
										<li>paid invoices</li>
										<li>Wallet balance</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-4 font-semibold">
										BUT it will not show subscription prices.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">6.5 Refunds</h3>
									<p className="text-gray-300 leading-relaxed">
										Fees for customised subscription services and consultations are non-refundable except where required by law.
									</p>
								</div>
							</div>

							{/* Section 7: User Responsibilities */}
							<div ref={el => { itemsRef.current[6] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									07
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">USER RESPONSIBILITIES</h2>
									<p className="text-gray-300 leading-relaxed mb-3">You agree to:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>use the Platform lawfully;</li>
										<li>not misuse tools or DS modules;</li>
										<li>provide accurate information;</li>
										<li>maintain confidentiality of sensitive data;</li>
										<li>not attempt to reverse-engineer the Platform;</li>
										<li>not provide false claims or fraudulent documents;</li>
										<li>participate in DS discovery meetings when subscribing;</li>
										<li>provide timely and accurate information necessary for DS design;</li>
										<li>not attempt to access DS modules or Workspace features without an active subscription.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										ORR reserves the right to suspend accounts for violations.
									</p>
								</div>
							</div>

							{/* Section 8: ORR Responsibilities */}
							<div ref={el => { itemsRef.current[7] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									08
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">ORR RESPONSIBILITIES</h2>
									<p className="text-gray-300 leading-relaxed mb-3">ORR will:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
										<li>provide Services with reasonable skill and care;</li>
										<li>maintain system uptime except during planned maintenance;</li>
										<li>protect your data under GDPR and EU law;</li>
										<li>safeguard your documents in secure storage;</li>
										<li>maintain role-based access controls for internal staff;</li>
										<li>assign a Project Manager to subscribed clients and will provide reasonable skill and care in the design and maintenance of the DS;</li>
										<li>maintain human oversight over any AI or LLM components used in DS design.</li>
									</ul>
								</div>
							</div>

							{/* Section 9: Workspace & DS Module Conditions */}
							<div ref={el => { itemsRef.current[8] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									09
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">WORKSPACE & DS MODULE CONDITIONS</h2>
									
									<h3 className="text-xl font-semibold text-white mb-3">9.1 Activation</h3>
									<p className="text-gray-300 leading-relaxed mb-2">Workspace access requires:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>active subscription</li>
										<li>payment of initial portal configuration fee</li>
										<li>assignment of at least one DS module</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">9.2 DS Modifications</h3>
									<p className="text-gray-300 leading-relaxed mb-2">Once assigned:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>DS modules cannot be removed without admin approval</li>
										<li>DS updates may require configuration time</li>
										<li>DS versions may evolve over time, with notice provided</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">9.3 Workspace Outputs</h3>
									<p className="text-gray-300 leading-relaxed">
										Documents created in Workspace are automatically saved in the Document Vault. ORR is not responsible for loss due to user deletion or incorrect inputs.
									</p>
								</div>
							</div>

							{/* Section 10: Consultation Terms */}
							<div ref={el => { itemsRef.current[9] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									10
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">CONSULTATION TERMS</h2>
									
									<h3 className="text-xl font-semibold text-white mb-3">10.1 Scheduling</h3>
									<p className="text-gray-300 leading-relaxed mb-4">
										Bookings are subject to availability.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">10.2 Cancellations</h3>
									<p className="text-gray-300 leading-relaxed mb-4">
										Cancellations within the permitted window (as displayed) may be rescheduled.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">10.3 Accuracy</h3>
									<p className="text-gray-300 leading-relaxed mb-4">
										Consultation outcomes rely partly on the accuracy of information you provide.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">10.4 Transcriptions</h3>
									<p className="text-gray-300 leading-relaxed">
										Transcriptions are used only for data enrichment and only with user consent.
									</p>
								</div>
							</div>

							{/* Section 11: Intellectual Property */}
							<div ref={el => { itemsRef.current[10] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									11
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">INTELLECTUAL PROPERTY</h2>
									
									<h3 className="text-xl font-semibold text-white mb-3">11.1 ORR IP</h3>
									<p className="text-gray-300 leading-relaxed mb-4">
										All Platform content, DS modules, tools, templates, systems, and reports remain the exclusive intellectual property of ORR.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">11.2 User License</h3>
									<p className="text-gray-300 leading-relaxed mb-4">
										You are granted a non-exclusive, non-transferable license to use Platform tools for your internal business.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">11.3 Restrictions</h3>
									<p className="text-gray-300 leading-relaxed mb-2">You may not:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
										<li>copy</li>
										<li>distribute</li>
										<li>resell</li>
										<li>reverse engineer</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mt-2">
										any ORR systems or DS logic.
									</p>
								</div>
							</div>

							{/* Section 12: Document Vault */}
							<div ref={el => { itemsRef.current[11] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									12
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">DOCUMENT VAULT</h2>
									<p className="text-gray-300 leading-relaxed mb-2">The Document Vault stores:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>reports</li>
										<li>invoices</li>
										<li>templates</li>
										<li>uploaded documents</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										ORR uses secure storage and versioning but cannot guarantee restoration of user-deleted files.
									</p>
								</div>
							</div>

							{/* Section 13: Termination */}
							<div ref={el => { itemsRef.current[12] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									13
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">TERMINATION</h2>
									<p className="text-gray-300 leading-relaxed mb-2">ORR may suspend or terminate access if:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>Terms are violated</li>
										<li>Billing fails repeatedly</li>
										<li>Fraudulent activity is detected</li>
										<li>Legal obligations require it</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										Users may terminate their subscription at any time through the billing section.
									</p>
								</div>
							</div>

							{/* Section 14: Limitation of Liability */}
							<div ref={el => { itemsRef.current[13] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									14
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">LIMITATION OF LIABILITY</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										To the maximum extent permitted by law:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>ORR is not liable for indirect damages, loss of profits, or loss of business opportunities.</li>
										<li>ORR's total liability for any claim is limited to the amount paid in the preceding 3 months.</li>
										<li>Consultation insights are advisory and not guaranteed outcomes.</li>
									</ul>
									<p className="text-gray-300 leading-relaxed font-semibold">
										Nothing excludes liability for fraud or gross negligence.
									</p>
								</div>
							</div>

							{/* Section 15: Data Protection */}
							<div ref={el => { itemsRef.current[14] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									15
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">DATA PROTECTION</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										Your use of the Platform is also governed by the ORR Privacy Policy and Cookie Policy.
									</p>
									<p className="text-gray-300 leading-relaxed">
										By using the Platform, you acknowledge these documents.
									</p>
								</div>
							</div>

							{/* Section 16: Governing Law */}
							<div ref={el => { itemsRef.current[15] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									16
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">GOVERNING LAW & JURISDICTION</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										These Terms are governed by the laws of Malta or the jurisdiction of ORR's corporate registration.
									</p>
									<p className="text-gray-300 leading-relaxed">
										Any disputes shall be resolved in the competent courts of that jurisdiction.
									</p>
								</div>
							</div>

							{/* Section 17: Changes to Terms */}
							<div ref={el => { itemsRef.current[16] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									17
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">CHANGES TO THESE TERMS</h2>
									<p className="text-gray-300 leading-relaxed mb-2">ORR may revise these Terms to reflect:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>legal updates</li>
										<li>platform improvements</li>
										<li>DS changes</li>
										<li>new modules or features</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										Major changes will be communicated through the Platform.
									</p>
								</div>
							</div>

							{/* Section 18: Contact */}
							<div ref={el => { itemsRef.current[17] = el; }} className="flex gap-6 pb-8">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									18
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">CONTACT</h2>
									<p className="text-gray-300 leading-relaxed">
										<strong className="text-white">ORR Network</strong><br />
										<strong className="text-white">Email:</strong> info@orr.solutions<br />
										<strong className="text-white">Website:</strong> www.orr.solutions
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