"use client";

import { Github, Linkedin, Mail, ExternalLink, Award, Briefcase, GraduationCap, Code, Server, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">TM</h1>
          <div className="flex gap-6">
            <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">About</a>
            <a href="#experience" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Experience</a>
            <a href="#projects" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Projects</a>
            <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn}>
            <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Tanay Maheshwari
            </h1>
            <p className="text-2xl text-blue-600 dark:text-blue-400 mb-6">
              Cloud & DevOps Engineer | ML Infrastructure Specialist
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mb-8">
              MS in Computer and Information Technology at Purdue University. Passionate about building scalable cloud infrastructure, 
              Kubernetes orchestration, and ML deployment pipelines. Google Cloud Certified Professional and Certified Kubernetes Administrator.
            </p>
            <div className="flex gap-4">
              <a href="mailto:tanaymaheshwari2000@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Mail size={20} />
                Get in Touch
              </a>
              <a href="https://www.linkedin.com/in/tanay-maheshwari-0592986b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a href="https://github.com/tsm2k" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <Github size={20} />
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-3">
            <GraduationCap className="text-blue-600" />
            Education
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Purdue University</h3>
              <p className="text-lg text-blue-600 dark:text-blue-400">Master of Science in Computer and Information Technology</p>
              <p className="text-slate-600 dark:text-slate-400">GPA: 4.0/4.0 | August 2024 - Present</p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">West Lafayette, IN</p>
            </div>
            <div className="border-l-4 border-slate-400 pl-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">NMIMS</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400">Bachelor of Technology in Computer Engineering</p>
              <p className="text-slate-600 dark:text-slate-400">GPA: 3.2/4.0 | August 2017 - May 2021</p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Mumbai, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-3">
            <Award className="text-blue-600" />
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Google Cloud Certified</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• Professional Cloud Architect</li>
                <li>• Professional Cloud Developer</li>
                <li>• Professional Cloud DevOps Engineer</li>
                <li>• Associate Cloud Engineer</li>
              </ul>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">The Linux Foundation</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>• Certified Kubernetes Administrator (CKA)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-3">
            <Briefcase className="text-blue-600" />
            Professional Experience
          </h2>
          
          <div className="space-y-12">
            {/* Purdue */}
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Research Assistant</h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400">Purdue University</p>
                </div>
                <span className="text-slate-600 dark:text-slate-400">Aug 2024 - Present</span>
              </div>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>• Built a real-time traffic analytics dashboard for Indiana Department of Transportation using Next.js, TypeScript, and Turf.js, aggregating data from 10+ sources</li>
                <li>• Implemented advanced filtering and visualization features with D3.js and Recharts, enabling cause-effect analysis and temporal pattern discovery</li>
                <li>• Deployed the platform on Google Cloud Platform using Cloud Run and BigQuery to process 30M+ traffic data records with sub-2s dashboard loads</li>
              </ul>
            </div>

            {/* Quantiphi */}
            <div className="border-l-4 border-purple-600 pl-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Senior Platform Engineer</h3>
                  <p className="text-lg text-purple-600 dark:text-purple-400">Quantiphi</p>
                </div>
                <span className="text-slate-600 dark:text-slate-400">May 2023 - June 2024</span>
              </div>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>• Led design and development of a document intelligence pipeline using Vertex AI, processing and scoring 5,000+ legal documents</li>
                <li>• Led deployment of a multilingual speech services platform using NVIDIA Riva, NeMo, and Triton Inference Server with optimized hybrid-cloud clusters across GCP and Azure</li>
                <li>• Architected an end-to-end computer vision system using Google edge devices and Vertex AI Vision, achieving &gt;95% accuracy in knot detection</li>
              </ul>
            </div>

            {/* Framework Engineer */}
            <div className="border-l-4 border-slate-400 pl-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Framework Engineer</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400">Quantiphi</p>
                </div>
                <span className="text-slate-600 dark:text-slate-400">June 2021 - May 2023</span>
              </div>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>• Led cloud onboarding for a Fortune 100 automaker, migrating 100TB+ of on-prem data to BigQuery</li>
                <li>• Enabled org-wide adoption of Data Fusion and Astronomer via demos, onboarding, and documentation</li>
                <li>• Deployed scalable GCP infrastructure with Terraform and streamlined CI/CD workflows for 900+ engineers using OpenShift Tekton</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Projects */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-3">
            <Code className="text-blue-600" />
            Research & Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Ceph DPU */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ceph DPU Offload</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">Thesis Research - Purdue University</p>
              <p className="text-slate-600 dark:text-slate-300">
                Designed Ceph Client offload using SPDK and NVIDIA BlueField DPUs; reduced host CPU utilization by up to 90% while improving throughput, enabling DPU-accelerated encryption and compression.
              </p>
            </div>

            {/* C-KASH */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">C-KASH</h3>
                <a href="https://ieeexplore.ieee.org/document/11429804" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  <ExternalLink size={20} />
                </a>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">Research Project - Purdue University | IEEE ANTS 2025</p>
              <p className="text-slate-600 dark:text-slate-300">
                Co-authored a unified Kubernetes autoscaler and scheduler framework for LLM inference; achieved 64% higher token throughput, 25% faster inference completion, and 11.5× greater pod density using custom metrics and GPU-aware scheduling.
              </p>
            </div>

            {/* Lend a Hand */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lend a Hand</h3>
                <a href="https://link.springer.com/chapter/10.1007/978-3-030-88244-0_7" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  <ExternalLink size={20} />
                </a>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">Research Project - NMIMS | ICACDS 2021</p>
              <p className="text-slate-600 dark:text-slate-300">
                Developed a browser extension and ML pipeline to detect suicidal ideation in social media posts using NLP and classification models, achieving over 90% accuracy.
              </p>
            </div>

            {/* Depression Detection App - NEW */}
            <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Depression Detection ML App</h3>
                <a href="https://app.tanaymaheshwari.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200">
                  <ExternalLink size={20} />
                </a>
              </div>
              <p className="text-sm text-blue-100 mb-4">Live Demo - Deployed on Azure K3s</p>
              <p className="text-white/90">
                Production-grade ML application deployed on Kubernetes with FastAPI backend, HuggingFace models, and Chrome extension. 
                Showcases DevOps best practices with Terraform, Helm, cert-manager, and automated CI/CD.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Kubernetes</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">FastAPI</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">ML</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">Technical Skills</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Code className="text-blue-600" size={24} />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "C/C++", "Java", "Bash/Shell", "TypeScript", "JavaScript", "Golang", "Node.js", "React"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Server className="text-purple-600" size={24} />
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {["AWS", "GCP", "Azure", "Kubernetes", "Docker", "Terraform", "GitHub", "Tekton", "NGINX", "Helm", "ArgoCD"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="text-green-600" size={24} />
                Databases
              </h3>
              <div className="flex flex-wrap gap-2">
                {["PostgreSQL", "MySQL", "MongoDB", "BigQuery", "Firebase", "Redis"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Get In Touch</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, collaborations, or just chatting about cloud infrastructure and DevOps!
          </p>
          <div className="flex justify-center gap-6">
            <a href="mailto:tanaymaheshwari2000@gmail.com" className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg">
              <Mail size={24} />
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/tanay-maheshwari-0592986b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition text-lg">
              <Linkedin size={24} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2026 Tanay Maheshwari. Built with Next.js, TypeScript, and Tailwind CSS.</p>
          <p className="text-slate-500 text-sm mt-2">Deployed on Vercel | Infrastructure on Azure</p>
        </div>
      </footer>
    </main>
  );
}
