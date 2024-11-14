import React, { useState } from 'react';
import useStore from '../store/useStore';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Modal from './ui/Modal';

interface NewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewStudentModal: React.FC<NewStudentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    email: '',
    phone: '',
    attendance: 100,
    averageGrade: 0,
  });

  const addStudent = useStore((state) => state.addStudent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent(formData);
    onClose();
    setFormData({
      name: '',
      class: '',
      email: '',
      phone: '',
      attendance: 100,
      averageGrade: 0,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Νέα Εγγραφή Μαθητή"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Ονοματεπώνυμο"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Select
          label="Τμήμα"
          required
          options={[
            { value: 'Α1', label: 'Α1' },
            { value: 'Α2', label: 'Α2' },
            { value: 'Β1', label: 'Β1' },
            { value: 'Β2', label: 'Β2' },
            { value: 'Γ1', label: 'Γ1' },
            { value: 'Γ2', label: 'Γ2' },
          ]}
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Input
          label="Τηλέφωνο"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Ακύρωση
          </Button>
          <Button type="submit">
            Εγγραφή
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewStudentModal;