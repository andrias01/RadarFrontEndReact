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

interface EvaluationModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (evaluation: EvaluationData) => void;
}

export interface EvaluationData {
  studentId: number;
  evaluatorName: string;
  evaluatorRole: string;
  habilidadesTecnicas: { [key: string]: number };
  habilidadesBlandas: { [key: string]: number };
  comentarios: string;
}

export function EvaluationModal({ student, isOpen, onClose, onSubmit }: EvaluationModalProps) {
  const [evaluatorName, setEvaluatorName] = useState('');
  const [evaluatorRole, setEvaluatorRole] = useState('');
  const [comentarios, setComentarios] = useState('');
  
  const [habilidadesBlandas, setHabilidadesBlandas] = useState({
    'Trabajo en equipo': 0,
    'Comunicación': 0,
    'Liderazgo': 0,
    'Adaptabilidad': 0,
    'Pensamiento crítico': 0,
    'Resolución de problemas': 0,
  });

  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState({
    'Conocimientos técnicos': 0,
    'Aplicación práctica': 0,
    'Innovación': 0,
    'Calidad del trabajo': 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    onSubmit({
      studentId: student.id,
      evaluatorName,
      evaluatorRole,
      habilidadesTecnicas,
      habilidadesBlandas,
      comentarios,
    });

    // Reset form
    setEvaluatorName('');
    setEvaluatorRole('');
    setComentarios('');
    setHabilidadesBlandas({
      'Trabajo en equipo': 0,
      'Comunicación': 0,
      'Liderazgo': 0,
      'Adaptabilidad': 0,
      'Pensamiento crítico': 0,
      'Resolución de problemas': 0,
    });
    setHabilidadesTecnicas({
      'Conocimientos técnicos': 0,
      'Aplicación práctica': 0,
      'Innovación': 0,
      'Calidad del trabajo': 0,
    });
    
    onClose();
  };

  const updateHabilidadBlanda = (key: string, value: number) => {
    setHabilidadesBlandas(prev => ({ ...prev, [key]: value }));
  };

  const updateHabilidadTecnica = (key: string, value: number) => {
    setHabilidadesTecnicas(prev => ({ ...prev, [key]: value }));
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Evaluar Estudiante</DialogTitle>
          <DialogDescription>
            {student.nombre} {student.apellido} - {student.carrera}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Información del Evaluador */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Información del Evaluador</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="evaluatorName">Nombre del evaluador *</Label>
                <input
                  id="evaluatorName"
                  type="text"
                  required
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div>
                <Label htmlFor="evaluatorRole">Cargo del evaluador *</Label>
                <input
                  id="evaluatorRole"
                  type="text"
                  required
                  value={evaluatorRole}
                  onChange={(e) => setEvaluatorRole(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                  placeholder="Ej: Gerente de Operaciones"
                />
              </div>
            </div>
          </div>

          {/* Habilidades Blandas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#04b5ac]">Habilidades Blandas</h3>
            <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
              {Object.entries(habilidadesBlandas).map(([skill, value]) => (
                <div key={skill}>
                  <div className="flex justify-between items-center mb-2">
                    <Label>{skill}</Label>
                    <span className="text-sm font-bold text-[#008b50]">{value}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => updateHabilidadBlanda(skill, parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#04b5ac]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Habilidades Técnicas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#008b50]">Habilidades Técnicas</h3>
            <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
              {Object.entries(habilidadesTecnicas).map(([skill, value]) => (
                <div key={skill}>
                  <div className="flex justify-between items-center mb-2">
                    <Label>{skill}</Label>
                    <span className="text-sm font-bold text-[#008b50]">{value}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => updateHabilidadTecnica(skill, parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#008b50]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Comentarios */}
          <div>
            <Label htmlFor="comentarios">Comentarios y observaciones *</Label>
            <textarea
              id="comentarios"
              required
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              rows={4}
              className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50] resize-none"
              placeholder="Escriba sus observaciones sobre el desempeño del estudiante..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Enviar evaluación
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
