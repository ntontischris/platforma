import React, { useState } from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import InvoiceForm from './InvoiceForm';
import { invoiceService, type Invoice } from '../../services/invoiceService';

const InvoiceGenerator = () => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleExportPDF = () => {
    if (currentInvoice) {
      invoiceService.exportToPDF(currentInvoice);
    }
  };

  const handleNewInvoice = () => {
    setCurrentInvoice(null);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-neon-primary" />
          <h2 className="text-xl font-semibold text-white">Δημιουργία Τιμολογίου</h2>
        </div>
        {currentInvoice && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleNewInvoice}>
              <FileText className="w-4 h-4 mr-2" />
              Νέο
            </Button>
          </div>
        )}
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
          Το τιμολόγιο δημιουργήθηκε με επιτυχία!
        </div>
      )}
      
      {currentInvoice ? (
        <div className="space-y-4">
          <div className="p-4 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Πελάτης</p>
                <p className="text-white">{currentInvoice.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Αριθμός Τιμολογίου</p>
                <p className="text-white">{currentInvoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Ημερομηνία</p>
                <p className="text-white">{new Date(currentInvoice.date).toLocaleDateString('el-GR')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Κατάσταση</p>
                <p className="text-neon-primary">{currentInvoice.status}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Περιγραφή</p>
              <p className="text-white">{currentInvoice.description}</p>
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-400">Ποσό</p>
                <p className="text-xl font-semibold text-white">{currentInvoice.amount.toFixed(2)}€</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">ΦΠΑ ({currentInvoice.vat}%)</p>
                <p className="text-white">{(currentInvoice.amount * currentInvoice.vat / 100).toFixed(2)}€</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Σύνολο</p>
                <p className="text-xl font-semibold text-neon-primary">{currentInvoice.totalAmount.toFixed(2)}€</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <InvoiceForm onSubmit={handleSubmit} />
      )}
    </Card>
  );
};

export default InvoiceGenerator;