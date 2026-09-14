import fs from "node:fs/promises";
import path from "node:path";
import { bundleMDX } from "mdx-bundler";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type MdxPlugin = NonNullable<
	Parameters<typeof bundleMDX<ProjectFrontmatter>>[0]["mdxOptions"]
> extends (options: infer Options) => unknown
	? Options extends { remarkPlugins?: Array<infer Plugin> }
		? Plugin
		: never
	: never;

type PrettyCodeNode = {
	children: Array<unknown>;
	properties: {
		className: Array<string>;
	};
};

export type Project = {
	_id: string;
	type: "Project";
	published?: boolean;
	title: string;
	description: string;
	category?: string;
	date?: string;
	previewType?: string;
	previewSrc?: string;
	previewPoster?: string;
	previewAlt?: string;
	featured?: boolean;
	url?: string;
	repository?: string;
	body: {
		code: string;
		raw: string;
	};
	path: string;
	slug: string;
};

type ProjectFrontmatter = Omit<Project, "_id" | "type" | "body" | "path" | "slug">;

const projectsDirectory = path.join(process.cwd(), "content/projects");

async function getProjectFileNames() {
	const entries = await fs.readdir(projectsDirectory, { withFileTypes: true });

	return entries
		.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
		.map((entry) => entry.name)
		.sort();
}

async function readProject(fileName: string): Promise<Project> {
	const fullPath = path.join(projectsDirectory, fileName);
	const source = await fs.readFile(fullPath, "utf8");
	const slug = fileName.replace(/\.mdx$/, "");
	const { code, frontmatter } = await bundleMDX<ProjectFrontmatter>({
		source,
		cwd: projectsDirectory,
		mdxOptions(options) {
			options.remarkPlugins = [
				...(options.remarkPlugins ?? []),
				remarkGfm as MdxPlugin,
			];
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeSlug as MdxPlugin,
				[
					rehypePrettyCode,
					{
						theme: "github-dark",
						onVisitLine(node: PrettyCodeNode) {
							if (node.children.length === 0) {
								node.children = [{ type: "text", value: " " }];
							}
						},
						onVisitHighlightedLine(node: PrettyCodeNode) {
							node.properties.className.push("line--highlighted");
						},
						onVisitHighlightedWord(node: PrettyCodeNode) {
							node.properties.className = ["word--highlighted"];
						},
					},
				] as MdxPlugin,
				[
					rehypeAutolinkHeadings,
					{
						properties: {
							className: ["subheading-anchor"],
							ariaLabel: "Link to section",
						},
					},
				] as MdxPlugin,
			];

			return options;
		},
	});

	return {
		...frontmatter,
		_id: `projects/${fileName}`,
		type: "Project",
		body: {
			code,
			raw: source,
		},
		path: `/projects/${slug}`,
		slug,
	};
}

export async function getAllProjects() {
	const fileNames = await getProjectFileNames();

	return Promise.all(fileNames.map(readProject));
}

export async function getProject(slug: string) {
	const projects = await getAllProjects();

	return projects.find((project) => project.slug === slug);
}
