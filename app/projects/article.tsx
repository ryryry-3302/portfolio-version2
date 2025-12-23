import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";

type Props = {
	project: Project;
};

export const Article: React.FC<Props> = ({ project }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center mb-4">
					<span className="text-xs text-gray-300 font-pixel">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
				</div>
				<h2 className="z-20 text-sm md:text-base font-pixel text-pokemon-yellow pokemon-glow uppercase tracking-tighter group-hover:text-white transition-colors">
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-xs md:text-sm font-pixel leading-relaxed text-gray-200 group-hover:text-white transition-colors">
					{project.description}
				</p>
				<div className="mt-6">
					<span className="text-xs font-pixel text-pokemon-blue group-hover:text-pokemon-yellow transition-colors">
						▶ VIEW DATA
					</span>
				</div>
			</article>
		</Link>
	);
};
