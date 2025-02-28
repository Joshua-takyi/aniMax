import { ReactNode } from "react";
import MainNav from "../(with-nav)/component/nav";
interface LayoutProps {
	children: ReactNode;
}
export default function Layout({ children }: Readonly<LayoutProps>) {
	return (
		<main>
			<MainNav />
			{children}
		</main>
	);
}
