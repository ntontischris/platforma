import React, { useState, useEffect } from 'react';
import { FileText, Save, Trash2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Material, materialService } from '../../services/materialService';

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  material?: Material | null;
}

const MaterialModal: React.FC<MaterialModalProps> = ({
  isOpen,
  onClose,
  material
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'document' as Material['type'],
    subject: '',
    class: '',
    url: '',
    content: '',
    tags: [] as string[],
    status: 'draft' as Material['status']
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (material) {
      setFormData({
        title: material.title,
        description: material.description,
        type: material.type,
        subject: material.subject,
        class: material.class,
        url: material.url || '',
        content: material.content || '',
        tags: material.tags,
        status: material.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'document',
        subject: '',
        class: '',
        url: '',
        content: '',
        tags: [],
        status: 'draft'
      });
    }
  }, [material]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (material) {
        await materialService.updateMaterial(material.id, formData);
      } else {
        await materialService.createMaterial({
          ...formData,
          author: 'Γ. Παπαδόπουλος' // This should come from auth context
        });
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save material');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!material) return;

    setLoading(true);
    setError(null);

    try {
      await materialService.deleteMaterial(material.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete material');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={material ? 'Επεξεργασία Υλικού' : 'Νέο Υλικό'}
    >
      <div className="space-y-4">
        <Input
          label="Τίτλος"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <Input
          label="Περιγραφή"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          isTextArea
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Τύπος"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Material['type'] })}
            options={[
              { value: 'document', label: 'Έγγραφο' },
              { value: 'video', label: 'Βίντεο' },
              { value: 'assignment', label: 'Εργασία' },
              { value: 'quiz', label: 'Κουίζ' }
            ]}
          />
          <Select
            label="Κατάσταση"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Material['status'] })}
            options={[
              { value: 'draft', label: 'Πρόχειρο' },
              { value: 'published', label: 'Δημοσιευμένο' },
              { value: 'archived', label: 'Αρχειοθετημένο' }
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Μάθημα"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          <Input
            label="Τάξη"
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
          />
        </div>

        {formData.type === 'video' && (
          <Input
            label="URL Βίντεο"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        )}

        {(formData.type === 'document' || formData.type === 'assignment') && (
          <Input
            label="Περιεχόμενο"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            isTextArea
          />
        )}

        <Input
          label="Ετικέτες (χωρισμένες με κόμμα)"
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData({
            ...formData,
            tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
          })}
        />

        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          {material && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Διαγραφή
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Ακύρωση
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Αποθήκευση...' : 'Αποθήκευση'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MaterialModal;