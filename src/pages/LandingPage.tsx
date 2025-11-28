import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  Users,
  Shield,
  Mail,
  Workflow,
  BarChart3,
  ClipboardCheck,
  PlayCircle,
  ArrowRight,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiWechat } from "react-icons/si";

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showQR, setShowQR] = useState<number | null>(null);

  const features = [
    {
      icon: BookOpen,
      title: "Assignments Management",
      description:
        "Smart auto-suggestions, plagiarism checks, and intelligent grading insights.",
    },
    {
      icon: Users,
      title: "Personalized Dashboards",
      description:
        "Adaptive dashboards for every role with real-time updates and insights.",
    },
    {
      icon: Shield,
      title: "Enterprise-Level Security",
      description:
        "Advanced encryption, activity logs, and strong access control.",
    },
    {
      icon: Mail,
      title: "Automation & Notifications",
      description: "Automated reminders, email triggers, and workflow alerts.",
    },
  ];

  const workflowSteps = [
    {
      icon: Workflow,
      title: "Create Assignments",
      text: "Design structured, AI-enhanced assignments with rich formatting.",
    },
    {
      icon: ClipboardCheck,
      title: "Submit & Track",
      text: "Students upload seamlessly with auto-save & progress tracking.",
    },
    {
      icon: Users,
      title: "Review & Evaluate",
      text: "Smart review panels, inline annotations, and automated feedback.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      text: "Visual dashboards revealing trends, performance, and engagement.",
    },
  ];

  const faqs = [
    {
      question: "How secure is the platform?",
      answer:
        "We provide enterprise-grade security with encryption, activity logs, and access controls to keep your data safe.",
    },
    {
      question: "Can I customize dashboards?",
      answer:
        "Yes! Each user can customize their dashboard to display the most relevant insights and metrics.",
    },
    {
      question: "Does it support multiple institutions?",
      answer:
        "Absolutely, AssignPro is built to scale across multiple institutions with ease.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, you can start with our 14-day free trial to explore all features.",
    },
  ];

  const others = [
    {
      icon: PlayCircle,
      title: "Interactive Tutorials",
      description:
        "Step-by-step tutorials to get everyone up to speed quickly.",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Monitor student progress and engagement in real-time.",
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description:
        "Ensure GDPR, FERPA, and other compliance standards are met effortlessly.",
    },
  ];

  const teamMembers = [
    {
      name: "Samiun Mahmud",
      role: "Full Stack Developer",
      image: "/assets/pro.jpeg",
      wechatQR: "/assets/wechat-qr.png",
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 overflow-x-hidden">

      {/* HERO SECTION */}
      <motion.section className="pt-48 pb-32 text-center relative" style={{ y: yHero }}>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent leading-tight"
        >
          The Future of Assignment <br /> Management & Evaluation
        </motion.h1>
        <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-gray-600">
          A modern, AI-enhanced platform that helps institutions, teachers, and
          students achieve more with smart workflows, beautiful dashboards, and powerful automation.
        </p>
        <div className="mt-12 flex justify-center gap-6 flex-wrap">
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Start Free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/learn-more"
            className="px-8 py-4 border border-gray-300 rounded-full hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            <PlayCircle className="w-5 h-5" /> Demo
          </Link>
        </div>
      </motion.section>

      {/* STATS SECTION */}
      <section className="py-20 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-10">A Reputation Built on Excellence</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div>
            <p className="text-4xl font-bold text-gray-900">25+</p>
            <p className="text-gray-600">Years of Academic Excellence</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">15k+</p>
            <p className="text-gray-600">Students Enrolled</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">300+</p>
            <p className="text-gray-600">Faculty Members</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">50+</p>
            <p className="text-gray-600">Programs Offered</p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">Modern Features for Modern Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white shadow-md hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer"
              >
                <feature.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 mb-20"
        >
          <h2 className="text-5xl font-extrabold mb-4">Seamless Workflow</h2>
          <p className="max-w-3xl mx-auto opacity-90">
            Automate your entire assignment lifecycle with smooth, guided steps.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-6 z-10 space-y-20">
          {workflowSteps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}
            >
              <div className="w-full md:w-1/2">
                <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl hover:scale-[1.04] transition-transform">
                  <div className="flex items-center gap-4 mb-4">
                    <step.icon className="w-12 h-12 text-blue-300 drop-shadow" />
                    <h3 className="text-3xl font-bold">{step.title}</h3>
                  </div>
                  <p className="opacity-90 leading-relaxed">{step.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              >
                <h3 className="text-lg font-semibold flex justify-between items-center">
                  {faq.question}
                  <span className="text-xl">{openFAQ === idx ? "-" : "+"}</span>
                </h3>
                {openFAQ === idx && <p className="text-gray-600 mt-2">{faq.answer}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHERS SECTION */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">Additional Tools & Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {others.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-pointer"
              >
                <item.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      {/* TEAM SECTION */}
<section className="py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-14">Develop Full Stack</h2>
    <div className="flex justify-center gap-8 flex-wrap">
      {teamMembers.map((member, idx) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
          className="relative w-80 group cursor-pointer"
        >
          {/* Glassmorphic Card */}
          <div className="relative rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-2xl transition-transform hover:scale-105">
            
            {/* Team Image */}
            <div className="relative w-full h-96">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay Social Icons */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setShowQR(showQR === idx ? null : idx)}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 transition transform hover:scale-110"
                  title="WeChat"
                >
                  <SiWechat className="w-7 h-7 text-white" />
                </button>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800 transition transform hover:scale-110"
                  title="GitHub"
                >
                  <FaGithub className="w-7 h-7 text-white" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition transform hover:scale-110"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-7 h-7 text-white" />
                </a>
              </div>

              {/* QR Popup */}
              {showQR === idx && (
                <div
                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowQR(null)}
                >
                  <img
                    src={member.wechatQR}
                    alt="WeChat QR"
                    className="w-64 h-64 object-contain rounded-xl"
                  />
                </div>
              )}
            </div>

            {/* Name, Role & Website Button */}
            <div className="p-6 text-center bg-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{member.role}</p>
              <a
                href={member.website} // add website link in your teamMembers array
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition"
              >
                Take a Coffee
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>



      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-300 py-20 mt-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <img src="/assets/logo.png" alt="AssignPro Logo" className="w-28 h-auto mb-4 object-contain" />
            <p className="text-gray-400 text-sm leading-relaxed">
              A modern platform built to streamline assignment workflows, communication, and academic success across institutions.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">Features</li>
              <li className="hover:text-white transition cursor-pointer">Pricing</li>
              <li className="hover:text-white transition cursor-pointer">AI Tools</li>
              <li className="hover:text-white transition cursor-pointer">Updates</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">About Us</li>
              <li className="hover:text-white transition cursor-pointer">Careers</li>
              <li className="hover:text-white transition cursor-pointer">Blog</li>
              <li className="hover:text-white transition cursor-pointer">Partners</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">Help Center</li>
              <li className="hover:text-white transition cursor-pointer">Documentation</li>
              <li className="hover:text-white transition cursor-pointer">API Access</li>
              <li className="hover:text-white transition cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          © 2025 AssignPro — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
