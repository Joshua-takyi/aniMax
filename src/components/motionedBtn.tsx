"use client";
import Link from "next/link";
import { useState } from "react";
import { MotionDiv } from "./motion";

export const MotionedBtn = ({ text }: { text: string }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link href={"/series"} className="inline-block">
			<button
				className="relative overflow-hidden rounded-full bg-[#00AEEF] px-6 py-3 cursor-pointer"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<MotionDiv
					className="absolute inset-0 rounded-full"
					initial={{ width: 0 }}
					animate={{
						width: isHovered ? "100%" : "0%",
						backgroundColor: "red",
					}}
					transition={{
						duration: 0.5,
						ease: [0.6, 0.05, -0.01, 0.9],
					}}
				/>
				<span className="relative z-10 font-bold text-black uppercase">
					{text}
				</span>
			</button>
		</Link>
	);
};
