import React, { useState } from 'react';
import { Student } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/Button';
import { Label } from './ui/label';

interface StudentFormModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Partial<Student>) => void;
  mode: 'create' | 'edit';
  institutionName: string;
}

export function StudentFormModal({ 
  student, 
  isOpen, 
  onClose, 
  onSubmit, 
  mode,
  institutionName 
}: StudentFormModalProps) {
  const [formData, setFormData] = useState<Partial<Student>>(
    student || {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      documento: '',
      universidad: institutionName,
      carrera: '',
      semestre: 1,
      promedio: 0,
      estado: 'Activo',
      empresa: '',
      departamento: '',
      inicio: '',
      evaluaciones: 0,
      habilidadesTecnicas: {},
      habilidadesBlandas: {},
      observaciones: '',
      fechaRegistro: new Date().toISOString().split('T')[0],
    }
  );

  const carreras = [
    'Ingeniería Industrial',
    'Ingeniería de Sistemas',
    'Administración de Empresas',
    'Diseño Gráfico',
    'Comunicación Social',
    'Psicología',
    'Derecho',
    'Contaduría Pública'
  ];

  const handleChange = (field: keyof Student, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === 'create' ? 'Registrar Nuevo Estudiante' : 'Editar Estudiante'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Complete la información del estudiante para registrarlo en el sistema'
              : 'Modifique la información del estudiante'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#008b50]">Información Personal</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre *</Label>
                <input
                  id="nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="Nombre del estudiante"
                />
              </div>
              <div>
                <Label htmlFor="apellido">Apellido *</Label>
                <input
                  id="apellido"
                  type="text"
                  required
                  value={formData.apellido}
                  onChange={(e) => handleChange('apellido', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="Apellido del estudiante"
                />
              </div>
              <div>
                <Label htmlFor="documento">Documento de identidad *</Label>
                <input
                  id="documento"
                  type="text"
                  required
                  value={formData.documento}
                  onChange={(e) => handleChange('documento', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="Ej: 1234567890"
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono *</Label>
                <input
                  id="telefono"
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="+57 310 123 4567"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email *</Label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="estudiante@uco.edu.co"
                />
              </div>
            </div>
          </div>

          {/* Información Académica */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#04b5ac]">Información Académica</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="carrera">Carrera *</Label>
                <select
                  id="carrera"
                  required
                  value={formData.carrera}
                  onChange={(e) => handleChange('carrera', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                >
                  <option value="">Seleccione una carrera</option>
                  {carreras.map(carrera => (
                    <option key={carrera} value={carrera}>{carrera}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="semestre">Semestre *</Label>
                <input
                  id="semestre"
                  type="number"
                  min="1"
                  max="12"
                  required
                  value={formData.semestre}
                  onChange={(e) => handleChange('semestre', parseInt(e.target.value))}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                />
              </div>
              <div>
                <Label htmlFor="promedio">Promedio académico *</Label>
                <input
                  id="promedio"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  value={formData.promedio}
                  onChange={(e) => handleChange('promedio', parseFloat(e.target.value))}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado *</Label>
                <select
                  id="estado"
                  required
                  value={formData.estado}
                  onChange={(e) => handleChange('estado', e.target.value as Student['estado'])}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="En espera">En espera</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Información de Práctica (opcional) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#ffca00]">Información de Práctica (Opcional)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="empresa">Empresa</Label>
                <input
                  id="empresa"
                  type="text"
                  value={formData.empresa || ''}
                  onChange={(e) => handleChange('empresa', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <Label htmlFor="departamento">Departamento</Label>
                <input
                  id="departamento"
                  type="text"
                  value={formData.departamento || ''}
                  onChange={(e) => handleChange('departamento', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="Departamento o área"
                />
              </div>
              <div>
                <Label htmlFor="inicio">Fecha de inicio</Label>
                <input
                  id="inicio"
                  type="date"
                  value={formData.inicio || ''}
                  onChange={(e) => handleChange('inicio', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                />
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <Label htmlFor="observaciones">Observaciones</Label>
            <textarea
              id="observaciones"
              value={formData.observaciones || ''}
              onChange={(e) => handleChange('observaciones', e.target.value)}
              rows={3}
              className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50] resize-none"
              placeholder="Información adicional sobre el estudiante..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {mode === 'create' ? 'Registrar estudiante' : 'Guardar cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
