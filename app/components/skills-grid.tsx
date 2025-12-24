"use client";
import { motion } from "framer-motion";
import { Layers, Server, Cloud, Bot, Cpu } from "lucide-react";
import { Card } from "./card";

interface SkillCategory {
	title: string;
	icon: React.ReactNode;
	skills: string[];
}

const skillCategories: SkillCategory[] = [
	{
		title: "Full-stack",
		icon: <Layers className="w-6 h-6 text-pokemon-blue" />,
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
		icon: <Server className="w-6 h-6 text-pokemon-red" />,
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
		icon: <Cloud className="w-6 h-6 text-pokemon-yellow" />,
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
		icon: <Bot className="w-6 h-6 text-pokemon-green" />,
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
		icon: <Cpu className="w-6 h-6 text-pokemon-gold" />,
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
						<div className="p-6 h-full flex flex-col">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-white/5 rounded-lg border border-white/10">
									{category.icon}
								</div>
								<h3 className="text-sm font-pixel text-pokemon-yellow pokemon-glow uppercase">
									{category.title}
								</h3>
							</div>
							<div className="flex flex-wrap gap-2">
								{category.skills.map((skill, skillIndex) => (
									<span
										key={skillIndex}
										className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-gray-300 font-pixel hover:bg-white/10 hover:border-pokemon-yellow hover:text-pokemon-yellow transition-colors cursor-default"
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

