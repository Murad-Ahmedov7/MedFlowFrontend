import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  const pages = [];

  const { t } = useTranslation();

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-3 py-1 text-gray-500 disabled:opacity-40"
      >
        {t("pagination.previous")}
      </button>

      {pages.map((page) => {
        const isActive = currentPage === page;

        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg border transition
                ${
                  isActive
                    ? "bg-white shadow font-semibold"
                    : "border-transparent text-gray-600 hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          );
        }

        if (page === currentPage - 2 || page === currentPage + 2) {
          return (
            <span key={page} className="px-1 text-gray-400">
              ...
            </span>
          );
        }

        return null;
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-3 py-1 text-gray-500 disabled:opacity-40"
      >
        {t("pagination.next")}
      </button>
    </div>
  );
};

export default Pagination;

// Pagination üçün page query param əlavə edildi
// Hazırda pagination frontend tərəfində idarə olunur,
// çünki data sayı azdır və backend pagination-a ehtiyac yoxdur


