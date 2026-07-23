"use client";
import { motion } from "framer-motion";
import { Card } from "./card";

interface ExperienceItem {
	title: string;
	company: string;
	companyUrl?: string;
	location: string;
	period: string;
	points: string[];
}

const experiences: ExperienceItem[] = [
	{
		title: "Robotics Software Engineer Intern",
		company: "DSO National Laboratories",
		companyUrl: "https://www.dso.org.sg/",
		location: "Singapore",
		period: "May 2026 — Present",
		points: [
			"Built an agentic robot task-planning harness inspired by SayPlan and LookPlanGraph, integrating local LLM tool use, DDS middleware, and hierarchical 3D scene graphs for spatial reasoning and closed-loop replanning",
			"Developed low-fidelity robot embodiment simulators and DDS adapters for external simulators, enabling hardware-independent testing, scenario replay, telemetry, and end-to-end autonomy validation",
			"Benchmarked 40+ compact language models for task success, tool-use reliability, inference latency, and resource usage, producing a reproducible evaluation pipeline for local and edge deployment",
		],
	},
	{
		title: "Robotics Software Engineer",
		company: "ZeroshotData — Early-Stage Robotics Startup",
		companyUrl: "https://www.linkedin.com/company/zeroshotdata/",
		location: "San Francisco, CA",
		period: "Jan 2025 — Dec 2025",
		points: [
			"Built robotics infrastructure on GCP using Terraform and Kubernetes, deploying 20+ containerized services with CI/CD and FastAPI-based device registration, telemetry, monitoring, and fleet operations",
			"Integrated visual-inertial ORB-SLAM3 into a UMI gripper using OAK-D stereo cameras, Kalibr camera-IMU calibration, Allan variance analysis, and synchronized sensor acquisition",
			"Built Python applications for the end-to-end processing pipeline behind the SF Fold dataset across 100+ hours of robot-folding demonstrations, including video preprocessing, automated data validation, ORB-SLAM3 execution, review-video generation, Rerun visualizations, and Mosaic-based dataset sharding",
			"Automated robot and sensor calibration using a Piper 6-DoF arm and prototyped infrared tracking with Arducam cameras, hardware frame synchronization, and Orange Pi compute",
			"Engineered an electromagnetic full-body tracking system with a 1.5 m range, centimetre-level positional accuracy, and 5° rotational accuracy using custom PCBs, STM32 firmware, Helmholtz coils, and Onshape CAD",
		],
	},
	{
		title: "Research Engineering Intern",
		company: "A*STAR — National Metrology Centre",
		companyUrl: "https://asef.a-star.edu.sg/institutes/nmc",
		location: "Singapore",
		period: "May 2024 — Aug 2024",
		points: [
			"Built a Python measurement platform using PyVISA, Pandas, and Dash on an Orange Pi, and designed a Verilog FPGA frequency synthesizer achieving 6.5-9.0 ns timing precision",
		],
	},
	{
		title: "Software Engineering Intern",
		company: "HolyWally — Fintech Startup",
		companyUrl: "https://www.holywally.com/insta-wally",
		location: "Singapore",
		period: "Apr 2023 — Jun 2023",
		points: [
			"Built Python and SQL tools backed by PostgreSQL for an operational dashboard used by approximately 100 employees",
		],
	},
];

export function ExperienceTimeline() {
	return (
		<div className="space-y-8">
			{experiences.map((exp, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
				>
					<Card>
						<div className="p-8 md:p-10">
							<div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
								<div className="flex-1">
									<h3 className="text-lg md:text-xl font-pixel text-pokemon-yellow mb-2 pokemon-glow uppercase">
										{exp.title}
									</h3>
									<div className="text-sm md:text-base text-white font-pixel mb-2">
										{exp.companyUrl ? (
											<a
												href={exp.companyUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="hover:text-pokemon-yellow transition-colors duration-300 border-b-2 border-transparent hover:border-pokemon-yellow inline-block"
											>
												{exp.company} ↗
											</a>
										) : (
											exp.company
										)}
									</div>
									<p className="text-xs text-gray-300 font-pixel">
										{exp.location}
									</p>
								</div>
								<div className="mt-3 md:mt-0 md:ml-6">
									<span className="inline-block px-3 py-2 bg-pokemon-blue pixel-border text-xs text-white font-pixel whitespace-nowrap">
										{exp.period}
									</span>
								</div>
							</div>
							<ul className="mt-8 space-y-4">
								{exp.points.map((point, pointIndex) => (
									<li
										key={pointIndex}
										className="text-gray-200 flex items-start leading-relaxed font-pixel text-xs md:text-sm"
									>
										<span className="text-pokemon-yellow mr-3 flex-shrink-0 animate-pulse">▶</span>
										<span>{point}</span>
									</li>
								))}
							</ul>
						</div>
					</Card>
				</motion.div>
			))}
		</div>
	);
}
