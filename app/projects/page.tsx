import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { ProjectTimeline } from "./project-timeline";

export const revalidate = 60;

export default async function ProjectsPage() {
	const selectedSlug = "orb-slam3-stereo";
	const featuredOrder = [
		"emf-full-body-tracking",
		"flair-ai",
		"leasy",
		"rnz",
		"medbox-ai",
		"watchdocks",
	];

	const published = allProjects
		.filter((project) => project.published)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.NEGATIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.NEGATIVE_INFINITY).getTime(),
		);

	const selectedProject = published.find(
		(project) => project.slug === selectedSlug,
	);
	const featuredProjects = featuredOrder
		.map((slug) => published.find((project) => project.slug === slug))
		.filter((project): project is typeof published[number] => Boolean(project));
	const excludedSlugs = new Set([
		selectedSlug,
		...featuredProjects.map((project) => project.slug),
	]);
	const remainingProjects = published.filter(
		(project) => !excludedSlugs.has(project.slug),
	);

	return (
		<div
			data-projects-editorial="true"
			className="relative min-h-screen overflow-hidden bg-[#1a0d2e] text-[#f5efe2] font-sans"
		>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,222,0,0.12),transparent_26%),radial-gradient(circle_at_18%_20%,rgba(106,90,205,0.18),transparent_32%),radial-gradient(circle_at_82%_14%,rgba(59,76,202,0.16),transparent_28%),linear-gradient(180deg,#24153f_0%,#1a0d2e_42%,#130a22_100%)]" />
			<div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,rgba(255,255,255,0.32)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.32)_1px,transparent_1px)] [background-size:72px_72px]" />
			<div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#ffde00]/10 via-[#6a5acd]/8 to-transparent blur-3xl" />

			<Navigation />

			<main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-24 md:px-8 md:pt-28 lg:px-12 lg:pt-32">
				<section className="mx-auto max-w-6xl">
					<p className="text-[0.72rem] uppercase tracking-[0.4em] text-[#f1c27d]">
						Selected work
					</p>

					<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[0.72rem] uppercase tracking-[0.32em] text-white/45">
						<span>{published.length} published projects</span>
						<span className="h-1 w-1 rounded-full bg-white/35" />
						<span></span>
						<span className="h-1 w-1 rounded-full bg-white/35" />
						<span></span>
					</div>
				</section>

				<section className="mx-auto mt-10 max-w-6xl md:mt-12">
					{selectedProject ? (
						<div className="mb-12 md:mb-16">
							<ProjectTimeline
								featuredProjects={[selectedProject]}
								projects={[]}
								headlineClassName="font-display"
								bodyClassName="font-sans"
								showFeaturedLabel={false}
							/>
						</div>
					) : null}

					<ProjectTimeline
						featuredProjects={featuredProjects}
						projects={remainingProjects}
						headlineClassName="font-display"
						bodyClassName="font-sans"
						featuredLabel="Featured work"
						fullTimelineLabel="Full timeline"
					/>
				</section>
			</main>
		</div>
	);
}
