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


//app.tsxde olan commitleri sil


////////////////////////////////logout-u da tercume etdim onu da yaz commmite 

//settings yazdiq yeni passwrod ile profile hissesi

//auth contextde email de elave olundu.




// Admin reset sistemi olsun yeni o her hansi bir userin parolu deyise bilsin.

//lazim olan yerlere role elave et mes router.tsx ve s . lazim deyilse de authorize basligi kimi bir sey et.

//alert true ve alert error ve s mesajlari mutleq tercume et (ve ya ingilis dilinde ele hamisin. fullstack duzelt .)