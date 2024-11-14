import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Save, FileText } from 'lucide-react';
import { invoiceService } from '../../services/invoiceService';
import type { Invoice } from '../../services/invoiceService';

interface InvoiceFormProps {
  onSubmit: (invoice: Invoice) => void;
  onCancel?: () => void;
  initialData?: Partial<Invoice>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const [formData, setFormData] = useState({
    customerName: initialData?.customerName || '',
    invoiceNumber: initialData?.invoiceNumber || invoiceService.generateInvoiceNumber(),
    date: initialData?.date || new Date().toISOString().split('T')[0],
    description: initialData?.description || '',
    amount: initialData?.amount || 0,
    vat: initialData?.vat || 24,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const invoice = await invoiceService.createInvoice(formData);
      onSubmit(invoice);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="customerName"
        label="Όνομα Πελάτη"
        value={formData.customerName}
        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
        placeholder="π.χ. Ιωάννης Παπαδόπουλος"
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="invoiceNumber"
          label="Αριθμός Τιμολογίου"
          value={formData.invoiceNumber}
          onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
          disabled
        />
        <Input
          name="date"
          type="date"
          label="Ημερομηνία"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <Input
        name="description"
        label="Περιγραφή"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Περιγραφή υπηρεσιών..."
        isTextArea
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="amount"
          type="number"
          label="Ποσό (€)"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          placeholder="0.00"
          min="0"
          step="0.01"
          required
        />
        <Input
          name="vat"
          type="number"
          label="ΦΠΑ (%)"
          value={formData.vat}
          onChange={(e) => setFormData({ ...formData, vat: Number(e.target.value) })}
          placeholder="24"
          min="0"
          max="100"
          required
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Ακύρωση
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <FileText className="w-4 h-4 mr-2 animate-spin" />
              Αποθήκευση...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Αποθήκευση Τιμολογίου
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;