"use client";
import { motion } from "framer-motion";
import { Card } from "./card";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Project {
	slug: string;
	category: string;
	date: string;
	title: string;
	description: string;
	tags: string[];
	previewType: "image" | "video";
	previewSrc: string;
	previewPoster?: string;
	previewAlt: string;
}

const projects: Project[] = [
	{
		slug: "flair-ai",
		category: "AI",
		date: "Mar 2025",
		title: "Flair AI",
		description:
			"AI writing assistant for 826 Valencia with automated essay grading, voice feedback, and live writing metrics.",
		tags: ["React", "Twilio", "Gemini"],
		previewType: "image",
		previewSrc: "https://img.youtube.com/vi/ia1Ee2U0DO8/maxresdefault.jpg",
		previewAlt: "Flair AI demo preview.",
	},
	{
		slug: "orb-slam3-stereo",
		category: "Robotics",
		date: "May 2025",
		title: "ORB SLAM3",
		description:
			"Visual-inertial SLAM pipeline tuned for a stereo robotics camera stack with real-time 6-DOF tracking.",
		tags: ["C++", "OpenCV", "VIO"],
		previewType: "video",
		previewSrc: "/orb_slam_demo_video_pretty.mp4",
		previewAlt: "ORB SLAM3 stereo camera demo.",
	},
	{
		slug: "emf-full-body-tracking",
		category: "Robotics/Embedded",
		date: "Jan 2025",
		title: "EMF Full Body Tracking",
		description:
			"Custom 6-DOF tracking system using electromagnetic sensing, hardware design, and machine learning.",
		tags: ["Embedded", "ML", "Hardware"],
		previewType: "video",
		previewSrc: "/emf_tracking_v2.mov",
		previewPoster: "/emfgraph1.png",
		previewAlt: "EMF full body tracking demo.",
	},
	{
		slug: "leasy",
		category: "Web",
		date: "Sep 2025",
		title: "Leasy",
		description:
			"Lease-takeover marketplace with interactive maps, fast filtering, and a housing-search flow tuned for SF renters.",
		tags: ["Next.js", "Mapbox", "TypeScript"],
		previewType: "video",
		previewSrc: "/leasy.mp4",
		previewAlt: "Leasy product demo.",
	},
	{
		slug: "rnz",
		category: "Web/3D",
		date: "Dec 2025",
		title: "RnZ",
		description:
			"3D BTO renovation designer with live floor planning, furniture placement, and real-time rendering.",
		tags: ["Three.js", "Next.js", "Blueprint3D"],
		previewType: "video",
		previewSrc: "/RnZ.mp4",
		previewAlt: "RnZ 3D design walkthrough.",
	},
	{
		slug: "remote-controlled-robot",
		category: "Robotics",
		date: "Apr 2024",
		title: "Remote-controlled Robot with SLAM",
		description:
			"Search-and-rescue robot with RPLIDAR mapping, ROS, four-direction drive control, and onboard sensing.",
		tags: ["ROS", "Arduino", "RPLIDAR"],
		previewType: "image",
		previewSrc:
			"https://ryryry-3302.github.io/My-Portfolio/images/photo_6141190599601142092_y.jpg",
		previewAlt: "Remote controlled robot platform.",
	},
];

function Preview({ project }: { project: Project }) {
	if (project.previewType === "video") {
		return (
			<div className="relative h-56 overflow-hidden bg-pokemon-darkblue md:h-64">
				<video
					className="h-full w-full object-cover"
					autoPlay
					muted
					loop
					playsInline
					preload="metadata"
					poster={project.previewPoster}
					aria-label={project.previewAlt}
				>
					<source src={project.previewSrc} />
				</video>
				<div className="absolute inset-0 bg-gradient-to-t from-[#130a22] via-[#130a22]/15 to-transparent" />
			</div>
		);
	}

	return (
		<div className="relative h-56 overflow-hidden bg-pokemon-darkblue md:h-64">
			<img
				src={project.previewSrc}
				alt={project.previewAlt}
				loading="lazy"
				className="h-full w-full object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-[#130a22] via-[#130a22]/10 to-transparent" />
		</div>
	);
}

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
								<Link
									href={`/projects/${project.slug}`}
									className="block h-full overflow-hidden"
								>
									<Preview project={project} />

									<div className="p-6 md:p-8">
										<div className="flex flex-wrap items-center gap-3">
											<span className="px-3 py-1 bg-pokemon-red/90 pixel-border text-[8px] font-pixel text-white uppercase tracking-tighter">
												▶ {project.category}
											</span>
											<span className="text-[10px] text-white/60 font-pixel uppercase tracking-tighter">
												{project.date}
											</span>
										</div>

										<h3 className="mt-5 text-lg md:text-xl font-pixel text-pokemon-yellow group-hover:text-white transition-colors pokemon-glow uppercase tracking-tighter">
											{project.title}
										</h3>

										<p className="mt-4 text-white/80 leading-relaxed font-pixel text-[10px] md:text-xs min-h-[4.5rem]">
											{project.description}
										</p>

										<div className="mt-5 flex flex-wrap gap-3">
											{project.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 bg-pokemon-blue/40 pixel-border text-[8px] text-white font-pixel"
												>
													{tag}
												</span>
											))}
										</div>

										<div className="mt-6 flex items-center text-[10px] text-pokemon-yellow font-pixel group-hover:text-white transition-colors uppercase tracking-tighter">
											▶ View project
											<ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
