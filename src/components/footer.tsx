import Link from "next/link";
import Wrapper from "./wrapper";

// Footer Component
export const Footer = () => {
	return (
		<footer className="bg-gray-900">
			<Wrapper>
				<div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h2 className="text-xl font-bold text-white mb-4">AniWise</h2>
						<p className="text-gray-400">
							Your ultimate anime discovery platform with thousands of titles to
							explore.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-medium text-white mb-4">Explore</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/top-anime"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Top Anime
								</Link>
							</li>
							<li>
								<Link
									href="/seasonal"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Seasonal Anime
								</Link>
							</li>
							<li>
								<Link
									href="/genres"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Genres
								</Link>
							</li>
							<li>
								<Link
									href="/studios"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Studios
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-medium text-white mb-4">Account</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/profile"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Profile
								</Link>
							</li>
							<li>
								<Link
									href="/watchlist"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Watchlist
								</Link>
							</li>
							<li>
								<Link
									href="/history"
									className="text-gray-400 hover:text-white transition-colors"
								>
									History
								</Link>
							</li>
							<li>
								<Link
									href="/settings"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Settings
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-medium text-white mb-4">Legal</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/terms"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/copyright"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Copyright
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="py-6 border-t border-gray-800">
					<p className="text-center text-gray-500">
						© 2025 AniWise. All rights reserved.
					</p>
				</div>
			</Wrapper>
		</footer>
	);
};
