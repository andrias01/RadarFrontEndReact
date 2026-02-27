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
import { Search } from 'lucide-react';

interface NewEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (evaluation: EvaluationData) => void;
  students: Student[];
}

export interface EvaluationData {
  studentId: number;
  evaluatorName: string;
  evaluatorRole: string;
  habilidadesTecnicas: { [key: string]: number };
  habilidadesBlandas: { [key: string]: number };
  comentarios: string;
  fecha: string;
}

export function NewEvaluationModal({ isOpen, onClose, onSubmit, students }: NewEvaluationModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
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
    if (!selectedStudent) return;

    onSubmit({
      studentId: selectedStudent.id,
      evaluatorName,
      evaluatorRole,
      habilidadesTecnicas,
      habilidadesBlandas,
      comentarios,
      fecha: new Date().toISOString().split('T')[0],
    });

    // Reset form
    setSearchTerm('');
    setSelectedStudent(null);
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

  const filteredStudents = students.filter(s => 
    s.estado === 'Activo' && (
      s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.carrera.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Nueva Evaluación</DialogTitle>
          <DialogDescription>
            Busque y seleccione el estudiante que desea evaluar
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Búsqueda de estudiante */}
          {!selectedStudent ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar estudiante por nombre, apellido o carrera..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                />
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="p-4 border-2 border-border rounded-lg cursor-pointer hover:border-[#008b50]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{student.nombre} {student.apellido}</p>
                        <p className="text-sm text-muted-foreground">{student.carrera}</p>
                        <p className="text-xs text-muted-foreground">{student.departamento}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#008b50]">Promedio: {student.promedio}</p>
                        <p className="text-xs text-muted-foreground">{student.evaluaciones || 0} evaluaciones</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredStudents.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No se encontraron estudiantes activos
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Estudiante seleccionado */}
              <div className="bg-[#008b50]/10 p-4 rounded-lg border-2 border-[#008b50]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{selectedStudent.nombre} {selectedStudent.apellido}</p>
                    <p className="text-sm text-muted-foreground">{selectedStudent.carrera}</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedStudent(null)}
                  >
                    Cambiar estudiante
                  </Button>
                </div>
              </div>

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
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {selectedStudent && (
              <Button type="submit" variant="primary">
                Enviar evaluación
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
