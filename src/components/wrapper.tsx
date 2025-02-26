import React from "react";

export default function Wrapper({
	children,
	className,
}: Readonly<{
	children: React.ReactNode;
	className?: string;
}>) {
	return (
		<section className={`mx-auto px-4 md:px-7 max-w-[90rem] ${className}`}>
			{children}
		</section>
	);
}
