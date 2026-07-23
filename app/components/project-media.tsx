"use client";

import {
	ChevronLeft,
	ChevronRight,
	ExternalLink,
	Maximize2,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";

type MediaItem = {
	type: "image" | "video";
	src: string;
	poster?: string;
	alt: string;
	caption: string;
};

type ResourceLink = {
	label: string;
	href: string;
	description?: string;
};

function MediaAsset({
	item,
	expanded = false,
}: {
	item: MediaItem;
	expanded?: boolean;
}) {
	if (item.type === "video") {
		return (
			<video
				key={`${item.src}-${expanded ? "expanded" : "inline"}`}
				className="h-full w-full object-contain"
				controls={expanded}
				autoPlay={!expanded}
				muted
				loop={!expanded}
				playsInline
				preload="metadata"
				poster={item.poster}
				aria-label={item.alt}
			>
				<source src={item.src} />
				Your browser does not support the video tag.
			</video>
		);
	}

	return (
		<img
			key={item.src}
			src={item.src}
			alt={item.alt}
			loading="lazy"
			className="h-full w-full object-contain"
		/>
	);
}

export function MediaCarousel({
	items,
	title,
}: {
	items: MediaItem[];
	title?: string;
}) {
	const [active, setActive] = useState(0);
	const [expanded, setExpanded] = useState(false);
	const item = items[active];

	const goTo = (direction: -1 | 1) => {
		setActive((current) => (current + direction + items.length) % items.length);
	};

	useEffect(() => {
		if (!expanded) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setExpanded(false);
			if (event.key === "ArrowLeft") goTo(-1);
			if (event.key === "ArrowRight") goTo(1);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [expanded, items.length]);

	if (items.length === 0 || !item) return null;

	return (
		<figure className="project-media my-10 overflow-hidden rounded-lg border border-white/10 bg-[#160d28]/80 shadow-[0_24px_80px_rgba(10,4,25,0.35)]">
			{title ? (
				<div className="border-b border-white/10 px-4 py-3 md:px-5">
					<figcaption className="text-xs font-semibold uppercase tracking-normal text-[#ffde00]">
						{title}
					</figcaption>
				</div>
			) : null}

			<div className="relative bg-[#0b0714]">
				<button
					type="button"
					onClick={() => setExpanded(true)}
					className="group relative block aspect-video w-full overflow-hidden"
				>
					<MediaAsset item={item} />
					<span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition-colors group-hover:border-[#ffde00]/60 group-hover:text-[#ffde00]">
						<Maximize2 className="h-4 w-4" />
						<span className="sr-only">Expand media</span>
					</span>
				</button>

				{items.length > 1 ? (
					<>
						<button
							type="button"
							onClick={() => goTo(-1)}
							className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition-colors hover:border-[#ffde00]/60 hover:text-[#ffde00]"
						>
							<ChevronLeft className="h-5 w-5" />
							<span className="sr-only">Previous media</span>
						</button>
						<button
							type="button"
							onClick={() => goTo(1)}
							className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur transition-colors hover:border-[#ffde00]/60 hover:text-[#ffde00]"
						>
							<ChevronRight className="h-5 w-5" />
							<span className="sr-only">Next media</span>
						</button>
					</>
				) : null}
			</div>

			<div className="space-y-4 px-4 py-4 md:px-5">
				<p className="text-sm leading-6 text-[#f5efe2]/80">{item.caption}</p>

				{items.length > 1 ? (
					<div className="grid grid-cols-3 gap-2 md:grid-cols-6">
						{items.map((media, index) => (
							<button
								type="button"
								key={media.src}
								onClick={() => setActive(index)}
								className={`aspect-video overflow-hidden rounded border transition-colors ${
									index === active
										? "border-[#ffde00]"
										: "border-white/10 hover:border-white/40"
								}`}
							>
								<MediaAsset item={media} />
								<span className="sr-only">Show {media.caption}</span>
							</button>
						))}
					</div>
				) : null}
			</div>

			{expanded ? (
				<div className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
					<button
						type="button"
						onClick={() => setExpanded(false)}
						className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-[#ffde00]/60 hover:text-[#ffde00]"
					>
						<X className="h-5 w-5" />
						<span className="sr-only">Close expanded media</span>
					</button>
					<div className="max-h-[86vh] w-full max-w-6xl">
						<div className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-black">
							<MediaAsset item={item} expanded />
						</div>
						<p className="mt-4 text-sm leading-6 text-white/75">
							{item.caption}
						</p>
					</div>
				</div>
			) : null}
		</figure>
	);
}

export function ResourceLinks({ links }: { links: ResourceLink[] }) {
	return (
		<div className="my-8 grid gap-3 sm:grid-cols-2">
			{links.map((link) => (
				<a
					key={link.href}
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					className="group rounded-lg border border-[#ffde00]/20 bg-[#ffde00]/10 p-4 no-underline transition-colors hover:border-[#ffde00]/50 hover:bg-[#ffde00]/15"
				>
					<span className="flex items-center justify-between gap-4 text-sm font-semibold text-[#fff2bf]">
						{link.label}
						<ExternalLink className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
					</span>
					{link.description ? (
						<span className="mt-2 block text-sm leading-6 text-white/60">
							{link.description}
						</span>
					) : null}
				</a>
			))}
		</div>
	);
}
