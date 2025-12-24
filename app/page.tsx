"use client";
import React, { useEffect } from "react";
import { Navigation } from "./components/nav";
import { Hero } from "./components/hero";
import { Section } from "./components/section";
import { ExperienceTimeline } from "./components/experience-timeline";
import { SkillsGrid } from "./components/skills-grid";
import { Card } from "./components/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectCarousel } from "./components/project-carousel";
import { VisaInfo } from "./components/visa-info";

export default function Home() {
	// Handle hash navigation when page loads
	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			// Wait for page to render, then scroll
			setTimeout(() => {
				const element = document.querySelector(hash);
				if (element) {
					element.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}, 100);
		}
	}, []);
	return (
		<>
			<Navigation />
			<Hero />
			
			{/* About Section */}
			<Section id="about" title="About Me">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
					<Card>
						<div className="p-8">
							<h3 className="text-lg font-pixel text-pokemon-yellow mb-6 pokemon-glow uppercase">▶ Background</h3>
							<p className="text-white/80 mb-4 leading-relaxed font-pixel text-xs md:text-sm">
								I'm a Computer Engineering undergraduate at the National University of Singapore, 
								currently working as an Embedded / SWE at ZeroshotData in San Francisco, where I build 
								robotics software and embedded systems for autonomous navigation and data processing.
							</p>
							<p className="text-white/80 leading-relaxed font-pixel text-xs md:text-sm">
								My expertise lies in robotics software development, including visual-inertial SLAM (ORB SLAM3), 
								sensor fusion, embedded systems, and real-time pose estimation.
							</p>
						</div>
					</Card>
					</motion.div>
					
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
					<Card>
						<div className="p-8">
							<h3 className="text-lg font-pixel text-pokemon-yellow mb-6 pokemon-glow uppercase">▶ Education</h3>
							<div className="space-y-6">
								<div>
									<div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-2">
										<div>
											<p className="font-pixel text-white text-xs md:text-sm">National University of Singapore</p>
											<p className="text-white/60 text-xs mt-1 font-pixel">B.Eng (Honors), Computer Engineering</p>
										</div>
										<span className="px-2 py-1 bg-pokemon-blue pixel-border text-xs text-white font-pixel whitespace-nowrap">
											2023 — JUN 2026
										</span>
									</div>
									<div className="mt-3 space-y-1">
										<p className="text-xs text-pokemon-yellow font-pixel">GPA: 4.88/5.0</p>
										<p className="text-xs text-white/60 font-pixel">Dean's List; Engineering Scholars Program</p>
									</div>
								</div>
								<div className="pt-4 border-t-2 border-white/10">
									<div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
										<div>
											<p className="font-pixel text-white text-xs md:text-sm">Stanford University</p>
											<p className="text-white/60 text-xs mt-1 font-pixel">Visiting Student (Exchange)</p>
										</div>
										<span className="px-2 py-1 bg-pokemon-blue pixel-border text-xs text-white font-pixel whitespace-nowrap">
											APR — JUN 2025
										</span>
									</div>
								</div>
							</div>
						</div>
					</Card>
					</motion.div>
				</div>
			</Section>

			<VisaInfo />

			{/* Experience Section */}
			<Section id="experience" title="Experience">
				<ExperienceTimeline />
			</Section>

			{/* Projects Preview Section */}
			<Section id="projects" title="Featured Projects">
				<div className="mb-12">
					<ProjectCarousel />
				</div>
				<div className="text-center">
					<Link
						href="/projects"
						className="inline-flex items-center gap-2 px-8 py-4 bg-pokemon-blue text-white font-pixel text-xs md:text-sm pixel-border hover:bg-pokemon-darkblue transition-colors uppercase tracking-tighter"
					>
						▶ VIEW ALL PROJECTS
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</Link>
				</div>
			</Section>

			{/* Skills Section */}
			<Section id="skills" title="Skills">
				<SkillsGrid />
			</Section>

			{/* CTA Section */}
			<section className="py-20 px-6 text-center">
				<div className="max-w-3xl mx-auto">
					<div className="pokemon-textbox p-8 md:p-12">
						<h3 className="text-xl md:text-2xl font-pixel text-pokemon-yellow mb-6 pokemon-glow uppercase">
							Ready to Collaborate?
						</h3>
						<p className="text-white/80 font-pixel text-xs md:text-sm mb-8 leading-relaxed">
							I'm currently looking for opportunities in Robotics, Embedded Systems, and Full Stack Development.
							Check out my resume or get in touch!
						</p>
						<div className="flex flex-col md:flex-row items-center justify-center gap-6">
							<Link
								href="/contact"
								className="px-8 py-4 bg-pokemon-blue text-white font-pixel text-xs md:text-sm pixel-border hover:bg-pokemon-darkblue transition-colors uppercase tracking-tighter w-full md:w-auto"
							>
								▶ CONTACT ME
							</Link>
							<Link
								href="/Ryan_Resume.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="px-8 py-4 bg-pokemon-red text-white font-pixel text-xs md:text-sm pixel-border hover:bg-red-700 transition-colors uppercase tracking-tighter w-full md:w-auto"
							>
								▶ DOWNLOAD RESUME
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
