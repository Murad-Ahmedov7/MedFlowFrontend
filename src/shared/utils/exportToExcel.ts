import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = <T>(
  data: T[],
  fileName: string,
) => {
  if (!data.length) return;

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const columns = Object.keys(
    data[0] || {},
  );

  worksheet["!cols"] = columns.map(
    (column) => {
      const maxLength = Math.max(
        column.length,

        ...data.map((row) =>
          String(
            row[
              column as keyof typeof row
            ] || "",
          ).length,
        ),
      );

      return {
        wch: maxLength + 5,
      };
    },
  );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Sheet1",
  );

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    },
  );

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/octet-stream",
    },
  );

  saveAs(file, `${fileName}.xlsx`);
};