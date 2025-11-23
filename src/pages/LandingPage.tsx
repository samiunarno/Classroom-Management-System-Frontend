import React from "react";
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
  Sparkles,
  ArrowRight,
  PlayCircle,
  Check,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  /* FEATURES */
  const features = [
    {
      icon: BookOpen,
      title: "AI-Powered Assignments",
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
        "Bank-grade encryption, activity logs, and advanced access control.",
    },
    {
      icon: Mail,
      title: "Automation & Notifications",
      description:
        "Automated reminders, email triggers, and smart workflow alerts.",
    },
  ];

  /* WORKFLOW */
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

  /* NEW SECTION – WHY CHOOSE US */
  const whyChoose = [
    {
      icon: Star,
      title: "Beautiful UX",
      desc: "Designed with a modern interface that students and teachers love.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Optimized performance keeps everything responsive and smooth.",
    },
    {
      icon: TrendingUp,
      title: "Data-Driven",
      desc: "Powerful analytics help institutions drive measurable results.",
    },
    {
      icon: Check,
      title: "Easy Adoption",
      desc: "No steep learning curve—start using AssignPro in minutes.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-100 text-gray-900 overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-white/40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link
            to="/"
            className="text-3xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            <Sparkles className="w-6 h-6" /> AssignPro
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-indigo-600 transition">
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full shadow hover:scale-105 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <motion.section
        className="pt-48 pb-32 text-center relative"
        style={{ y: yHero }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
        >
          The Future of Assignment <br /> Management & Evaluation
        </motion.h1>

        <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-gray-600">
          A modern, AI-enhanced platform that helps institutions, teachers, and
          students achieve more with smart workflows, beautiful dashboards, and
          powerful automation.
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl flex items-center gap-2"
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

      {/* NEW: TRUSTED BY SECTION */}
      <section className="py-20 bg-white text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-8">
          Trusted by institutions worldwide
        </h3>

        <div className="flex justify-center gap-12 opacity-80 grayscale hover:grayscale-0 transition-all">
          <img src="/logos/uni1.png" className="h-10" alt="logo" />
          <img src="/logos/uni2.png" className="h-10" alt="logo" />
          <img src="/logos/uni3.png" className="h-10" alt="logo" />
          <img src="/logos/uni4.png" className="h-10" alt="logo" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">
            Modern Features for Modern Education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white shadow-md hover:shadow-2xl border border-gray-100 hover:scale-105 transition-all"
              >
                <feature.icon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: WHY ASSIGNPRO */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose AssignPro?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-indigo-50 rounded-3xl shadow hover:scale-105 transition-all"
              >
                <item.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="py-28 bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white text-center relative overflow-hidden">

        {/* ORBS */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-5xl font-extrabold mb-4">Seamless Workflow</h2>
          <p className="max-w-3xl mx-auto mb-20 opacity-90">
            A smooth, guided roadmap designed to automate your entire assignment lifecycle.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-6 z-10">
          <div className="hidden md:block absolute left-1/2 top-0 w-1 bg-white/20 h-full rounded-full -translate-x-1/2"></div>

          <div className="space-y-20">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-10 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
                  <div className="w-8 h-8 bg-yellow-300 rounded-full shadow-lg animate-pulse"></div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl hover:scale-[1.04] transition">
                    <div className="flex items-center gap-4 mb-4">
                      <step.icon className="w-12 h-12 text-yellow-300 drop-shadow" />
                      <h3 className="text-3xl font-bold">{step.title}</h3>
                    </div>
                    <p className="opacity-90 leading-relaxed">{step.text}</p>
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
            <h3 className="text-2xl font-bold text-white mb-4">AssignPro</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A modern platform built to streamline assignment workflows,
              communication, and academic success across institutions.
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
