import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { Plus, Edit, Trash } from 'lucide-react';

interface Expense {
  id: string;
  value: number;
  label: string;
  color: string;
}

const initialData: Expense[] = [
  { id: 'Μισθοδοσία', value: 45000, label: 'Μισθοδοσία', color: '#3b82f6' },
  { id: 'Λειτουργικά', value: 15000, label: 'Λειτουργικά', color: '#10b981' },
  { id: 'Εξοπλισμός', value: 8000, label: 'Εξοπλισμός', color: '#f59e0b' },
  { id: 'Μάρκετινγκ', value: 5000, label: 'Μάρκετινγκ', color: '#6366f1' },
  { id: 'Άλλα', value: 3000, label: 'Άλλα', color: '#ec4899' },
];

const ExpensesChart = () => {
  const [data, setData] = useState<Expense[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const handleSaveExpense = (formData: FormData) => {
    const newExpense: Expense = {
      id: formData.get('category') as string,
      label: formData.get('category') as string,
      value: Number(formData.get('amount')),
      color: formData.get('color') as string,
    };

    if (selectedExpense) {
      setData(data.map(item => 
        item.id === selectedExpense.id ? newExpense : item
      ));
    } else {
      setData([...data, newExpense]);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedExpense) {
      setData(data.filter(item => item.id !== selectedExpense.id));
      setIsDeleteModalOpen(false);
    }
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Κατανομή Εξόδων</h3>
        <Button onClick={handleAddExpense} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Νέο Έξοδο
        </Button>
      </div>

      <div className="h-[300px]">
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.6}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#ffffff"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#ffffff"
          theme={{
            text: {
              fill: '#ffffff',
            },
            tooltip: {
              container: {
                background: '#1a1a2e',
                color: '#ffffff',
                fontSize: '12px',
                borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            },
          }}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExpense ? 'Επεξεργασία Εξόδου' : 'Νέο Έξοδο'}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveExpense(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          <Input
            name="category"
            label="Κατηγορία"
            defaultValue={selectedExpense?.label}
            required
          />
          <Input
            name="amount"
            label="Ποσό"
            type="number"
            defaultValue={selectedExpense?.value}
            required
          />
          <Input
            name="color"
            label="Χρώμα"
            type="color"
            defaultValue={selectedExpense?.color}
            required
          />
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Ακύρωση
            </Button>
            <Button type="submit">
              {selectedExpense ? 'Αποθήκευση' : 'Προσθήκη'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Διαγραφή Εξόδου"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το έξοδο;
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Ακύρωση
            </Button>
            <Button
              variant="outline"
              onClick={handleConfirmDelete}
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

export default ExpensesChart;