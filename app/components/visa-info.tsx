"use client";
import { motion } from "framer-motion";
import React from "react";

export const VisaInfo: React.FC = () => {
	return (
		<motion.div
			id="visa-info"
			initial={{ opacity: 0, scale: 0.9 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className="max-w-4xl mx-auto my-12 px-6"
		>
			<div className="pokemon-textbox">
				<h3 className="font-pixel text-sm md:text-base mb-4 text-pokemon-blue">
					▶ WORK AUTHORIZATION INFO
				</h3>
				<div className="space-y-4 font-pixel text-[10px] md:text-xs leading-relaxed">
					<p>
						<span className="text-pokemon-red">H1B1 (Singapore/Chile):</span> A fast-track alternative to the H1B. Unlike the H1B lottery, H1B1 is quota-based and usually available year-round for Singaporeans as it is historically undersubscribed.
					</p>
					<p>
						<span className="text-pokemon-blue">SIMILARITY:</span> Like the <span className="text-pokemon-green">TN (Canada/Mexico)</span> and <span className="text-pokemon-gold">E-3 (Australia)</span> visas, the H1B1 is profession-specific and requires a job offer, but avoids the complex lottery system.
					</p>
					<p>
						<span className="text-pokemon-darkblue">NOTE:</span> These visas are often easier and faster to process than the standard H1B, making it simpler for US employers to hire talent from these specific countries.
					</p>
				</div>
			</div>
		</motion.div>
	);
};
