import React, { useState, useEffect } from 'react';
import { FileText, Video, BookOpen, HelpCircle, Search, Filter, Plus } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Material, materialService } from '../../services/materialService';
import MaterialModal from './MaterialModal';

const MaterialList = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    subject: '',
    class: '',
    status: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  useEffect(() => {
    setMaterials(materialService.getMaterials());

    const unsubscribe = materialService.subscribe((updatedMaterials) => {
      setMaterials(updatedMaterials);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = materials;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(material => material.type === filters.type);
    }
    if (filters.subject) {
      filtered = filtered.filter(material => material.subject === filters.subject);
    }
    if (filters.class) {
      filtered = filtered.filter(material => material.class === filters.class);
    }
    if (filters.status) {
      filtered = filtered.filter(material => material.status === filters.status);
    }

    setFilteredMaterials(filtered);
  }, [materials, searchTerm, filters]);

  const getTypeIcon = (type: Material['type']) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'video':
        return Video;
      case 'assignment':
        return BookOpen;
      case 'quiz':
        return HelpCircle;
      default:
        return FileText;
    }
  };

  const handleEdit = (material: Material) => {
    setSelectedMaterial(material);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedMaterial(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Αναζήτηση υλικού..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="flex space-x-4">
          <Select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            options={[
              { value: '', label: 'Όλοι οι τύποι' },
              { value: 'document', label: 'Έγγραφα' },
              { value: 'video', label: 'Βίντεο' },
              { value: 'assignment', label: 'Εργασίες' },
              { value: 'quiz', label: 'Κουίζ' }
            ]}
          />
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Νέο Υλικό
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map((material) => {
          const Icon = getTypeIcon(material.type);
          return (
            <Card
              key={material.id}
              className="cursor-pointer hover:border-neon-primary transition-colors"
              onClick={() => handleEdit(material)}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-cyber-dark-700 rounded-lg">
                  <Icon className="w-5 h-5 text-neon-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {material.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {material.description}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{material.subject}</span>
                    <span className="mx-2">•</span>
                    <span>{material.class}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {material.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-0.5 rounded-full bg-cyber-dark-600 text-neon-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <MaterialModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        material={selectedMaterial}
      />
    </div>
  );
};

export default MaterialList;