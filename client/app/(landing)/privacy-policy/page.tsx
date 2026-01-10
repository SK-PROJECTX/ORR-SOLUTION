'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
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
		<div className="min-h-screen text-foreground star">
			<section className="pt-32 pb-16 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<h1 ref={titleRef} className="text-5xl font-bold mb-8 text-white">
						Privacy Policy
					</h1>
					<p ref={descRef} className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						This Privacy Policy explains how we collect, use, store, and protect your personal data 
						when you access the ORR Client Portal, Admin Portal, or any ORR-associated digital service.
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
										ORR Network ("ORR", "we", "us") operates a digital platform that provides strategic consultation services, personalised business workspaces, document generation, Data Structure (DS) modules, and associated administrative functions. This Privacy Policy explains how we collect, use, store, and protect your personal data when you access the ORR Client Portal, Admin Portal, or any ORR-associated digital service.
									</p>
									<p className="text-gray-300 leading-relaxed font-semibold">
										By using our platform, you acknowledge that you have read and understood this Privacy Policy.
									</p>
								</div>
							</div>

							{/* Section 2: Who We Are */}
							<div ref={el => { itemsRef.current[1] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									02
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">WHO WE ARE</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										ORR Network is a consultancy and digital systems operator delivering:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
										<li>Online business consultations</li>
										<li>Personalised DS-driven workspaces</li>
										<li>Document vault and report generation</li>
										<li>Behaviour-based insights</li>
										<li>Subscription and retainer-based services</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-3">
										For all data processed directly through the platform, ORR is the Data Controller under the GDPR.
									</p>
									<p className="text-gray-300 leading-relaxed">
										You may contact us at: <span className="text-[#13BE77]">privacy@orr.solutions</span>
									</p>
								</div>
							</div>

							{/* Section 3: Data We Collect */}
							<div ref={el => { itemsRef.current[2] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									03
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">DATA WE COLLECT</h2>
									<p className="text-gray-300 leading-relaxed mb-4">
										We collect only the data required to provide our services. Depending on your engagement with the platform, ORR may process the following categories:
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">3.1 Account & Identity Data</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>Full name</li>
										<li>Email address</li>
										<li>Phone number (optional)</li>
										<li>Country of residence / jurisdiction</li>
										<li>Preferred language</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-6 italic">
										Used for: authentication, communication, and account identification.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">3.2 Business & Profile Data</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>Business name</li>
										<li>Sector and subsector</li>
										<li>Business stage</li>
										<li>Business description</li>
										<li>DS-required structured data fields</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-6 italic">
										Used for: DS personalisation, consultations, workspace tools.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">3.3 Consultation Data</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>Meeting bookings</li>
										<li>Consultation notes</li>
										<li>Transcriptions (only with your consent or explicit initiation)</li>
										<li>Follow-up documentation</li>
										<li>Uploaded materials</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-6 italic">
										Used for: generating consultation summaries, reports, and improvement recommendations.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">3.4 Financial & Billing Data</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>Wallet balance</li>
										<li>Transaction logs</li>
										<li>Deposit confirmations</li>
										<li>Subscription status</li>
										<li>Approvals of pro-rata deductions</li>
										<li>Invoice records</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-6 italic">
										Used for: billing, accounting, audit, and contractual obligations.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">3.5 Behavioural Data</h3>
									<p className="text-gray-300 leading-relaxed mb-2">
										Collected only inside the ORR platform:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>Pages and modules visited</li>
										<li>Time spent in sections</li>
										<li>Tools accessed</li>
										<li>Workspace actions</li>
										<li>Browsing patterns that inform domain interests</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-3 italic">
										Used for: personalisation, recommended tools, content surfacing, and UI optimisation.
									</p>
									<p className="text-gray-300 leading-relaxed mb-6 font-semibold">
										We do not use third-party tracking (Google Ads, Facebook pixels, etc.).
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">3.6 System & Technical Data</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>IP address</li>
										<li>Device/browser information</li>
										<li>Login timestamps</li>
										<li>Error logs</li>
										<li>System performance events</li>
									</ul>
									<p className="text-gray-300 leading-relaxed italic">
										Used for: security, fraud prevention, and operational monitoring.
									</p>
								</div>
							</div>

							{/* Section 4: How We Collect Data */}
							<div ref={el => { itemsRef.current[3] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									04
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">HOW WE COLLECT DATA</h2>
									<p className="text-gray-300 leading-relaxed mb-3">We collect data through:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>Direct user input (forms, uploads, metadata entry)</li>
										<li>Consultation interactions (notes, outputs, statements)</li>
										<li>System-generated data (logs, timestamps, billing events)</li>
										<li>Behavioural interpretation (within the portal only)</li>
										<li>Subscription and billing events</li>
									</ul>
									<p className="text-gray-300 leading-relaxed font-semibold">
										We do not buy external data.<br />
										We do not scrape data from other platforms.
									</p>
								</div>
							</div>

							{/* Section 5: Why We Process Data */}
							<div ref={el => { itemsRef.current[4] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									05
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">WHY WE PROCESS DATA (PURPOSES)</h2>
									<p className="text-gray-300 leading-relaxed mb-4">
										We process data only for legitimate and clearly defined purposes:
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">5.1 Service Delivery</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
										<li>Account creation</li>
										<li>Consultations</li>
										<li>DS-powered workspace tools</li>
										<li>Report generation</li>
										<li>Document vault access</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">5.2 Personalisation</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
										<li>Behaviour-driven recommendations</li>
										<li>Suggested tools and templates</li>
										<li>Contextual dashboard insights</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">5.3 Contractual Performance</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
										<li>Retainer administration</li>
										<li>Meeting scheduling</li>
										<li>Report creation</li>
										<li>Subscription operations</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">5.4 Administrative Operations</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
										<li>Billing and payment approvals</li>
										<li>Wallet management</li>
										<li>Support ticketing</li>
										<li>System notifications</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">5.5 Legal Compliance</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
										<li>Tax and accounting requirements</li>
										<li>Security obligations</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">5.6 Legitimate Interests</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
										<li>Service improvement</li>
										<li>Platform analytics</li>
										<li>Preventing fraud or misuse</li>
									</ul>
								</div>
							</div>

							{/* Section 6: Legal Basis */}
							<div ref={el => { itemsRef.current[5] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									06
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">LEGAL BASIS FOR PROCESSING</h2>
									<p className="text-gray-300 leading-relaxed mb-4">We rely on:</p>

									<h3 className="text-xl font-semibold text-white mb-3">6.1 Contract Necessity</h3>
									<p className="text-gray-300 leading-relaxed mb-6">
										When processing is required to deliver the services you request.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">6.2 Legitimate Interests</h3>
									<p className="text-gray-300 leading-relaxed mb-2">For:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>Platform optimisation</li>
										<li>Internal analytics</li>
										<li>Non-intrusive behaviour tracking</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-6 italic">
										Always balanced with your privacy rights.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">6.3 Consent</h3>
									<p className="text-gray-300 leading-relaxed mb-2">For:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
										<li>Cookies</li>
										<li>Optional behaviour-based personalisation</li>
										<li>Meeting recordings/transcriptions (if used)</li>
									</ul>

									<h3 className="text-xl font-semibold text-white mb-3">6.4 Legal Obligation</h3>
									<p className="text-gray-300 leading-relaxed mb-2">For:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
										<li>Invoice retention</li>
										<li>Accounting compliance</li>
										<li>Security event logging</li>
									</ul>
								</div>
							</div>

							{/* Section 7: Data Retention */}
							<div ref={el => { itemsRef.current[6] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									07
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">DATA RETENTION</h2>
									<p className="text-gray-300 leading-relaxed mb-4">
										Revised to align with GDPR minimisation principles.
									</p>

									<div className="overflow-x-auto mb-4">
										<table className="w-full border-collapse border border-gray-600">
											<thead>
												<tr className="bg-gray-800">
													<th className="border border-gray-600 px-4 py-2 text-left text-white">Data Category</th>
													<th className="border border-gray-600 px-4 py-2 text-left text-white">Retention Period</th>
													<th className="border border-gray-600 px-4 py-2 text-left text-white">Notes</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Consultation Reports</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">5 years</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">No fixed legal requirement; 5 years covers dispute windows.</td>
												</tr>
												<tr>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Behavioural Data</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">12 months</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Longer storage unnecessary for personalisation.</td>
												</tr>
												<tr>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">System Logs</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">12–18 months</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Sufficient for operational and security audits.</td>
												</tr>
												<tr>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Support Tickets</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">3 years</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Industry standard for SaaS operational records.</td>
												</tr>
												<tr>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Uploaded Documents</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">24 months of inactivity or on request</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Unless required for financial/legal reasons.</td>
												</tr>
												<tr>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Financial Records (Invoices)</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">10 years</td>
													<td className="border border-gray-600 px-4 py-2 text-gray-300">Mandatory EU accounting rule.</td>
												</tr>
											</tbody>
										</table>
									</div>

									<p className="text-gray-300 leading-relaxed font-semibold">
										You may request deletion of any data not subject to legal or contractual retention.
									</p>
								</div>
							</div>

							{/* Section 8: Data Sharing */}
							<div ref={el => { itemsRef.current[7] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									08
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">DATA SHARING</h2>
									<p className="text-gray-300 leading-relaxed mb-4">We share data only when necessary:</p>

									<h3 className="text-xl font-semibold text-white mb-3">8.1 Internal Roles (Role-Based Access)</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>Operators: client support & consultation processing</li>
										<li>Administrators: billing, DS assignment, system management</li>
										<li>Super Admin: platform governance</li>
										<li>Content Editors: content publishing only</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-6 italic">
										Access is strictly limited to required operational scope.
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">8.2 External Processors (GDPR-Compliant)</h3>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
										<li>Payment processors</li>
										<li>Secure document storage</li>
										<li>Analytics tools (internal, non-marketing)</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-6 italic">
										All third-party processors operate under a signed Data Processing Agreement (DPA).
									</p>

									<h3 className="text-xl font-semibold text-white mb-3">8.3 Legal Authorities</h3>
									<p className="text-gray-300 leading-relaxed mb-4">Only when legally required.</p>

									<p className="text-gray-300 leading-relaxed font-semibold">
										We never sell personal data.<br />
										We never share behavioural data with advertisers.
									</p>
								</div>
							</div>

							{/* Section 9: Security Measures */}
							<div ref={el => { itemsRef.current[8] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									09
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">SECURITY MEASURES</h2>
									<p className="text-gray-300 leading-relaxed mb-3">We implement:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
										<li>Role-based access control (RBAC)</li>
										<li>Encrypted storage</li>
										<li>Secure communication channels</li>
										<li>Audit logs</li>
										<li>System monitoring</li>
										<li>MFA (optional for clients, enforced for administrators)</li>
										<li>Regular access reviews</li>
									</ul>
								</div>
							</div>

							{/* Section 10: Your Rights */}
							<div ref={el => { itemsRef.current[9] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									10
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">YOUR RIGHTS UNDER GDPR</h2>
									<p className="text-gray-300 leading-relaxed mb-3">You may exercise:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>Right of Access</li>
										<li>Right to Rectification</li>
										<li>Right to Erasure</li>
										<li>Right to Restrict Processing</li>
										<li>Right to Data Portability</li>
										<li>Right to Object</li>
										<li>Right to Withdraw Consent</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										Contact: <span className="text-[#13BE77]">privacy@orr.solutions</span>
									</p>
								</div>
							</div>

							{/* Section 11: Cookies */}
							<div ref={el => { itemsRef.current[10] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									11
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">COOKIES & ONLINE IDENTIFIERS</h2>
									<p className="text-gray-300 leading-relaxed mb-3">We use:</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>Essential cookies (required for login and security)</li>
										<li>Preference cookies</li>
										<li>Platform analytics cookies (internal only)</li>
									</ul>
									<p className="text-gray-300 leading-relaxed mb-3 font-semibold">
										No advertising or cross-site tracking cookies are used.
									</p>
									<p className="text-gray-300 leading-relaxed">
										Users may decline non-essential cookies.
									</p>
								</div>
							</div>

							{/* Section 12: Automated Decision-Making */}
							<div ref={el => { itemsRef.current[11] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									12
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">AUTOMATED DECISION-MAKING</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										ORR does not use automated decision-making that produces legal or significant effects.
									</p>
									<p className="text-gray-300 leading-relaxed">
										Behaviour-based insights in the dashboard are assistive only.
									</p>
								</div>
							</div>

							{/* Section 13: International Data Transfers */}
							<div ref={el => { itemsRef.current[12] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									13
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">INTERNATIONAL DATA TRANSFERS</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										If data leaves the EEA, it is protected by:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>Adequacy decisions, or</li>
										<li>Standard Contractual Clauses (SCCs)</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										We ensure equivalent protection for all transfers.
									</p>
								</div>
							</div>

							{/* Section 14: Updates */}
							<div ref={el => { itemsRef.current[13] = el; }} className="flex gap-6 mb-12">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									14
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">UPDATES TO THIS POLICY</h2>
									<p className="text-gray-300 leading-relaxed mb-3">
										We may update this Privacy Policy to reflect:
									</p>
									<ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
										<li>Legal changes</li>
										<li>Platform changes</li>
										<li>New DS modules</li>
										<li>New services</li>
									</ul>
									<p className="text-gray-300 leading-relaxed">
										Major updates will be communicated within the portal.
									</p>
								</div>
							</div>

							{/* Section 15: Contact */}
							<div ref={el => { itemsRef.current[14] = el; }} className="flex gap-6 pb-8">
								<div className="policy-number text-6xl font-bold text-primary shrink-0">
									15
								</div>
								<div className="flex-1 min-w-0 policy-content">
									<h2 className="text-2xl font-bold text-white mb-4">CONTACT</h2>
									<p className="text-gray-300 leading-relaxed">
										<strong className="text-white">ORR Network</strong><br />
										<strong className="text-white">Website:</strong> www.orr.solutions<br />
										<strong className="text-white">Email:</strong> privacy@orr.solutions
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
