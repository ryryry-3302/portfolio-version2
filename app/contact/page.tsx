"use client";
import { Github, Mail, Linkedin, FileText } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { motion } from "framer-motion";

const socials = [
	{
		icon: <Linkedin size={24} />,
		href: "https://www.linkedin.com/in/ryanjasperkoleong/",
		label: "LinkedIn",
		handle: "@ryanjasperkoleong",
	},
	{
		icon: <Mail size={24} />,
		href: "mailto:ryan.leong@u.nus.edu",
		label: "Email",
		handle: "ryan.leong@u.nus.edu",
	},
	{
		icon: <Github size={24} />,
		href: "https://github.com/ryryry-3302",
		label: "Github",
		handle: "ryryry-3302",
	},
	{
		icon: <FileText size={24} />,
		href: "/ryan_leong_embedded_swe_resume.pdf",
		label: "Resume",
		handle: "Download Resume",
	},
];

export default function Contact() {
	return (
		<div className="min-h-screen">
			<Navigation />
			<div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto pt-32">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h1 className="text-2xl md:text-4xl font-pixel text-pokemon-yellow pokemon-glow uppercase tracking-tighter mb-6">
						Get in Touch
					</h1>
					<p className="text-xs md:text-sm text-white/60 font-pixel max-w-2xl mx-auto leading-relaxed">
						I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
					</p>
				</motion.div>
				<div className="grid w-full grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 max-w-6xl">
					{socials.map((s, index) => (
						<motion.div
							key={s.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card>
								<Link
									href={s.href}
									target={s.href.startsWith("http") || s.href.startsWith("/") ? "_blank" : undefined}
									rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
									download={s.label === "Resume" ? true : undefined}
									className="p-6 relative flex flex-col items-center gap-4 duration-700 group md:gap-6 md:p-8"
								>
									<span className="relative z-10 flex items-center justify-center w-16 h-16 bg-pokemon-blue pixel-border text-white group-hover:bg-pokemon-darkblue transition-all">
										{s.icon}
									</span>
									<div className="z-10 flex flex-col items-center">
										<span className="text-xs md:text-sm font-pixel text-pokemon-yellow group-hover:text-white transition-colors text-center break-all">
											{s.handle}
										</span>
										<span className="mt-4 text-xs text-center text-white/60 font-pixel uppercase">
											{s.label}
										</span>
									</div>
								</Link>
							</Card>
						</motion.div>
					))}
				</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-16 text-center"
				>
					<div className="pokemon-textbox inline-block max-w-xl">
						<p className="text-xs md:text-sm text-pokemon-blue font-pixel leading-relaxed">
							Singapore Citizen — eligible for <span className="text-pokemon-red">H-1B1</span> (US–Singapore FTA). 
							A fast-track alternative to H1B, similar to TN and E-3 visas.
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
