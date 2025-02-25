"use client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { useSearchParams } from "next/navigation";

interface PaginationComponentProps {
	totalPages: number;
	currentPage: number;
}

export function PaginationComponent({
	totalPages,
	currentPage,
}: PaginationComponentProps) {
	const searchParams = useSearchParams();

	const createPageUrl = (pageNumber: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", pageNumber.toString());
		return `?${params.toString()}`;
	};

	const renderPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 3;

		for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink href={createPageUrl(i)} isActive={currentPage === i}>
						{i}
					</PaginationLink>
				</PaginationItem>
			);
		}

		if (totalPages > maxVisiblePages) {
			pages.push(
				<PaginationItem key="ellipsis">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}

		return pages;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
						className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>
				{renderPageNumbers()}
				<PaginationItem>
					<PaginationNext
						href={
							currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"
						}
						className={
							currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
