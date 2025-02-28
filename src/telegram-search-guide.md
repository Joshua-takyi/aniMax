# Implementing Telegram Channel Search API for Anime

This guide explains how to create an API endpoint that uses the Telegram `contacts.search` schema to search for anime channels and redirect users to them.

## Overview

We'll create a Next.js API endpoint that:

1. Receives a search query from the `profile/[id]?q=**` route
2. Uses Telegram's API to search for matching channels
3. Returns the top 10 results
4. Allows users to click and redirect to the selected Telegram channel

## Prerequisites

- Telegram API credentials (api_id and api_hash)
- Node.js and Next.js environment
- `telegram` npm package (or alternative like `gramjs` or `tdlib`)

## Step 1: Set Up Telegram API Access

1. Go to [https://my.telegram.org/apps](https://my.telegram.org/apps) and create an application
2. Note down your `api_id` and `api_hash`
3. Create a `.env.local` file to store these securely:

```
TELEGRAM_API_ID=your_api_id
TELEGRAM_API_HASH=your_api_hash
```

## Step 2: Install Required Dependencies

```bash
npm install telegram mtproto dotenv
```

## Step 3: Create an API Route for Telegram Search

Create a new file at `/src/app/api/telegram-search/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { MTProto } from "mtproto-core";
import { contact } from "telegram/client";

// Initialize Telegram API client
const mtproto = new MTProto({
	api_id: process.env.TELEGRAM_API_ID!,
	api_hash: process.env.TELEGRAM_API_HASH!,
});

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("q") || "";

	if (!query) {
		return NextResponse.json(
			{ error: "Search query is required" },
			{ status: 400 }
		);
	}

	try {
		// Call the contacts.search method from Telegram API
		const result = await mtproto.call("contacts.search", {
			q: query,
			limit: 10,
		});

		// Process the results to format channels properly
		const channels = result.chats.map((chat) => ({
			id: chat.id,
			title: chat.title,
			username: chat.username || null,
			photo: chat.photo ? chat.photo.photo_small : null,
			participantsCount: chat.participants_count || null,
			url: chat.username ? `https://t.me/${chat.username}` : null,
		}));

		return NextResponse.json({ channels });
	} catch (error) {
		console.error("Telegram search error:", error);
		return NextResponse.json(
			{ error: "Failed to search Telegram channels" },
			{ status: 500 }
		);
	}
}
```

## Step 4: Create the Profile Page Component

Create or modify the profile page at `/src/app/profile/[id]/page.tsx`:

```tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface TelegramChannel {
	id: string;
	title: string;
	username: string | null;
	photo: string | null;
	participantsCount: number | null;
	url: string | null;
}

export default function AnimeProfilePage({
	params,
}: {
	params: { id: string };
}) {
	const searchParams = useSearchParams();
	const query = searchParams.get("q");
	const [channels, setChannels] = useState<TelegramChannel[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!query) return;

		const searchTelegramChannels = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`/api/telegram-search?q=${encodeURIComponent(query)}`
				);
				const data = await response.json();

				if (data.channels) {
					setChannels(data.channels);
				}
			} catch (error) {
				console.error("Error fetching channels:", error);
			} finally {
				setLoading(false);
			}
		};

		searchTelegramChannels();
	}, [query]);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">
				Telegram Channels for: {query}
			</h1>

			{loading ? (
				<p>Loading channels...</p>
			) : channels.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{channels.map((channel) => (
						<a
							key={channel.id}
							href={channel.url || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="border rounded-lg p-4 hover:bg-gray-100 transition-colors"
						>
							<div className="flex items-center">
								{channel.photo && (
									<div className="w-12 h-12 mr-3 rounded-full overflow-hidden">
										<Image
											src={channel.photo}
											alt={channel.title}
											width={48}
											height={48}
										/>
									</div>
								)}
								<div>
									<h3 className="font-medium">{channel.title}</h3>
									{channel.username && (
										<p className="text-sm text-gray-500">@{channel.username}</p>
									)}
									{channel.participantsCount && (
										<p className="text-xs text-gray-400">
											{channel.participantsCount.toLocaleString()} members
										</p>
									)}
								</div>
							</div>
						</a>
					))}
				</div>
			) : (
				<p>No channels found. Try a different search term.</p>
			)}
		</div>
	);
}
```

## Step 5: Authentication and Session Management

For the Telegram API to work correctly, you need to implement authentication. This involves:

1. Creating a session storage mechanism
2. Handling login with phone number verification
3. Managing session persistence

This is a complex topic beyond the scope of this guide, but you can use libraries like `telegram` or `gramjs` which provide helper methods for authentication.

## Step 6: Error Handling and Rate Limiting

To make your application robust:

1. Implement proper error handling for API failures
2. Add rate limiting to prevent abuse
3. Cache results to improve performance

```typescript
// Example of adding basic caching
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// In your API route:
const cacheKey = `telegram-search-${query}`;
const cachedResult = cache.get(cacheKey);

if (cachedResult) {
	return NextResponse.json(cachedResult);
}

// ... perform search ...

cache.set(cacheKey, { channels });
```

## Security Considerations

1. Never expose your API credentials in client-side code
2. Use server-side API routes for all Telegram API interactions
3. Implement proper validation for user inputs
4. Consider using a proxy service for rate limiting and additional security

## Additional Resources

- [Telegram API Documentation](https://core.telegram.org/api)
- [MTProto API Documentation](https://core.telegram.org/mtproto)
- [telegram npm package](https://www.npmjs.com/package/telegram)
- [gramjs Documentation](https://gram.js.org/)

## Conclusion

By following this guide, you've created an API endpoint that searches for anime-related Telegram channels based on user queries, and a UI that displays the results and allows users to navigate to those channels. This enhances your anime platform by connecting users with relevant community resources.
