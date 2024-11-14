import { v4 as uuidv4 } from 'uuid';
import { pdfService } from './pdfService';

export interface Invoice {
  id: string;
  customerName: string;
  invoiceNumber: string;
  date: string;
  description: string;
  amount: number;
  vat: number;
  totalAmount: number;
  status: 'draft' | 'issued' | 'paid' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

class InvoiceService {
  private static instance: InvoiceService;
  private invoices: Invoice[] = [];

  private constructor() {}

  public static getInstance(): InvoiceService {
    if (!InvoiceService.instance) {
      InvoiceService.instance = new InvoiceService();
    }
    return InvoiceService.instance;
  }

  generateInvoiceNumber(): string {
    const year = new Date().getFullYear();
    const count = this.invoices.length + 1;
    return `INV-${year}-${count.toString().padStart(4, '0')}`;
  }

  calculateTotal(amount: number, vat: number): number {
    return amount * (1 + vat / 100);
  }

  async createInvoice(data: Omit<Invoice, 'id' | 'totalAmount' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Invoice> {
    const totalAmount = this.calculateTotal(data.amount, data.vat);
    
    const invoice: Invoice = {
      id: uuidv4(),
      ...data,
      totalAmount,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.invoices.push(invoice);
    return invoice;
  }

  async getInvoices(): Promise<Invoice[]> {
    return this.invoices;
  }

  async getInvoiceById(id: string): Promise<Invoice | undefined> {
    return this.invoices.find(inv => inv.id === id);
  }

  async updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice | null> {
    const index = this.invoices.findIndex(inv => inv.id === id);
    if (index === -1) return null;

    const updatedInvoice = {
      ...this.invoices[index],
      ...data,
      updatedAt: new Date()
    };

    if (data.amount || data.vat) {
      updatedInvoice.totalAmount = this.calculateTotal(
        data.amount || updatedInvoice.amount,
        data.vat || updatedInvoice.vat
      );
    }

    this.invoices[index] = updatedInvoice;
    return updatedInvoice;
  }

  async deleteInvoice(id: string): Promise<boolean> {
    const index = this.invoices.findIndex(inv => inv.id === id);
    if (index === -1) return false;

    this.invoices.splice(index, 1);
    return true;
  }

  async issueInvoice(id: string): Promise<Invoice | null> {
    return this.updateInvoice(id, { status: 'issued' });
  }

  async markAsPaid(id: string): Promise<Invoice | null> {
    return this.updateInvoice(id, { status: 'paid' });
  }

  async cancelInvoice(id: string): Promise<Invoice | null> {
    return this.updateInvoice(id, { status: 'cancelled' });
  }

  exportToPDF(invoice: Invoice): void {
    pdfService.generateInvoicePDF(invoice);
  }
}

export const invoiceService = InvoiceService.getInstance();