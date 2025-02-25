import { Loader2 } from "lucide-react";

export default function Loader() {
	return (
		<div className="flex justify-center items-center">
			<Loader2 className="animate-spin h-10 w-10 text-ghost" />
		</div>
	);
}
