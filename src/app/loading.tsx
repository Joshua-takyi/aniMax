// import { motion } from "framer-motion";

import { MotionDiv } from "@/components/motion";

export default function Loader() {
	return (
		<div className="flex items-center justify-center w-full py-10 gap-2">
			<MotionDiv
				className="w-3 h-3 rounded-full bg-slate-500"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [1, 0.5, 1],
				}}
				transition={{
					duration: 1,
					repeat: Infinity,
					delay: 0,
				}}
			/>
			<MotionDiv
				className="w-3 h-3 rounded-full bg-slate-600"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [1, 0.5, 1],
				}}
				transition={{
					duration: 1,
					repeat: Infinity,
					delay: 0.2,
				}}
			/>
			<MotionDiv
				className="w-3 h-3 rounded-full bg-slate-700"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [1, 0.5, 1],
				}}
				transition={{
					duration: 1,
					repeat: Infinity,
					delay: 0.4,
				}}
			/>
		</div>
	);
}
