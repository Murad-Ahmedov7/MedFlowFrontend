import {
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { useTranslation } from "react-i18next";

import {
  FiChevronDown,
  FiFilter,
} from "react-icons/fi";

type Props = {
  sortOrder:
    | "asc"
    | "desc"
    | null;

  setSortOrder: Dispatch<
    SetStateAction<
      "asc" | "desc" | null
    >
  >;
};

export default function DepartmentsSort({
  sortOrder,
  setSortOrder,
}: Props) {
  const [
    isFilterOpen,
    setIsFilterOpen,
  ] = useState(false);

  const { t } =
    useTranslation();

  return (
    <div className="relative">
      <button
        onClick={() =>
          setIsFilterOpen(
            !isFilterOpen,
          )
        }
        className="
          h-[46px]
          px-4

          rounded-2xl

          border border-gray-200
          bg-white

          shadow-sm
          hover:shadow-md

          flex items-center gap-3

          text-gray-700
          text-sm
          font-medium

          transition-all
        "
      >
        <div
          className="
            w-7 h-7

            rounded-xl

            bg-cyan-50

            flex items-center
            justify-center
          "
        >
          <FiFilter
            size={14}
            className="
              text-cyan-600
            "
          />
        </div>

        <span>
          {!sortOrder
            ? t(
                "departments.sort.default",
              )
            : sortOrder === "asc"
              ? t(
                  "departments.sort.nameAsc",
                )
              : t(
                  "departments.sort.nameDesc",
                )}
        </span>

        <FiChevronDown
          size={16}
          className={`
            text-gray-400

            transition-transform
            duration-200

            ${
              isFilterOpen
                ? "rotate-180"
                : ""
            }
          `}
        />
      </button>

      {isFilterOpen && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-48

            bg-white

            border border-gray-100

            rounded-2xl

            shadow-2xl

            overflow-hidden

            z-50
          "
        >
          <button
            onClick={() => {
              setSortOrder(
                "asc",
              );

              setIsFilterOpen(
                false,
              );
            }}
            className="
              w-full

              flex items-center
              justify-between

              px-5 py-4

              text-sm
              text-gray-700

              hover:bg-cyan-50

              transition
            "
          >
            <span>
              {t(
                "departments.sort.nameAsc",
              )}
            </span>

            {sortOrder ===
              "asc" && (
              <div
                className="
                  w-2 h-2

                  rounded-full

                  bg-cyan-500
                "
              />
            )}
          </button>

          <button
            onClick={() => {
              setSortOrder(
                "desc",
              );

              setIsFilterOpen(
                false,
              );
            }}
            className="
              w-full

              flex items-center
              justify-between

              px-5 py-4

              text-sm
              text-gray-700

              hover:bg-cyan-50

              transition
            "
          >
            <span>
              {t(
                "departments.sort.nameDesc",
              )}
            </span>

            {sortOrder ===
              "desc" && (
              <div
                className="
                  w-2 h-2

                  rounded-full

                  bg-cyan-500
                "
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// Sort URL-də saxlanılmadı, çünki sadəcə frontend sıralamasıdır.

// Filter yox, sort adlandırıldı, çünki data dəyişmir, sadəcə sıralama dəyişir.