import React, { useState } from 'react';
import { University } from '../types';
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
import { GraduationCap, MapPin, Users } from 'lucide-react';

interface InternshipRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: InternshipRequestData) => void;
  universities: University[];
}

export interface InternshipRequestData {
  universidadId: number;
  departamento: string;
  posicion: string;
  descripcion: string;
  habilidadesRequeridas: string[];
  duracion: string;
  vacantes: number;
}

export function InternshipRequestModal({ isOpen, onClose, onSubmit, universities }: InternshipRequestModalProps) {
  const [selectedUniversity, setSelectedUniversity] = useState<number>(0);
  const [departamento, setDepartamento] = useState('');
  const [posicion, setPosicion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [habilidades, setHabilidades] = useState('');
  const [duracion, setDuracion] = useState('6');
  const [vacantes, setVacantes] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const habilidadesArray = habilidades
      .split(',')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    onSubmit({
      universidadId: selectedUniversity,
      departamento,
      posicion,
      descripcion,
      habilidadesRequeridas: habilidadesArray,
      duracion,
      vacantes,
    });

    // Reset form
    setSelectedUniversity(0);
    setDepartamento('');
    setPosicion('');
    setDescripcion('');
    setHabilidades('');
    setDuracion('6');
    setVacantes(1);
    
    onClose();
  };

  const selectedUniv = universities.find(u => u.id === selectedUniversity);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Solicitar Practicante</DialogTitle>
          <DialogDescription>
            Complete el formulario para solicitar un practicante de una institución educativa
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Selección de Universidad */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Universidad</h3>
            <div className="space-y-3">
              {universities.map((university) => (
                <div
                  key={university.id}
                  onClick={() => setSelectedUniversity(university.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedUniversity === university.id
                      ? 'border-[#008b50] bg-[#008b50]/5'
                      : 'border-border hover:border-[#008b50]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedUniversity === university.id
                        ? 'bg-[#008b50]'
                        : 'bg-[#008b50]/10'
                    }`}>
                      <GraduationCap className={`w-6 h-6 ${
                        selectedUniversity === university.id
                          ? 'text-white'
                          : 'text-[#008b50]'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{university.nombre}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {university.ciudad}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {university.estudiantesActivos} estudiantes activos
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Promedio general:</p>
                        <p className="text-sm font-bold text-[#008b50]">{university.promedioGeneral}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedUniversity > 0 && selectedUniv && (
            <>
              {/* Programas disponibles */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Programas académicos disponibles</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUniv.programas.map((programa) => (
                    <span
                      key={programa}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#04b5ac]/10 text-[#04b5ac]"
                    >
                      {programa}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detalles de la posición */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Detalles de la posición</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departamento">Departamento *</Label>
                    <input
                      id="departamento"
                      type="text"
                      required
                      value={departamento}
                      onChange={(e) => setDepartamento(e.target.value)}
                      className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                      placeholder="Ej: Desarrollo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="posicion">Posición *</Label>
                    <input
                      id="posicion"
                      type="text"
                      required
                      value={posicion}
                      onChange={(e) => setPosicion(e.target.value)}
                      className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                      placeholder="Ej: Desarrollador Junior"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción de la práctica *</Label>
                  <textarea
                    id="descripcion"
                    required
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={4}
                    className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50] resize-none"
                    placeholder="Describa las responsabilidades y actividades del practicante..."
                  />
                </div>

                <div>
                  <Label htmlFor="habilidades">Habilidades requeridas *</Label>
                  <input
                    id="habilidades"
                    type="text"
                    required
                    value={habilidades}
                    onChange={(e) => setHabilidades(e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                    placeholder="Ej: JavaScript, React, Trabajo en equipo (separadas por comas)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separe las habilidades con comas
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duracion">Duración (meses) *</Label>
                    <select
                      id="duracion"
                      required
                      value={duracion}
                      onChange={(e) => setDuracion(e.target.value)}
                      className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                    >
                      <option value="3">3 meses</option>
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="vacantes">Número de vacantes *</Label>
                    <input
                      id="vacantes"
                      type="number"
                      min="1"
                      max="10"
                      required
                      value={vacantes}
                      onChange={(e) => setVacantes(parseInt(e.target.value))}
                      className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              disabled={selectedUniversity === 0}
            >
              Enviar solicitud
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
