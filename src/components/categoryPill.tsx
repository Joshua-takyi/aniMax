import { JSX } from "react";
export const CategoryPill = ({
	name,
	icon,
}: {
	name: string;
	icon: JSX.Element;
}) => {
	return (
		<div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full cursor-pointer transition-colors">
			{icon}
			<span className="text-sm font-medium text-white">{name}</span>
		</div>
	);
};
