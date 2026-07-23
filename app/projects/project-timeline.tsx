import type { Project } from "contentlayer/generated";
import Link from "next/link";
import { ArrowUpRight, Github, Globe2 } from "lucide-react";

type TimelineProject = Project & {
	category: string;
	previewType: string;
	previewSrc: string;
	previewPoster?: string;
	previewAlt: string;
	featured?: boolean;
};

type Props = {
	featuredProjects: TimelineProject[];
	projects: TimelineProject[];
	headlineClassName: string;
	bodyClassName: string;
	featuredLabel?: string;
	fullTimelineLabel?: string;
	showFeaturedLabel?: boolean;
};

const categoryStyles: Record<string, string> = {
	AI: "border-[#f3b45a]/30 bg-[#f3b45a]/10 text-[#f7c983]",
	Automation: "border-[#c7b7ff]/30 bg-[#c7b7ff]/10 text-[#d9cdff]",
	Embedded: "border-[#7dd3c7]/30 bg-[#7dd3c7]/10 text-[#c7f4ec]",
	Fintech: "border-[#84b6ff]/30 bg-[#84b6ff]/10 text-[#d8e8ff]",
	Hardware: "border-[#ff9b7a]/30 bg-[#ff9b7a]/10 text-[#ffd6c9]",
	Robotics: "border-[#86d39a]/30 bg-[#86d39a]/10 text-[#d3f5da]",
	Web: "border-[#b7a4ff]/30 bg-[#b7a4ff]/10 text-[#e5deff]",
};

function formatDate(date?: string) {
	if (!date) {
		return { short: "Soon", year: "TBD" };
	}

	const value = new Date(date);
	return {
		short: Intl.DateTimeFormat("en-US", {
			month: "short",
			year: "numeric",
		}).format(value),
		year: Intl.DateTimeFormat("en-US", {
			year: "numeric",
		}).format(value),
	};
}

function getCategoryClasses(category: string) {
	return categoryStyles[category] ?? "border-white/15 bg-white/5 text-white/75";
}

function ProjectPreview({
	project,
	featured,
}: {
	project: TimelineProject;
	featured: boolean;
}) {
	const heightClass = featured
		? "min-h-[22rem] md:min-h-[28rem]"
		: "min-h-[18rem] md:min-h-[22rem]";

	if (project.previewType === "video") {
		return (
			<div className={`relative overflow-hidden bg-[#111723] ${heightClass}`}>
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
				<div className="absolute inset-0 bg-gradient-to-tr from-[#09111d]/70 via-transparent to-[#d4a75d]/10" />
			</div>
		);
	}

	if (project.previewType === "embed") {
		return (
			<div className={`relative overflow-hidden bg-[#111723] ${heightClass}`}>
				<iframe
					className="absolute inset-0 h-full w-full scale-[1.02] pointer-events-none"
					src={project.previewSrc}
					title={project.previewAlt}
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
				<div className="absolute inset-0 bg-gradient-to-tr from-[#09111d]/80 via-[#09111d]/15 to-[#d4a75d]/10" />
			</div>
		);
	}

	return (
		<div className={`relative overflow-hidden bg-[#111723] ${heightClass}`}>
			<img
				src={project.previewSrc}
				alt={project.previewAlt}
				loading="lazy"
				className="h-full w-full object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-tr from-[#09111d]/75 via-transparent to-[#d4a75d]/10" />
		</div>
	);
}

