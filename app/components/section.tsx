"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
	id: string;
	title?: string;
	children: ReactNode;
	className?: string;
}

export function Section({ id, title, children, className = "" }: SectionProps) {
	return (
		<section
			id={id}
			className={`py-20 md:py-28 lg:py-32 px-6 ${className}`}
		>
			<div className="max-w-7xl mx-auto">
				{title && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="mb-16 md:mb-20"
					>
						<h2 className="text-2xl md:text-4xl font-pixel mb-6 text-center text-pokemon-yellow pokemon-glow uppercase tracking-tighter">
							{title}
						</h2>
						<div className="w-48 h-2 bg-pokemon-yellow mx-auto pixel-border" />
					</motion.div>
				)}
				{children}
			</div>
		</section>
	);
}

