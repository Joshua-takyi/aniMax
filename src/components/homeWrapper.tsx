import { ReactNode } from "react";
export default function HomeWrapper({
	children,
	className,
}: Readonly<{ children: ReactNode; className?: string }>) {
	return (
		<section className={`max-w-[90rem] mx-auto ${className}`}>
			{children}
		</section>
	);
}
