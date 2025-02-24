import React from "react";

export default function Wrapper({
	children,
	className,
}: Readonly<{
	children: React.ReactNode;
	className?: string;
}>) {
	return (
		<section className={`container mx-auto px-4 md:px-8 lg:px-40 ${className}`}>
			{children}
		</section>
	);
}
