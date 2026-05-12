import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
}

export const usePagination = <T>({
  data,
  itemsPerPage = 5,
}: UsePaginationProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: "1" });
    }
  }, [searchParams, setSearchParams]);

  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const setCurrentPage = (page: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    currentData,
    setCurrentPage,
    nextPage,
    prevPage,
  };
};
