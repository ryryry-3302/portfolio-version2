"use client";

import { ArrowLeft, ExternalLink, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
		category?: string;
		date?: string;
		previewType?: string;
		previewSrc?: string;
		previewPoster?: string;
		previewAlt?: string;
	};
};

function formatDate(date?: string) {
	if (!date) return null;

	return Intl.DateTimeFormat("en-US", {
		month: "long",
		year: "numeric",
	}).format(new Date(date));
}

function CoverMedia({ project }: Props) {
	if (!project.previewSrc) return null;

	if (project.previewType === "video") {
		return (
			<video
				className="h-full w-full object-cover"
				autoPlay
				muted
				loop
				playsInline
				preload="metadata"
				poster={project.previewPoster}
				aria-label={project.previewAlt ?? project.title}
			>
				<source src={project.previewSrc} />
			</video>
		);
	}

	return (
		<img
			src={project.previewSrc}
			alt={project.previewAlt ?? project.title}
			className="h-full w-full object-cover"
		/>
	);
}

export const Header: React.FC<Props> = ({ project }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const date = formatDate(project.date);

	const links: { label: string; href: string; icon: React.ReactNode }[] = [];
	if (project.repository) {
		links.push({
			label: "Code",
			href: `https://github.com/${project.repository}`,
			icon: <Github className="h-4 w-4" />,
		});
	}
	if (project.url) {
		links.push({
			label: "External",
			href: project.url,
			icon: <ExternalLink className="h-4 w-4" />,
		});
	}

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref} className="relative isolate overflow-hidden bg-[#1a0d2e]">
			<div
				className={`fixed inset-x-0 top-0 z-50 duration-200 border-b ${
					isIntersecting
						? "bg-transparent border-transparent"
						: "border-[#ffde00]/15 bg-[#1a0d2e]/90 shadow-lg backdrop-blur"
				}`}
			>
				<div className="container mx-auto flex flex-row-reverse items-center justify-between p-5">
					<div className="flex justify-between gap-5">
						<Link
							target="_blank"
							href="https://www.linkedin.com/in/ryanjasperkoleong/"
							className="text-white/60 transition-colors hover:text-[#ffde00]"
						>
							<Linkedin className="h-5 w-5" />
							<span className="sr-only">LinkedIn</span>
						</Link>
						<Link
							target="_blank"
							href="https://github.com/ryryry-3302"
							className="text-white/60 transition-colors hover:text-[#ffde00]"
						>
							<Github className="h-5 w-5" />
							<span className="sr-only">GitHub</span>
						</Link>
					</div>

					<Link
						href="/projects"
						className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-white/60 transition-colors hover:text-[#ffde00]"
					>
						<ArrowLeft className="h-4 w-4" />
						Back
					</Link>
				</div>
			</div>

			<div className="relative min-h-[72vh] overflow-hidden md:min-h-[76vh]">
				<div className="absolute inset-0">
					<CoverMedia project={project} />
					<div className="absolute inset-0 bg-gradient-to-t from-[#1a0d2e] via-[#1a0d2e]/60 to-[#1a0d2e]/25" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,222,0,0.16),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(77,112,224,0.22),transparent_30%)]" />
				</div>

				<div className="container relative z-10 mx-auto flex min-h-[72vh] items-end px-6 pb-12 pt-28 md:min-h-[76vh] md:pb-16 lg:px-8">
					<div className="max-w-4xl">
						<div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-normal text-[#ffde00]">
							{project.category ? <span>{project.category}</span> : null}
							{project.category && date ? (
								<span className="h-1 w-1 rounded-full bg-[#ffde00]/60" />
							) : null}
							{date ? <span>{date}</span> : null}
						</div>

						<h1 className="mt-5 font-display text-5xl leading-[0.95] text-[#fff7df] md:text-7xl lg:text-8xl">
							{project.title}
						</h1>
						<p className="mt-6 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
							{project.description}
						</p>

						{links.length > 0 ? (
							<div className="mt-8 flex flex-wrap gap-3">
								{links.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										target="_blank"
										className="inline-flex items-center gap-2 rounded-lg border border-[#ffde00]/20 bg-[#ffde00]/10 px-4 py-3 text-sm font-semibold text-[#fff2bf] no-underline transition-colors hover:border-[#ffde00]/50 hover:bg-[#ffde00]/15"
									>
										{link.icon}
										{link.label}
									</Link>
								))}
							</div>
						) : null}
					</div>
				</div>
			</div>
		</header>
	);
};
