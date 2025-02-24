import React from "react";

interface VideoSectionProps {
	videoUrl: string | null | undefined; // Allow null or undefined
}

export default function VideoSection({
	videoUrl,
}: Readonly<VideoSectionProps>) {
	const getEmbedUrl = (url: string | null | undefined): string | null => {
		//Allow null or undefined
		if (!url) return null; // Handle null or undefined

		try {
			const regExp =
				/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})+$/;
			const match = url.match(regExp);
			const videoId = match ? match[1] : null;

			if (!videoId) return null;

			return `https://www.youtube.com/embed/${videoId}?controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=1&playsinline=1`;
		} catch (error) {
			console.error("Error parsing video URL:", error);
			return null;
		}
	};

	const embedUrl = getEmbedUrl(videoUrl);

	if (!embedUrl) {
		return (
			<div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg">
				<p>Invalid video URL</p>
			</div>
		);
	}

	return (
		<div className="relative w-full max-w-4xl mx-auto overflow-hidden pt-[56.25%]">
			<iframe
				className="absolute top-0 left-0 w-full h-full"
				width="560"
				height="315"
				src={embedUrl}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
			/>
		</div>
	);
}
