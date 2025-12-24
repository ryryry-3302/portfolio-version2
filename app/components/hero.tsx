"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Particles from "./particles";

export function Hero() {
	return (
		<section
			id="home"
			className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black"
		>
			{/* Deep Space Background */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#000000] to-black" />
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
			
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>

			{/* Content */}
			<div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, type: "spring" }}
					className="mb-12"
				>
					<div className="inline-block px-6 py-3 bg-pokemon-red pixel-border-white mb-8 animate-pixel-bounce">
						<span className="text-xs md:text-sm text-white font-pixel tracking-tighter">
							VERSION 2.0 - 2026
						</span>
					</div>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="mb-12"
				>
					<p className="text-sm md:text-base font-pixel text-white mb-2 animate-pulse">
						Wild Engineer appeared!
					</p>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-pixel text-white mb-4 pokemon-glow leading-tight">
						<span className="text-pokemon-yellow">RYAN</span>
						<br />
						<span className="text-pokemon-red">LEONG</span>
					</h1>
					<div className="h-2 w-48 md:w-64 bg-pokemon-yellow mx-auto pixel-border" />
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className="mb-12"
				>
					<p className="text-sm md:text-lg font-pixel text-pokemon-yellow mb-6 tracking-tighter">
						ROBOTICS & EMBEDDED ENGINEER
					</p>
					
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.2 }}
						className="max-w-2xl mx-auto"
					>
						<button 
							onClick={() => document.getElementById('visa-info')?.scrollIntoView({ behavior: 'smooth' })}
							className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-pokemon-yellow/50 transition-colors cursor-pointer"
						>
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pokemon-green opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-pokemon-green"></span>
							</span>
							<span className="text-xs md:text-sm text-white font-pixel">
								Singapore Citizen — eligible for <span className="text-pokemon-yellow">H-1B1</span> (US–Singapore FTA)
							</span>
						</button>
					</motion.div>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="flex flex-wrap items-center justify-center gap-8"
				>
					<Link
						href="mailto:ryan.leong@u.nus.edu"
						className="group relative px-8 py-4 bg-pokemon-blue text-white font-pixel text-xs md:text-sm pixel-border hover:bg-pokemon-darkblue transition-colors"
					>
						<span className="relative z-10">▶ START CONTACT</span>
						<div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
					</Link>
					<Link
						href="https://github.com/ryryry-3302"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative px-8 py-4 bg-pokemon-green text-white font-pixel text-xs md:text-sm pixel-border hover:bg-green-700 transition-colors"
					>
						<span className="relative z-10">▶ GITHUB REPO</span>
					</Link>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.5, duration: 1 }}
					className="mt-20 animate-bounce"
				>
					<span className="text-sm font-pixel text-pokemon-yellow">
						PRESS SCROLL TO START
					</span>
				</motion.div>
			</div>
		</section>
	);
}

