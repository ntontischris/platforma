import { v4 as uuidv4 } from 'uuid';

export interface Material {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'assignment' | 'quiz';
  subject: string;
  class: string;
  url?: string;
  content?: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
}

class MaterialService {
  private static instance: MaterialService;
  private materials: Map<string, Material> = new Map();
  private listeners: Set<(materials: Material[]) => void> = new Set();

  private constructor() {
    this.initializeDemoMaterials();
  }

  public static getInstance(): MaterialService {
    if (!MaterialService.instance) {
      MaterialService.instance = new MaterialService();
    }
    return MaterialService.instance;
  }

  private initializeDemoMaterials() {
    const demoMaterials: Material[] = [
      {
        id: uuidv4(),
        title: 'Εισαγωγή στις Εξισώσεις',
        description: 'Βασικές έννοιες και παραδείγματα επίλυσης εξισώσεων',
        type: 'document',
        subject: 'Μαθηματικά',
        class: 'Β2',
        content: 'Περιεχόμενο εισαγωγής στις εξισώσεις...',
        author: 'Γ. Παπαδόπουλος',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'published',
        tags: ['άλγεβρα', 'εξισώσεις', 'βασικά']
      },
      {
        id: uuidv4(),
        title: 'Νόμοι του Newton',
        description: 'Βίντεο επεξήγησης των νόμων του Newton',
        type: 'video',
        subject: 'Φυσική',
        class: 'Γ1',
        url: 'https://example.com/newton-laws',
        author: 'Μ. Κωνσταντίνου',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'published',
        tags: ['μηχανική', 'νόμοι newton', 'δυνάμεις']
      }
    ];

    demoMaterials.forEach(material => this.materials.set(material.id, material));
  }

  subscribe(listener: (materials: Material[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const materialsList = Array.from(this.materials.values());
    this.listeners.forEach(listener => listener(materialsList));
  }

  getMaterials(): Material[] {
    return Array.from(this.materials.values());
  }

  getMaterialById(id: string): Material | undefined {
    return this.materials.get(id);
  }

  async createMaterial(data: Omit<Material, 'id' | 'createdAt' | 'updatedAt'>): Promise<Material> {
    const material: Material = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.materials.set(material.id, material);
    this.notifyListeners();
    return material;
  }

  async updateMaterial(id: string, data: Partial<Material>): Promise<Material | null> {
    const material = this.materials.get(id);
    if (!material) return null;

    const updatedMaterial = {
      ...material,
      ...data,
      updatedAt: new Date()
    };

    this.materials.set(id, updatedMaterial);
    this.notifyListeners();
    return updatedMaterial;
  }

  async deleteMaterial(id: string): Promise<boolean> {
    const deleted = this.materials.delete(id);
    if (deleted) {
      this.notifyListeners();
    }
    return deleted;
  }

  async searchMaterials(query: string): Promise<Material[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.materials.values()).filter(material =>
      material.title.toLowerCase().includes(searchTerm) ||
      material.description.toLowerCase().includes(searchTerm) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async filterMaterials(filters: {
    type?: Material['type'];
    subject?: string;
    class?: string;
    status?: Material['status'];
    tags?: string[];
  }): Promise<Material[]> {
    return Array.from(this.materials.values()).filter(material => {
      if (filters.type && material.type !== filters.type) return false;
      if (filters.subject && material.subject !== filters.subject) return false;
      if (filters.class && material.class !== filters.class) return false;
      if (filters.status && material.status !== filters.status) return false;
      if (filters.tags && !filters.tags.some(tag => material.tags.includes(tag))) return false;
      return true;
    });
  }
}

export const materialService = MaterialService.getInstance();