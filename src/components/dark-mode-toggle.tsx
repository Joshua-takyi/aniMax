"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "./ui/toggle";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// Ensure component is mounted to avoid hydration mismatch
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="flex items-center gap-2">
			<Toggle
				aria-label="Toggle theme"
				pressed={theme === "dark"}
				onPressedChange={(pressed) => {
					setTheme(pressed ? "dark" : "light");
				}}
				className="relative rounded-lg bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors duration-200 cursor-pointer"
			>
				<Sun className="h-5 w-5 transform transition-transform duration-500 ease-in-out rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-5 w-5 transform transition-transform duration-500 ease-in-out rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
			</Toggle>
		</div>
	);
}
