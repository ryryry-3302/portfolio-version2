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
    <div className="bg-pokemon-darkblue min-h-screen">
      <Header project={project} />

      <article className="px-4 py-12 mx-auto prose prose-invert prose-quoteless max-w-4xl">
        <div className="pokemon-textbox mb-12">
          <p className="font-pixel text-xs md:text-sm text-pokemon-blue">
            ▶ PROJECT DATA LOADED...
          </p>
        </div>
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}