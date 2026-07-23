import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";

export const revalidate = 60;

type Params = {
	slug: string;
};

type Props = {
	params: Promise<Params>;
};

export async function generateStaticParams(): Promise<Params[]> {
	return allProjects
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const project = allProjects.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<div
			data-project-detail="true"
			className="min-h-screen overflow-hidden bg-[#1a0d2e] text-[#f5efe2]"
		>
			<div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,222,0,0.1),transparent_24%),radial-gradient(circle_at_18%_20%,rgba(106,90,205,0.16),transparent_32%),linear-gradient(180deg,#24153f_0%,#1a0d2e_42%,#130a22_100%)]" />
			<Header project={project} />

			<article className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-10 md:px-8 md:pt-14">
				<Mdx code={project.body.code} />
			</article>
		</div>
	);
}
