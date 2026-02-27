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

interface SkillsEditorModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentId: number, habilidadesTecnicas: { [key: string]: number }, habilidadesBlandas: { [key: string]: number }) => void;
}

export function SkillsEditorModal({ student, isOpen, onClose, onSubmit }: SkillsEditorModalProps) {
  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState<{ [key: string]: number }>(
    student?.habilidadesTecnicas || {}
  );
  const [habilidadesBlandas, setHabilidadesBlandas] = useState<{ [key: string]: number }>(
    student?.habilidadesBlandas || {}
  );
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  React.useEffect(() => {
    if (student) {
      setHabilidadesTecnicas(student.habilidadesTecnicas || {});
      setHabilidadesBlandas(student.habilidadesBlandas || {});
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      onSubmit(student.id, habilidadesTecnicas, habilidadesBlandas);
      onClose();
    }
  };

  const updateTechSkill = (key: string, value: number) => {
    setHabilidadesTecnicas(prev => ({ ...prev, [key]: value }));
  };

  const updateSoftSkill = (key: string, value: number) => {
    setHabilidadesBlandas(prev => ({ ...prev, [key]: value }));
  };

  const addTechSkill = () => {
    if (newTechSkill.trim()) {
      setHabilidadesTecnicas(prev => ({ ...prev, [newTechSkill.trim()]: 0 }));
      setNewTechSkill('');
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setHabilidadesBlandas(prev => ({ ...prev, [newSoftSkill.trim()]: 0 }));
      setNewSoftSkill('');
    }
  };

  const removeTechSkill = (key: string) => {
    const { [key]: _, ...rest } = habilidadesTecnicas;
    setHabilidadesTecnicas(rest);
  };

  const removeSoftSkill = (key: string) => {
    const { [key]: _, ...rest } = habilidadesBlandas;
    setHabilidadesBlandas(rest);
  };

  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar Habilidades</DialogTitle>
          <DialogDescription>
            {student.nombre} {student.apellido} - {student.carrera}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Habilidades Técnicas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#008b50]">Habilidades Técnicas</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newTechSkill}
                onChange={(e) => setNewTechSkill(e.target.value)}
                placeholder="Nueva habilidad técnica"
                className="flex-1 px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
              />
              <Button type="button" variant="outline" onClick={addTechSkill}>
                Agregar
              </Button>
            </div>

            <div className="space-y-3 bg-muted/30 p-4 rounded-lg max-h-64 overflow-y-auto">
              {Object.entries(habilidadesTecnicas).map(([skill, value]) => (
                <div key={skill} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm">{skill}</Label>
                      <span className="text-sm font-bold text-[#008b50]">{value}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => updateTechSkill(skill, parseInt(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#008b50]"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeTechSkill(skill)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              {Object.keys(habilidadesTecnicas).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay habilidades técnicas registradas
                </p>
              )}
            </div>
          </div>

          {/* Habilidades Blandas */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#04b5ac]">Habilidades Blandas</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                placeholder="Nueva habilidad blanda"
                className="flex-1 px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
              />
              <Button type="button" variant="outline" onClick={addSoftSkill}>
                Agregar
              </Button>
            </div>

            <div className="space-y-3 bg-muted/30 p-4 rounded-lg max-h-64 overflow-y-auto">
              {Object.entries(habilidadesBlandas).map(([skill, value]) => (
                <div key={skill} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm">{skill}</Label>
                      <span className="text-sm font-bold text-[#04b5ac]">{value}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => updateSoftSkill(skill, parseInt(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[#04b5ac]"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeSoftSkill(skill)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              {Object.keys(habilidadesBlandas).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay habilidades blandas registradas
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Guardar cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
