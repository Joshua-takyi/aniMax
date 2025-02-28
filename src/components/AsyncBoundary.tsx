import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface AsyncBoundaryProps {
	children: React.ReactNode;
	loadingFallback: React.ReactNode;
	errorFallback: React.ComponentType<{
		error: Error;
		resetErrorBoundary: () => void;
	}>;
}

export function AsyncBoundary({
	children,
	loadingFallback,
	errorFallback,
}: AsyncBoundaryProps) {
	return (
		<ErrorBoundary FallbackComponent={errorFallback}>
			<Suspense fallback={loadingFallback}>{children}</Suspense>
		</ErrorBoundary>
	);
}
