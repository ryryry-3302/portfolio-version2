// @ts-nocheck
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import { MediaCarousel, ResourceLinks } from "./project-media";

function clsx(...args: any) {
	return args.filter(Boolean).join(" ");
}
const components = {
	h1: ({ className, ...props }) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 font-display text-3xl text-[#fff2bf] md:text-4xl",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }) => (
		<h2
			className={clsx(
				"mt-14 scroll-m-20 border-b border-[#ffde00]/25 pb-3 font-display text-2xl text-[#fff2bf] first:mt-0 md:text-3xl",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }) => (
		<h3
			className={clsx(
				"mt-12 scroll-m-20 font-display text-xl text-[#ffde00] md:text-2xl",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }) => (
		<h4
			className={clsx(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }) => (
		<h5
			className={clsx(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }) => (
		<h6
			className={clsx(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }) => (
		<Link
			className={clsx(
				"font-medium text-[#ffde00] underline decoration-[#ffde00]/35 underline-offset-4 transition-colors hover:text-[#fff2bf]",
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }) => (
		<p
			className={clsx(
				"max-w-3xl text-base leading-8 text-[#f5efe2]/80 [&:not(:first-child)]:mt-5",
				className,
			)}
			{...props}
		/>
	),
	ul: ({ className, ...props }) => (
		<ul
			className={clsx("my-6 ml-6 list-none space-y-3", className)}
			{...props}
		/>
	),
	ol: ({ className, ...props }) => (
		<ol
			className={clsx(
				"my-6 ml-6 list-decimal space-y-3 text-base text-[#f5efe2]/80",
				className,
			)}
			{...props}
		/>
	),
	li: ({ className, ...props }) => (
		<li
			className={clsx(
				"mt-2 flex items-start gap-3 text-base leading-7 text-[#f5efe2]/80",
				className,
			)}
			{...props}
		>
			<span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffde00]" />
			<div className="min-w-0 flex-1">{props.children}</div>
		</li>
	),
	blockquote: ({ className, ...props }) => (
		<blockquote
			className={clsx(
				"mt-8 rounded-lg border border-[#ffde00]/20 bg-[#ffde00]/10 px-5 py-4 italic text-[#f5efe2]/70",
				className,
			)}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx(
				"relative z-[1] my-8 rounded-lg border border-white/10 bg-[#0b0714]",
				className,
			)}
			alt={alt}
			{...props}
		/>
	),
	video: ({
		className,
		...props
	}: React.VideoHTMLAttributes<HTMLVideoElement>) => (
		<video
			className={clsx(
				"relative z-[1] my-8 rounded-lg border border-white/10 bg-[#0b0714]",
				className,
			)}
			{...props}
		/>
	),
	iframe: ({
		className,
		...props
	}: React.IframeHTMLAttributes<HTMLIFrameElement>) => (
		<iframe
			className={clsx(
				"relative z-[1] my-8 rounded-lg border border-white/10 bg-[#0b0714]",
				className,
			)}
			{...props}
		/>
	),
	hr: ({ ...props }) => (
		<hr className="my-4 border-zinc-200 md:my-8" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto">
			<table className={clsx("w-full", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"m-0 border-t border-zinc-300 p-0 even:bg-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }) => (
		<th
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }) => (
		<td
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }) => (
		<code
			className={clsx(
				"relative rounded border bg-zinc-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-600",
				className,
			)}
			{...props}
		/>
	),
	Image: ({ className, ...props }: any) => (
		<Image className={clsx("relative z-[10000]", className)} {...props} />
	),
	MediaCarousel,
	ResourceLinks,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx project-writeup">
			<Component components={components} />
		</div>
	);
}
