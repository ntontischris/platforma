import React, { useState } from 'react';
import useStore from '../store/useStore';
import Button from './ui/Button';
import Input from './ui/Input';
import Modal from './ui/Modal';

interface NewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewCourseModal: React.FC<NewCourseModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    schedule: '',
  });

  const addCourse = useStore((state) => state.addCourse);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      ...formData,
      students: [],
    });
    onClose();
    setFormData({
      name: '',
      teacher: '',
      schedule: '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Νέο Μάθημα"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Όνομα Μαθήματος"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="Καθηγητής"
          required
          value={formData.teacher}
          onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
        />

        <Input
          label="Πρόγραμμα"
          required
          placeholder="π.χ. Δευτέρα, Τετάρτη 16:00-18:00"
          value={formData.schedule}
          onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
        />

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Ακύρωση
          </Button>
          <Button type="submit">
            Προσθήκη
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewCourseModal;