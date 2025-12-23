"use client";
import { ArrowLeft, Github, Linkedin} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
	project: {
		url?: string;
		title: string;
		description: string;
		repository?: string;
	};
};
export const Header: React.FC<Props> = ({ project }) => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
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
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-pokemon-darkblue"
		>
			<div
				className={`fixed inset-x-0 top-0 z-50 duration-200 border-b-4 ${
					isIntersecting
						? "bg-transparent border-transparent"
						: "bg-pokemon-darkblue border-pokemon-blue shadow-lg"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link target="_blank" href="https://www.linkedin.com/in/ryanjasperkoleong/">
							<Linkedin
								className={`w-6 h-6 duration-200 ${
									isIntersecting
										? " text-white/60 hover:text-pokemon-yellow"
										: "text-white hover:text-pokemon-yellow"
								} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/ryryry-3302">
							<Github
								className={`w-6 h-6 duration-200 ${
									isIntersecting
										? " text-white/60 hover:text-pokemon-yellow"
										: "text-white hover:text-pokemon-yellow"
								} `}
							/>
						</Link>
					</div>

					<Link
						href="/projects"
						className={`duration-200 flex items-center gap-2 font-pixel text-xs ${
							isIntersecting
								? " text-white/60 hover:text-pokemon-yellow"
								: "text-white hover:text-pokemon-yellow"
						} `}
					>
						<ArrowLeft className="w-4 h-4 " />
						BACK
					</Link>
				</div>
			</div>
			<div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className="text-2xl md:text-4xl font-pixel text-pokemon-yellow pokemon-glow uppercase tracking-tighter">
							{project.title}
						</h1>
						<p className="mt-6 text-xs md:text-sm font-pixel leading-relaxed text-white/80">
							{project.description}
						</p>
					</div>

					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="flex flex-wrap justify-center gap-6">
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									target="_blank"
									className="px-6 py-3 bg-pokemon-blue text-white font-pixel text-xs pixel-border hover:bg-pokemon-darkblue transition-colors"
								>
									▶ {link.label.toUpperCase()}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
