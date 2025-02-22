import Link from "next/link";
import Wrapper from "./wrapper";
import logo from "../../public/images/logo.svg";
import { Fragment } from "react";
import Image from "next/image";
import SearchComponent from "./search";
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
		<Fragment>
			<header className="fixed top-0 left-0 right-0 z-50 ">
				<Wrapper className="flex justify-between items-center py-4">
					<nav className="w-full">
						<ul className="flex items-center justify-between gap-10">
							<div className="flex items-center gap-10">
								{navLinks.map((nav) => (
									<Link
										href={nav.path}
										key={nav.id}
										className="p-2 capitalize "
									>
										{nav.text}
									</Link>
								))}
								<ModeToggle />
							</div>
						</ul>
					</nav>
				</Wrapper>
			</header>
			<main className="relative h-[60vh] overflow-hidden">
				<video
					src="/videos/Mylivewallpapers-Com-Full-Moon-Torii-4K.mp4"
					autoPlay
					muted
					loop
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<Wrapper className="relative z-10 h-full flex flex-col items-start justify-center ">
					<div className=" gap-4 flex flex-col ">
						<div className="flex gap-4">
							<h1 className="text-[3.4rem] font-bold">AniWise</h1>
							<Image src={logo} alt="logo" aria-label="logo image" />
						</div>
						<div>
							<SearchComponent />
						</div>
						<p className="text-xl font-medium max-w-3xl text-balance">
							Discover the best anime content, from classic series to the latest
							releases. Your journey into the world of anime starts here.
						</p>
					</div>
				</Wrapper>
			</main>
		</Fragment>
	);
}
