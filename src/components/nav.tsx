import Link from "next/link";
import Wrapper from "./wrapper";
import { ModeToggle } from "./dark-mode-toggle";

// this is a navbar for an anime page
const navLinks = [
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
		path: "/tvSeries",
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
		<header>
			<Wrapper className="flex justify-between items-center py:10 md:py-12">
				<nav>
					<ul className="flex items-center gap-10 flex-1">
						{navLinks.map((nav) => (
							<Link href={nav.path} key={nav.id} className="p-4 capitalize">
								{nav.text}
							</Link>
						))}
						<ModeToggle />
					</ul>
				</nav>
			</Wrapper>
		</header>
	);
}
