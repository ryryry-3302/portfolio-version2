"use client";
import { motion } from "framer-motion";
import { Card } from "./card";

interface ExperienceItem {
	title: string;
	company: string;
	location: string;
	period: string;
	points: string[];
}

const experiences: ExperienceItem[] = [
	{
		title: "Embedded / SWE",
		company: "ZeroshotData",
		location: "San Francisco, CA",
		period: "Jan 2025 — Present",
		points: [
			"Built scalable video processing applications using Python, FFmpeg, and OpenCV for multi-camera robotics datasets, reducing pipeline costs by 50%",
			"Developed ORB SLAM3 application for visual-inertial SLAM, integrating sensor fusion and real-time pose estimation for robotics navigation",
			"Created 3D trajectory visualizer using Rerun with URDF models, enabling interactive visualization of robotic motion and sensor data",
			"Built API servers using Flask with Swagger documentation and PostREST, providing RESTful interfaces for robotics data management and processing",
			"Deployed dockerized containers communicating over Pub/Sub for scheduled, parallelizable job processing, optimizing resource utilization and throughput",
			"Implemented data sharding and synthetic data generation using Mosaic, enabling scalable dataset augmentation for machine learning training",
		],
	},
	{
		title: "SWE / FPGA Intern",
		company: "A*STAR — National Metrology Centre",
		location: "Singapore",
		period: "May 2024 — Aug 2024",
		points: [
			"Engineered frequency synthesizer using Verilog and GOWIN IP cores on Tang Nano 20K, achieving 6.5–9.0 ns precision for 1PPS synchronization",
			"Developed autonomous data-measurement web server using Python (PyVISA, Pandas, Dash) on OrangePi 3B+ to collect, analyze, and visualize lab instrument data",
			"Resolved Linux kernel driver compatibility issues for NI-USB-HS GPIB interface on OrangePi architecture, enabling robust instrument control",
		],
	},
	{
		title: "SWE Intern",
		company: "HolyWally",
		location: "Singapore",
		period: "Apr 2023 — Jun 2023",
		points: [
			"Spearheaded internal tools using Python, SQL, and Superblocks with PostgreSQL, the HolyWally backend, and third-party APIs, consolidating data access for ~100 users in a single dashboard",
			"Led QA, designing Postman calls to interface with third-party APIs (episode6) and collaborating with backend engineers to resolve UAT bugs",
			"Built full-stack dashboard integrating REST APIs, SQL queries, and frontend components to streamline internal workflows",
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
									<p className="text-sm md:text-base text-white font-pixel mb-2">
										{exp.company}
									</p>
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

