import Link from "next/link";
import Wrapper from "./wrapper";
import logo from "../../public/images/logo.svg";
import Image from "next/image";
import { ModeToggle } from "./dark-mode-toggle";

// this is a navbar for an anime page
export const navLinks = [
	{
		id: 1,
		path: "/",
		text: "Home",
	},
	{
		id: 2,
		path: "/movies",
		text: "movies",
	},
	{
		id: 3,
		path: "/series",
		text: "Tv series",
	},
	{
		id: 4,
		path: "/topAiring",
		text: "top airing",
	},
];
export default function Nav() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 ">
			<Wrapper className="flex justify-between items-center py-4">
				{/* logo */}
				<Image src={logo} alt="my logo" />
				<nav className="w-full text-white">
					<ul className="flex items-center justify-between gap-10">
						<div className="flex items-center gap-10 text-white">
							{navLinks.map((nav) => (
								<Link href={nav.path} key={nav.id} className="p-2 capitalize ">
									{nav.text}
								</Link>
							))}
							<ModeToggle />
						</div>
					</ul>
				</nav>
			</Wrapper>
		</header>
	);
}
