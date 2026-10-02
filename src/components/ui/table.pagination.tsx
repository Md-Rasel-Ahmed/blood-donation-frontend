import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const getPaginationButton = (currentPage: number, totalPage: number) => {
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }).map((item, index) => index + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPage];
  }
  if (currentPage >= totalPage - 2) {
    return [1, "...", totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPage,
  ];
};

export function TablePagination({ ...props }) {
  console.log(props);
  const getTotalPages = getPaginationButton(
    props?.currentPage,
    props?.totalPage,
  );

  return (
    <Pagination>
      <PaginationContent>
        {/* prev */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => props.setCurrentPage(props.currentPage - 1)}
            aria-disabled={props.currentPage === 1}
            className={
              props.currentPage === 1
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>

        {getTotalPages?.map((page, index) => {
          return page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationLink
                isActive={props.currentPage === page}
                onClick={() => {
                  props.setCurrentPage(Number(page));
                }}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {/* next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => props.setCurrentPage(props.currentPage + 1)}
            aria-disabled={props.currentPage === Number(props.totalPage)}
            className={
              props.currentPage === Number(props.totalPage)
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
