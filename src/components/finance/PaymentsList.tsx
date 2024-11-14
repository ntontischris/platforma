import React, { useState } from 'react';
import { Check, X, Clock, Search, Filter, Download, Edit, Trash } from 'lucide-react';
import Card from '../ui/Card';
import Table from '../ui/Table';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Modal from '../ui/Modal';

interface Payment {
  id: string;
  student: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  description?: string;
}

const initialPayments: Payment[] = [
  {
    id: '1',
    student: 'Γιώργος Παπαδόπουλος',
    amount: 350,
    date: '2024-03-15',
    status: 'completed',
    method: 'Κάρτα',
    description: 'Δίδακτρα Μαρτίου',
  },
  {
    id: '2',
    student: 'Μαρία Κωνσταντίνου',
    amount: 350,
    date: '2024-03-14',
    status: 'pending',
    method: 'Τραπεζική Μεταφορά',
    description: 'Δίδακτρα Μαρτίου',
  },
  {
    id: '3',
    student: 'Νίκος Δημητρίου',
    amount: 350,
    date: '2024-03-13',
    status: 'failed',
    method: 'Κάρτα',
    description: 'Δίδακτρα Μαρτίου',
  },
];

const PaymentsList = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    method: 'all',
    search: '',
  });

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsEditModalOpen(true);
  };

  const handleDeletePayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPayment) {
      setPayments(payments.filter(p => p.id !== selectedPayment.id));
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdatePayment = (updatedPayment: Payment) => {
    setPayments(payments.map(p => 
      p.id === updatedPayment.id ? updatedPayment : p
    ));
    setIsEditModalOpen(false);
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Μαθητής', 'Ποσό', 'Ημερομηνία', 'Κατάσταση', 'Μέθοδος', 'Περιγραφή'],
      ...payments.map(p => [
        p.id,
        p.student,
        p.amount,
        p.date,
        p.status,
        p.method,
        p.description || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filters.status === 'all' || payment.status === filters.status;
    const matchesMethod = filters.method === 'all' || payment.method === filters.method;
    const matchesSearch = payment.student.toLowerCase().includes(filters.search.toLowerCase()) ||
                         payment.description?.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesMethod && matchesSearch;
  });

  const columns = [
    { header: 'Μαθητής', accessor: 'student' as const },
    {
      header: 'Ποσό',
      accessor: 'amount' as const,
      cell: (value: number) => `${value}€`,
    },
    {
      header: 'Ημερομηνία',
      accessor: 'date' as const,
      cell: (value: string) => new Date(value).toLocaleDateString('el-GR'),
    },
    { header: 'Μέθοδος', accessor: 'method' as const },
    {
      header: 'Κατάσταση',
      accessor: 'status' as const,
      cell: (value: string) => {
        const statusConfig = {
          completed: { icon: Check, color: 'text-green-600', text: 'Ολοκληρώθηκε' },
          pending: { icon: Clock, color: 'text-yellow-600', text: 'Εκκρεμεί' },
          failed: { icon: X, color: 'text-red-600', text: 'Απέτυχε' },
        }[value as keyof typeof statusConfig];

        return (
          <div className="flex items-center">
            <statusConfig.icon className={`w-4 h-4 ${statusConfig.color} mr-2`} />
            <span className={statusConfig.color}>{statusConfig.text}</span>
          </div>
        );
      },
    },
    {
      header: 'Ενέργειες',
      accessor: 'id' as const,
      cell: (_: string, row: Payment) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditPayment(row)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeletePayment(row)}
          >
            <Trash className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card title="Συναλλαγές">
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <Input
              icon={Search}
              placeholder="Αναζήτηση συναλλαγών..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <Select
            options={[
              { value: 'all', label: 'Όλες οι καταστάσεις' },
              { value: 'completed', label: 'Ολοκληρωμένες' },
              { value: 'pending', label: 'Εκκρεμείς' },
              { value: 'failed', label: 'Αποτυχημένες' },
            ]}
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          />
          <Select
            options={[
              { value: 'all', label: 'Όλοι οι τρόποι πληρωμής' },
              { value: 'Κάρτα', label: 'Κάρτα' },
              { value: 'Τραπεζική Μεταφορά', label: 'Τραπεζική Μεταφορά' },
              { value: 'Μετρητά', label: 'Μετρητά' },
            ]}
            value={filters.method}
            onChange={(e) => setFilters({ ...filters, method: e.target.value })}
          />
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Εξαγωγή
          </Button>
        </div>
      </div>

      <Table data={filteredPayments} columns={columns} />

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Επεξεργασία Συναλλαγής"
      >
        {selectedPayment && (
          <form className="space-y-4">
            <Input
              label="Ποσό"
              type="number"
              value={selectedPayment.amount}
              onChange={(e) => setSelectedPayment({
                ...selectedPayment,
                amount: Number(e.target.value)
              })}
            />
            <Select
              label="Κατάσταση"
              value={selectedPayment.status}
              onChange={(e) => setSelectedPayment({
                ...selectedPayment,
                status: e.target.value as Payment['status']
              })}
              options={[
                { value: 'completed', label: 'Ολοκληρώθηκε' },
                { value: 'pending', label: 'Εκκρεμεί' },
                { value: 'failed', label: 'Απέτυχε' },
              ]}
            />
            <Input
              label="Περιγραφή"
              value={selectedPayment.description || ''}
              onChange={(e) => setSelectedPayment({
                ...selectedPayment,
                description: e.target.value
              })}
            />
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                Ακύρωση
              </Button>
              <Button
                onClick={() => handleUpdatePayment(selectedPayment)}
              >
                Αποθήκευση
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Διαγραφή Συναλλαγής"
      >
        <div className="space-y-4">
          <p>Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή τη συναλλαγή;</p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Ακύρωση
            </Button>
            <Button
              variant="outline"
              onClick={confirmDelete}
            >
              <Trash className="w-4 h-4 mr-2 text-red-500" />
              Διαγραφή
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default PaymentsList;