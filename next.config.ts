import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				// allow any domain and subdomain
				hostname: "**",
			},
		],
	},
};

export default nextConfig;
