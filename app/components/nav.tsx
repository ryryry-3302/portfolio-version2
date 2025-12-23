"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const navItems = [
	{ name: "Home", href: "/#home" },
	{ name: "About", href: "/#about" },
	{ name: "Experience", href: "/#experience" },
	{ name: "Projects", href: "/projects" },
	{ name: "Skills", href: "/#skills" },
	{ name: "Contact", href: "/contact" },
];

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const [activeSection, setActiveSection] = useState("");
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (pathname !== "/") return;

		const handleScroll = () => {
			const sections = ["home", "about", "experience", "skills"];
			const scrollPosition = window.scrollY + 100;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [pathname]);

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (href.startsWith("/#")) {
			e.preventDefault();
			const id = href.replace("/#", "");
			
			// If we're on the homepage, just scroll to the section
			if (pathname === "/") {
				const element = document.getElementById(id);
				if (element) {
					element.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			} else {
				// If we're on a different page, navigate to homepage with hash
				router.push(`/#${id}`);
			}
		}
	};

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 duration-200 border-b-4 ${
					isIntersecting && pathname === "/"
						? "bg-black/20 backdrop-blur-sm border-transparent"
						: "bg-pokemon-darkblue/90 backdrop-blur-md border-pokemon-blue shadow-lg"
				}`}
			>
				<div className="container flex flex-col md:flex-row items-center justify-between p-4 md:p-6 mx-auto gap-4">
					<Link
						href="/"
						className="text-lg md:text-xl font-pixel text-pokemon-yellow pokemon-glow uppercase tracking-tighter"
					>
						RYAN LEONG
					</Link>
					<nav className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
						{navItems.map((item) => {
							const isActive =
								(pathname === "/" &&
								item.href.startsWith("/#") &&
								activeSection === item.href.replace("/#", "")) ||
								(pathname === item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={(e) => handleNavClick(e, item.href)}
									className={`text-sm md:text-base font-pixel transition-all duration-200 flex items-center gap-1 ${
										isActive
											? "text-pokemon-yellow scale-110"
											: "text-white hover:text-pokemon-yellow hover:scale-105"
									}`}
								>
									{isActive && <span className="animate-pulse">▶</span>}
									{item.name.toUpperCase()}
								</Link>
							);
						})}
					</nav>
				</div>
			</div>
		</header>
	);
};
