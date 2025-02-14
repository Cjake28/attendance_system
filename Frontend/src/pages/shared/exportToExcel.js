import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import {convertTOAMPM, formatDate} from '../../utils/formatDate.js';
export const exportToExcel = async (data, fileName = "Attendance.xlsx") => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Attendance");

  // Add header row
  worksheet.addRow(["Name", "Section", "Date", "Time In", "Time Out"]);

  // Add data rows
  data.forEach((row) => {
    worksheet.addRow([row.name, row.section, formatDate(row.log_date), convertTOAMPM(row.time_in), convertTOAMPM(row.time_out)]);
  });

  // Generate buffer and save as a file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, fileName);
};