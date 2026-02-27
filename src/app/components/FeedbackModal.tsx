import React, { useState } from 'react';
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

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
}

export interface FeedbackData {
  categoria: string;
  asunto: string;
  descripcion: string;
  prioridad: 'baja' | 'media' | 'alta';
}

export function FeedbackModal({ isOpen, onClose, onSubmit }: FeedbackModalProps) {
  const [categoria, setCategoria] = useState('');
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState<'baja' | 'media' | 'alta'>('media');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      categoria,
      asunto,
      descripcion,
      prioridad,
    });
    
    // Reset form
    setCategoria('');
    setAsunto('');
    setDescripcion('');
    setPrioridad('media');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Enviar Retroalimentación</DialogTitle>
          <DialogDescription>
            Comparta sus comentarios, sugerencias o reporte problemas sobre la plataforma RADAR
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoria">Categoría *</Label>
              <select
                id="categoria"
                required
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
              >
                <option value="">Seleccione una categoría</option>
                <option value="funcionalidad">Funcionalidad</option>
                <option value="bug">Reporte de error</option>
                <option value="sugerencia">Sugerencia de mejora</option>
                <option value="evaluacion">Sistema de evaluación</option>
                <option value="interfaz">Interfaz y diseño</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <Label htmlFor="prioridad">Prioridad *</Label>
              <select
                id="prioridad"
                required
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value as 'baja' | 'media' | 'alta')}
                className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="asunto">Asunto *</Label>
            <input
              id="asunto"
              type="text"
              required
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50]"
              placeholder="Resuma brevemente su retroalimentación"
            />
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción detallada *</Label>
            <textarea
              id="descripcion"
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={6}
              className="mt-1 w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50] resize-none"
              placeholder="Proporcione detalles sobre su retroalimentación, incluyendo pasos para reproducir si es un error..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Enviar retroalimentación
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
