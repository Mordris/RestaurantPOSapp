// src/utils/generateReceipt.js
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure to include this if you're using table functionalities

const generateReceipt = ({ table, products, price, orderNo }) => {
  const doc = new jsPDF();
  const now = new Date(); // Get the current date and time

  // Title
  doc.setFontSize(18);
  doc.text("Receipt", 14, 20);

  // Order No and Table
  doc.setFontSize(12);
  doc.text(`Order No: ${orderNo}`, 14, 30);
  doc.text(`Table: ${table}`, 14, 40);

  // Add Date and Time
  doc.text(`Date: ${now.toLocaleDateString()}`, 14, 50);
  doc.text(`Time: ${now.toLocaleTimeString()}`, 14, 60);

  // Add table with borders
  const tableColumn = ["Product", "Quantity", "Price"];
  const tableRows = products.map((p) => [
    p.product.name,
    p.quantity,
    `$${(p.product.price * p.quantity).toFixed(2)}`,
  ]);

  doc.autoTable({
    startY: 70, // Start Y position for the table
    head: [tableColumn],
    body: tableRows,
    theme: "striped",
    headStyles: { fillColor: [0, 0, 0] },
    styles: {
      cellPadding: 5,
      fontSize: 12,
    },
    margin: { horizontal: 10 },
  });

  // Add total price
  const totalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Total:", 14, totalY);
  doc.text(`$${price.toFixed(2)}`, 190, totalY, { align: "right" });

  // Add Thank You message
  const thankYouY = totalY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your order", 14, thankYouY);

  // Save PDF with name
  return doc.output("bloburl"); // Use 'bloburl' to return a URL for the blob
};

export default generateReceipt;