function ProjectEntry({
	project,
	index,
	featured = false,
	headlineClassName,
	bodyClassName,
}: {
	project: TimelineProject;
	index: number;
	featured?: boolean;
	headlineClassName: string;
	bodyClassName: string;
}) {
	const date = formatDate(project.date);
	const reverse = !featured && index % 2 === 1;

	return (
		<article className="group relative grid gap-5 lg:grid-cols-[9rem,1fr] lg:gap-8">
			<div className="hidden lg:flex lg:flex-col lg:items-end lg:pt-8">
				<span className="text-[0.72rem] uppercase tracking-[0.32em] text-white/35">
					{date.year}
				</span>
				<span className="mt-3 h-16 w-px bg-gradient-to-b from-[#d4a75d]/60 to-white/10" />
			</div>

			<div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f1622]/92 shadow-[0_30px_120px_rgba(3,8,18,0.55)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:border-[#d4a75d]/30">
				<Link
					href={`/projects/${project.slug}`}
					className="absolute inset-0 z-20 rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1c27d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b111b]"
				>
					<span className="sr-only">View details for {project.title}</span>
				</Link>

				<div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(212,167,93,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(110,124,155,0.18),transparent_30%)]" />

				<div
					className={`relative z-10 grid ${
						featured
							? "xl:grid-cols-[1.2fr,0.8fr]"
							: "xl:grid-cols-[1.05fr,0.95fr]"
					}`}
				>
					<div className={reverse ? "xl:order-2" : undefined}>
						<ProjectPreview project={project} featured={featured} />
					</div>

					<div
						className={`flex flex-col justify-between gap-8 p-6 md:p-8 xl:p-10 ${
							reverse ? "xl:order-1" : undefined
						}`}
					>
						<div>
							<div className="flex flex-wrap items-center gap-3">
								<span
									className={`rounded-full border px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.24em] ${getCategoryClasses(
										project.category,
									)}`}
								>
									{project.category}
								</span>
								<span className="text-[0.72rem] uppercase tracking-[0.28em] text-white/45">
									{date.short}
								</span>
								{project.featured ? (
									<span className="rounded-full border border-[#f1c27d]/25 bg-[#f1c27d]/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-[#f3cf9f]">
										Featured
									</span>
								) : null}
							</div>

							<h2
								className={`mt-5 text-3xl leading-none text-[#f5efe2] md:text-5xl ${
									featured ? "xl:text-6xl" : ""
								} ${headlineClassName}`}
							>
								{project.title}
							</h2>

							<p
								className={`mt-5 max-w-2xl text-sm leading-7 text-white/72 md:text-base ${bodyClassName}`}
							>
								{project.description}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.22em] text-white/45">
							{project.repository ? (
								<span className="inline-flex items-center gap-2">
									<Github className="h-3.5 w-3.5" />
									Code
								</span>
							) : null}
							{project.url ? (
								<span className="inline-flex items-center gap-2">
									<Globe2 className="h-3.5 w-3.5" />
									Live demo
								</span>
							) : null}
							<span className="inline-flex items-center gap-2 text-[#f1c27d]">
								View more
								<ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export function ProjectTimeline({
	featuredProjects,
	projects,
	headlineClassName,
	bodyClassName,
	featuredLabel = "Featured work",
	fullTimelineLabel = "Full timeline",
	showFeaturedLabel = true,
}: Props) {
	return (
		<div className="space-y-12 md:space-y-14">
			{featuredProjects.length > 0 ? (
				<section className="space-y-10">
					{showFeaturedLabel ? (
						<div className="flex items-center gap-4">
							<p className="shrink-0 text-[0.7rem] uppercase tracking-[0.36em] text-white/45">
								{featuredLabel}
							</p>
							<span className="h-px flex-1 bg-white/10" />
						</div>
					) : null}
					<div className="space-y-8">
						{featuredProjects.map((project, index) => (
							<ProjectEntry
								key={project.slug}
								project={project}
								index={index}
								featured
								headlineClassName={headlineClassName}
								bodyClassName={bodyClassName}
							/>
						))}
					</div>
				</section>
			) : null}

			{projects.length > 0 ? (
				<section className="space-y-10">
					<div className="flex items-center gap-4">
						<p className="shrink-0 text-[0.7rem] uppercase tracking-[0.36em] text-white/45">
							{fullTimelineLabel}
						</p>
						<span className="h-px flex-1 bg-white/10" />
					</div>

					<div className="space-y-8">
						{projects.map((project, index) => (
							<ProjectEntry
								key={project.slug}
								project={project}
								index={index}
								headlineClassName={headlineClassName}
								bodyClassName={bodyClassName}
							/>
						))}
					</div>
				</section>
			) : null}
		</div>
	);
}
