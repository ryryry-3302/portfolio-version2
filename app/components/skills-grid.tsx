"use client";
import { motion } from "framer-motion";
import { Card } from "./card";

interface SkillCategory {
	title: string;
	skills: string[];
}

const skillCategories: SkillCategory[] = [
	{
		title: "Full-stack",
		skills: [
			"TypeScript/JavaScript",
			"React",
			"Electron",
			"Tailwind CSS",
			"Python",
			"SQL (PostgreSQL)",
			"REST APIs",
			"Git",
		],
	},
	{
		title: "Backend & Frameworks",
		skills: [
			"Flask",
			"Swagger",
			"PostREST",
			"Django",
			"PostgreSQL",
			"Node.js",
			"Express",
			"CI/CD",
			"Linux",
			"GitHub Actions",
		],
	},
	{
		title: "Cloud & Infrastructure",
		skills: [
			"GCP (GKE, Cloud Run, Pub/Sub, Artifact Registry, IAM)",
			"Kubernetes",
			"Terraform",
			"Docker",
			"Tailscale",
			"MQTT",
		],
	},
	{
		title: "Robotics & ML",
		skills: [
			"Mosaic",
			"Rerun",
			"ORB SLAM3",
			"VI-SLAM",
			"Video Processing",
			"Synthetic Data Generation",
		],
	},
	{
		title: "Embedded & Hardware",
		skills: [
			"STM32",
			"FreeRTOS",
			"Microcontroller Programming",
			"C/C++",
			"Circuit Design",
			"KiCad",
			"OnShape",
			"Soldering",
			"Embedded Linux",
			"Arduino",
			"Raspberry Pi",
			"Sensor Integration",
			"I2C/SPI/UART",
		],
	},
];

export function SkillsGrid() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{skillCategories.map((category, index) => (
				<motion.div
					key={category.title}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
				>
					<Card>
						<div className="p-6">
							<h3 className="text-sm font-pixel text-pokemon-yellow mb-6 pokemon-glow uppercase">
								▶ {category.title}
							</h3>
							<div className="flex flex-wrap gap-3">
								{category.skills.map((skill, skillIndex) => (
									<span
										key={skillIndex}
										className="px-2 py-1 bg-pokemon-blue/40 pixel-border text-[8px] text-white font-pixel hover:bg-pokemon-blue transition-colors"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					</Card>
				</motion.div>
			))}
		</div>
	);
}

