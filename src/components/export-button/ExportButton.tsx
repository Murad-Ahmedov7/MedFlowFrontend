import { exportToExcel } from "@/shared/utils/exportToExcel";
import { useTranslation } from "react-i18next";
import { FiDownload } from "react-icons/fi";

type ExportButtonProps<T> = {
  data: T[];
  fileName: string;
  disabled?: boolean;
};



export const ExportButton = <T,>({
  
  data,
  fileName,
  disabled,
}: ExportButtonProps<T>) => {
  const { t } = useTranslation();
  return (
    <button
      disabled={disabled}
      onClick={() => exportToExcel(data, fileName)}
      className="
        flex items-center gap-2
        bg-sky-500 hover:bg-sky-600
        text-white
        px-4 py-2
        rounded-lg
        shadow-md
        transition
      "
    >
      <FiDownload size={16} />

      <span className="text-sm font-medium">{t("common.export")}</span>
    </button>
  );
};
