import { ReactNode } from "react";
export default function HomeWrapper({
	children,
	className,
}: Readonly<{ children: ReactNode; className?: string }>) {
	return (
		<section className={`max-w-[95rem] mx-auto ${className}`}>
			{children}
		</section>
	);
}
