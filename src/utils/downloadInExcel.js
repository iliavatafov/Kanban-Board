import ExcelJS from "exceljs";

export const handleDownload = (tasks) => {
  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  // Create the header row with formatting
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true }; // Set the font to bold
  headerRow.fill = {
    // Set the fill color
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFDCE6F1" }, // Light blue color
  };

  // Define the headers for each column
  const headers = [
    "TITLE",
    "ID",
    "DESCRIPTION",
    "STORYPOINTS",
    "DEADLINE",
    "STATUS",
  ];

  // Add the headers to the header row
  headers.forEach((header, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = header;
  });

  // Add data rows for each task
  tasks.forEach((task, index) => {
    const row = worksheet.addRow([
      task.title,
      task.id,
      task.description,
      task.storyPoints,
      task.deadline,
      task.status,
    ]);

    row.getCell(1).font = { bold: true }; // Set the font to bold for the first cell in each row
    row.getCell(2).alignment = { horizontal: "left" }; // Set the alignment to left for the second cell in each row
  });

  // Write the workbook to a buffer
  workbook.xlsx.writeBuffer().then((buffer) => {
    // Create a blob from the buffer with the appropriate MIME type for Excel
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and set the URL and download attributes
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.xlsx";

    // Programmatically click the link to trigger the download
    link.click();

    // Revoke the URL to free up memory
    window.URL.revokeObjectURL(url);
  });
};
