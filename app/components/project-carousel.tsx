"use client";
import { motion } from "framer-motion";
import { Card } from "./card";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Project {
	slug: string;
	badge: string;
	badgeColor: string;
	date: string;
	title: string;
	description: string;
	tags: string[];
}

const projects: Project[] = [
	{
		slug: "flair-ai",
		badge: "Hackathon Winner",
		badgeColor: "text-orange-400",
		date: "Mar 2025",
		title: "Flair AI",
		description: "AI writing assistant built for non-profit 826 Valencia. Winner (1st place, $1,500) at AI for Good Hackathon. End-to-end app for essay text extraction, automated grading using rubrics, live writing metrics, and advanced grammar checks to support ~400 students.",
		tags: ["React", "Tiptap", "Twilio", "Gemini", "Tailwind"],
	},
	{
		slug: "remote-controlled-robot",
		badge: "Robotics",
		badgeColor: "text-blue-400",
		date: "Apr 2024",
		title: "Remote-controlled Robot with SLAM",
		description: "Designed ROS 2-based robotic system integrating LiDAR, motor control, and real-time mapping with sensor fusion for autonomous navigation.",
		tags: ["C++", "ROS 2", "LiDAR", "SLAM"],
	},
	{
		slug: "rtx-rtos-car",
		badge: "Embedded Systems",
		badgeColor: "text-cyan-400",
		date: "Nov 2024",
		title: "RTX RTOS Car",
		description: "Developed multi-threaded real-time control system for robotic car using KEIL RTX RTOS with priority-based scheduling for deterministic motor control. Integrated ESP32 via UART for Bluetooth communication with PS4 controller.",
		tags: ["C", "KEIL RTX", "ESP32", "Real-time OS"],
	},
	{
		slug: "fpga-streetfighter",
		badge: "Digital Design",
		badgeColor: "text-green-400",
		date: "Apr 2024",
		title: "FPGA Street Fighter",
		description: "Architected 2-player arcade game on Basys 3 FPGA using Verilog. Implemented custom drivers for OLED display, audio PWM generation, and UART-based multiplayer synchronization.",
		tags: ["Verilog", "FPGA", "Basys 3", "Digital Design"],
	},
];

export function ProjectCarousel() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const scroll = (direction: "left" | "right") => {
		if (!scrollRef.current) return;
		const scrollAmount = scrollRef.current.clientWidth * 0.85;
		scrollRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	const checkScroll = () => {
		if (!scrollRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
		setCanScrollLeft(scrollLeft > 0);
		setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
	};

	useEffect(() => {
		checkScroll();
		window.addEventListener("resize", checkScroll);
		return () => window.removeEventListener("resize", checkScroll);
	}, []);

	return (
		<div className="relative group">
			{/* Navigation Buttons */}
			<button
				onClick={() => scroll("left")}
				className={`absolute left-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-pokemon-blue pixel-border transition-all ${
					canScrollLeft
						? "opacity-100 translate-x-2"
						: "opacity-0 pointer-events-none"
				} group-hover:opacity-100 hover:bg-pokemon-darkblue`}
			>
				<ChevronLeft className="w-6 h-6 text-white" />
			</button>
			<button
				onClick={() => scroll("right")}
				className={`absolute right-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-pokemon-blue pixel-border transition-all ${
					canScrollRight
						? "opacity-100 -translate-x-2"
						: "opacity-0 pointer-events-none"
				} group-hover:opacity-100 hover:bg-pokemon-darkblue`}
			>
				<ChevronRight className="w-6 h-6 text-white" />
			</button>

			{/* Carousel */}
			<div
				ref={scrollRef}
				onScroll={checkScroll}
				onLoad={checkScroll}
				className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory -mx-6 px-6 pb-4"
				style={{ scrollPaddingLeft: "1.5rem", scrollPaddingRight: "1.5rem" }}
			>
				<div className="flex gap-6">
					{projects.map((project, index) => (
						<motion.div
							key={project.slug}
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[45vw] xl:w-[600px] snap-start"
						>
							<Card>
								<Link href={`/projects/${project.slug}`}>
									<div className="p-8 md:p-10 h-full flex flex-col">
										<div className="flex items-center justify-between mb-6">
											<span
												className={`px-3 py-1 bg-pokemon-red pixel-border text-[8px] font-pixel text-white uppercase tracking-tighter`}
											>
												▶ {project.badge}
											</span>
											<span className="text-[10px] text-white/60 font-pixel">
												{project.date}
											</span>
										</div>
										<h3 className="text-lg md:text-xl font-pixel text-pokemon-yellow mb-4 group-hover:text-white transition-colors pokemon-glow uppercase tracking-tighter">
											{project.title}
										</h3>
										<p className="text-white/80 mb-6 leading-relaxed flex-grow font-pixel text-[10px] md:text-xs">
											{project.description}
										</p>
										<div className="flex flex-wrap gap-3 mb-6">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 bg-pokemon-blue/40 pixel-border text-[8px] text-white font-pixel"
												>
													{tag}
												</span>
											))}
										</div>
										<div className="flex items-center text-[10px] text-pokemon-yellow font-pixel group-hover:text-white transition-colors uppercase tracking-tighter">
											▶ VIEW PROJECT
											<ChevronRight className="w-4 h-4 ml-1 inline-block group-hover:translate-x-1 transition-transform" />
										</div>
									</div>
								</Link>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}

