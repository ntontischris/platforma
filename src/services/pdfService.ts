import { jsPDF } from 'jspdf';
import { Invoice } from './invoiceService';

class PDFService {
  private static instance: PDFService;

  private constructor() {}

  public static getInstance(): PDFService {
    if (!PDFService.instance) {
      PDFService.instance = new PDFService();
    }
    return PDFService.instance;
  }

  generateInvoicePDF(invoice: Invoice): void {
    const doc = new jsPDF();
    
    // Add company logo and header
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 255);
    doc.text('EduManager', 20, 20);
    
    // Add invoice details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Αριθμός Τιμολογίου: ${invoice.invoiceNumber}`, 20, 40);
    doc.text(`Ημερομηνία: ${new Date(invoice.date).toLocaleDateString('el-GR')}`, 20, 50);
    
    // Add customer details in a box
    doc.setDrawColor(0, 0, 255);
    doc.setLineWidth(0.5);
    doc.rect(20, 60, 170, 40);
    doc.text('Στοιχεία Πελάτη:', 25, 70);
    doc.text(invoice.customerName, 25, 80);
    
    // Add description in a box
    doc.rect(20, 110, 170, 40);
    doc.text('Περιγραφή:', 25, 120);
    doc.text(this.wrapText(invoice.description, doc, 160), 25, 130);
    
    // Add amounts in a styled table
    const startY = 160;
    doc.rect(20, startY, 170, 50);
    doc.setFillColor(240, 240, 255);
    doc.rect(20, startY, 170, 10, 'F');
    doc.text('Ανάλυση Ποσών', 25, startY + 8);
    
    const vatAmount = invoice.amount * invoice.vat / 100;
    doc.text(`Καθαρό ποσό:`, 25, startY + 20);
    doc.text(`${invoice.amount.toFixed(2)}€`, 160, startY + 20, { align: 'right' });
    doc.text(`ΦΠΑ (${invoice.vat}%):`, 25, startY + 30);
    doc.text(`${vatAmount.toFixed(2)}€`, 160, startY + 30, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(`Σύνολο:`, 25, startY + 40);
    doc.text(`${invoice.totalAmount.toFixed(2)}€`, 160, startY + 40, { align: 'right' });
    
    // Add footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('EduManager - Σύστημα Διαχείρισης Εκπαιδευτικού Οργανισμού', 20, 280);
    doc.text(`Σελίδα 1 από 1`, 180, 280, { align: 'right' });
    
    // Save the PDF
    doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
  }

  private wrapText(text: string, doc: jsPDF, maxWidth: number): string {
    const words = text.split(' ');
    let lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      const width = doc.getTextWidth(currentLine + ' ' + word);
      if (width < maxWidth) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    lines.push(currentLine);

    return lines.join('\n');
  }
}

export const pdfService = PDFService.getInstance();