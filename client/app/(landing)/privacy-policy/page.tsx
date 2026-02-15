"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const numberAnimation = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
} as const;

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-foreground star">
      <section className="pt-32 pb-16 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-8 text-white">Privacy Policy</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This Privacy Policy explains how we collect, use, store, and protect
            your personal data when you access the ORR Client Portal, Admin
            Portal, or any ORR-associated digital service.
          </p>
        </motion.div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-card p-4 backdrop-blur-lg relative overflow-hidden rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-200px" }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/bgSvg.svg"
              alt="background"
              width={1500}
              height={1500}
              className="absolute top-1/2 left-1/2 scale-200 -translate-x-1/2 -translate-y-1/2 rotate-20 opacity-50"
            />

            <div className="bg-card rounded-2xl p-4 relative">
              {/* Section 1: Introduction */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  01
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    INTRODUCTION
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    ORR Network (&quot;ORR&quot;, &quot;we&quot;,
                    &quot;us&quot;) operates a digital platform that provides
                    strategic consultation services, personalised business
                    workspaces, document generation, Data Structure (DS)
                    modules, and associated administrative functions. This
                    Privacy Policy explains how we collect, use, store, and
                    protect your personal data when you access the ORR Client
                    Portal, Admin Portal, or any ORR-associated digital service.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-semibold">
                    By using our platform, you acknowledge that you have read
                    and understood this Privacy Policy.
                  </p>
                </div>
              </motion.div>

              {/* Section 2: Who We Are */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  02
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    WHO WE ARE
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    ORR Network is a consultancy and digital systems operator
                    delivering:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-3">
                    <li>Online business consultations</li>
                    <li>Personalised DS-driven workspaces</li>
                    <li>Document vault and report generation</li>
                    <li>Behaviour-based insights</li>
                    <li>Subscription and retainer-based services</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    For all data processed directly through the platform, ORR is
                    the Data Controller under the GDPR.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    You may contact us at:{" "}
                    <span className="text-[#13BE77]">
                      privacy@orr.solutions
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* Section 3: Data We Collect */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  03
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    DATA WE COLLECT
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We collect only the data required to provide our services.
                    Depending on your engagement with the platform, ORR may
                    process the following categories:
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    3.1 Account & Identity Data
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number (optional)</li>
                    <li>Country of residence / jurisdiction</li>
                    <li>Preferred language</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">
                    Used for: authentication, communication, and account
                    identification.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    3.2 Business & Profile Data
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>Business name</li>
                    <li>Sector and subsector</li>
                    <li>Business stage</li>
                    <li>Business description</li>
                    <li>DS-required structured data fields</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">
                    Used for: DS personalisation, consultations, workspace
                    tools.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    3.3 Consultation Data
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>Meeting bookings</li>
                    <li>Consultation notes</li>
                    <li>
                      Transcriptions (only with your consent or explicit
                      initiation)
                    </li>
                    <li>Follow-up documentation</li>
                    <li>Uploaded materials</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">
                    Used for: generating consultation summaries, reports, and
                    improvement recommendations.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    3.4 Financial & Billing Data
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>Wallet balance</li>
                    <li>Transaction logs</li>
                    <li>Deposit confirmations</li>
                    <li>Subscription status</li>
                    <li>Approvals of pro-rata deductions</li>
                    <li>Invoice records</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">
                    Used for: billing, accounting, audit, and contractual
                    obligations.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    3.5 Behavioural Data
                  </h3>
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
                    Used for: personalisation, recommended tools, content
                    surfacing, and UI optimisation.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6 font-semibold">
                    We do not use third-party tracking (Google Ads, Facebook
                    pixels, etc.).
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    3.6 System & Technical Data
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>IP address</li>
                    <li>Device/browser information</li>
                    <li>Login timestamps</li>
                    <li>Error logs</li>
                    <li>System performance events</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed italic">
                    Used for: security, fraud prevention, and operational
                    monitoring.
                  </p>
                </div>
              </motion.div>

              {/* Section 4: How We Collect Data */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  04
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    HOW WE COLLECT DATA
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    We collect data through:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-4">
                    <li>Direct user input (forms, uploads, metadata entry)</li>
                    <li>
                      Consultation interactions (notes, outputs, statements)
                    </li>
                    <li>
                      System-generated data (logs, timestamps, billing events)
                    </li>
                    <li>Behavioural interpretation (within the portal only)</li>
                    <li>Subscription and billing events</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed font-semibold">
                    We do not buy external data.
                    <br />
                    We do not scrape data from other platforms.
                  </p>
                </div>
              </motion.div>

              {/* Section 5: Why We Process Data */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  05
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    WHY WE PROCESS DATA (PURPOSES)
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We process data only for legitimate and clearly defined
                    purposes:
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.1 Service Delivery
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>Account creation</li>
                    <li>Consultations</li>
                    <li>DS-powered workspace tools</li>
                    <li>Report generation</li>
                    <li>Document vault access</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.2 Personalisation
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>Behaviour-driven recommendations</li>
                    <li>Suggested tools and templates</li>
                    <li>Contextual dashboard insights</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.3 Contractual Performance
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>Retainer administration</li>
                    <li>Meeting scheduling</li>
                    <li>Report creation</li>
                    <li>Subscription operations</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.4 Administrative Operations
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>Billing and payment approvals</li>
                    <li>Wallet management</li>
                    <li>Support ticketing</li>
                    <li>System notifications</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.5 Legal Compliance
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>Tax and accounting requirements</li>
                    <li>Security obligations</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    5.6 Legitimate Interests
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
                    <li>Service improvement</li>
                    <li>Platform analytics</li>
                    <li>Preventing fraud or misuse</li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 6: Legal Basis */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  06
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    LEGAL BASIS FOR PROCESSING
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We rely on:
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    6.1 Contract Necessity
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    When processing is required to deliver the services you
                    request.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    6.2 Legitimate Interests
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">For:</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>Platform optimisation</li>
                    <li>Internal analytics</li>
                    <li>Non-intrusive behaviour tracking</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">
                    Always balanced with your privacy rights.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    6.3 Consent
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">For:</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-6">
                    <li>Cookies</li>
                    <li>Optional behaviour-based personalisation</li>
                    <li>Meeting recordings/transcriptions (if used)</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    6.4 Legal Obligation
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-2">For:</p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
                    <li>Invoice retention</li>
                    <li>Accounting compliance</li>
                    <li>Security event logging</li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 7: Data Retention */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  07
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    DATA RETENTION
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Revised to align with GDPR minimisation principles.
                  </p>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse border border-gray-600">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">
                            Data Category
                          </th>
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">
                            Retention Period
                          </th>
                          <th className="border border-gray-600 px-4 py-2 text-left text-white">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Consultation Reports
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            5 years
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            No fixed legal requirement; 5 years covers dispute
                            windows.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Behavioural Data
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            12 months
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Longer storage unnecessary for personalisation.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            System Logs
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            12–18 months
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Sufficient for operational and security audits.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Support Tickets
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            3 years
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Industry standard for SaaS operational records.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Uploaded Documents
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            24 months of inactivity or on request
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Unless required for financial/legal reasons.
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Financial Records (Invoices)
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            10 years
                          </td>
                          <td className="border border-gray-600 px-4 py-2 text-gray-300">
                            Mandatory EU accounting rule.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-gray-300 leading-relaxed font-semibold">
                    You may request deletion of any data not subject to legal or
                    contractual retention.
                  </p>
                </div>
              </motion.div>

              {/* Section 8: Data Sharing */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  08
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    DATA SHARING
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We share data only when necessary:
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    8.1 Internal Roles (Role-Based Access)
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>Operators: client support & consultation processing</li>
                    <li>
                      Administrators: billing, DS assignment, system management
                    </li>
                    <li>Super Admin: platform governance</li>
                    <li>Content Editors: content publishing only</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">
                    Access is strictly limited to required operational scope.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    8.2 External Processors (GDPR-Compliant)
                  </h3>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1 mb-2">
                    <li>Payment processors</li>
                    <li>Secure document storage</li>
                    <li>Analytics tools (internal, non-marketing)</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">
                    All third-party processors operate under a signed Data
                    Processing Agreement (DPA).
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    8.3 Legal Authorities
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Only when legally required.
                  </p>

                  <p className="text-gray-300 leading-relaxed font-semibold">
                    We never sell personal data.
                    <br />
                    We never share behavioural data with advertisers.
                  </p>
                </div>
              </motion.div>

              {/* Section 9: Security Measures */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  09
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    SECURITY MEASURES
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    We implement:
                  </p>
                  <ul className="list-disc ml-6 text-gray-300 leading-relaxed space-y-1">
                    <li>Role-based access control (RBAC)</li>
                    <li>Encrypted storage</li>
                    <li>Secure communication channels</li>
                    <li>Audit logs</li>
                    <li>System monitoring</li>
                    <li>
                      MFA (optional for clients, enforced for administrators)
                    </li>
                    <li>Regular access reviews</li>
                  </ul>
                </div>
              </motion.div>

              {/* Section 10: Your Rights */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  10
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    YOUR RIGHTS UNDER GDPR
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    You may exercise:
                  </p>
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
                    Contact:{" "}
                    <span className="text-[#13BE77]">
                      privacy@orr.solutions
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* Section 11: Cookies */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  11
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    COOKIES & ONLINE IDENTIFIERS
                  </h2>
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
              </motion.div>

              {/* Section 12: Automated Decision-Making */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  12
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    AUTOMATED DECISION-MAKING
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    ORR does not use automated decision-making that produces
                    legal or significant effects.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Behaviour-based insights in the dashboard are assistive
                    only.
                  </p>
                </div>
              </motion.div>

              {/* Section 13: International Data Transfers */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  13
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    INTERNATIONAL DATA TRANSFERS
                  </h2>
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
              </motion.div>

              {/* Section 14: Updates */}
              <motion.div
                className="flex gap-6 mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  14
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    UPDATES TO THIS POLICY
                  </h2>
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
              </motion.div>

              {/* Section 15: Contact */}
              <motion.div
                className="flex gap-6 pb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-200px" }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary shrink-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-200px" }}
                  variants={numberAnimation}
                >
                  15
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    CONTACT
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">ORR Network</strong>
                    <br />
                    <strong className="text-white">Website:</strong>{" "}
                    www.orr.solutions
                    <br />
                    <strong className="text-white">Email:</strong>{" "}
                    privacy@orr.solutions
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
