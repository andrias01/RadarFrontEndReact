import React from 'react';
import { Student } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/Button';
import { Star, Award, TrendingUp, Mail } from 'lucide-react';
import { RadarChart } from './charts/RadarChart';

interface TalentShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
}

export function TalentShowcaseModal({ isOpen, onClose, students }: TalentShowcaseModalProps) {
  // Filtrar y ordenar estudiantes destacados (promedio >= 85 y activos)
  const topStudents = students
    .filter(s => s.promedio >= 85 && s.estado === 'Activo')
    .sort((a, b) => b.promedio - a.promedio)
    .slice(0, 5);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Star className="w-6 h-6 text-[#ffca00] fill-current" />
            Talento Destacado
          </DialogTitle>
          <DialogDescription>
            Los mejores practicantes según su desempeño general
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {topStudents.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No hay estudiantes destacados en este momento
              </p>
            </div>
          ) : (
            topStudents.map((student, index) => {
              const radarData = Object.entries(student.habilidadesBlandas).map(([key, value]) => ({
                subject: key,
                value: value,
                fullMark: 100
              }));

              return (
                <div
                  key={student.id}
                  className="border-2 border-border rounded-lg p-6 hover:border-[#008b50]/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Ranking Badge */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      index === 0
                        ? 'bg-gradient-to-br from-[#ffca00] to-[#e28210] text-white'
                        : index === 1
                        ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700'
                        : index === 2
                        ? 'bg-gradient-to-br from-[#e28210] to-[#d97706] text-white'
                        : 'bg-muted text-foreground'
                    }`}>
                      #{index + 1}
                    </div>

                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">
                            {student.nombre} {student.apellido}
                          </h3>
                          <p className="text-muted-foreground">{student.carrera}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-muted-foreground">
                              {student.universidad}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {student.departamento}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2 mb-2">
                            <Award className="w-5 h-5 text-[#008b50]" />
                            <span className="text-3xl font-bold text-[#008b50]">
                              {student.promedio}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#008b50]/10 text-[#008b50]">
                            <TrendingUp className="w-3 h-3" />
                            {student.evaluaciones} evaluaciones
                          </span>
                        </div>
                      </div>

                      {/* Grid con gráfico y detalles */}
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Radar Chart */}
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 text-sm">Habilidades Blandas</h4>
                          <RadarChart data={radarData} height={200} color="#04b5ac" />
                        </div>

                        {/* Habilidades Técnicas */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Habilidades Técnicas</h4>
                          <div className="space-y-2">
                            {Object.entries(student.habilidadesTecnicas).slice(0, 4).map(([skill, value]) => (
                              <div key={skill}>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-medium">{skill}</span>
                                  <span className="text-xs font-bold text-[#008b50]">{value}</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1.5">
                                  <div
                                    className="h-1.5 rounded-full bg-gradient-to-r from-[#008b50] to-[#04b5ac]"
                                    style={{ width: `${value}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Observaciones */}
                      {student.observaciones && (
                        <div className="bg-[#04b5ac]/5 p-3 rounded-lg border border-[#04b5ac]/20">
                          <p className="text-sm text-muted-foreground italic">
                            "{student.observaciones}"
                          </p>
                        </div>
                      )}

                      {/* Contact Button */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Mail className="w-4 h-4" />
                          Contactar
                        </Button>
                        <Button variant="primary" size="sm" className="flex-1">
                          <Star className="w-4 h-4" />
                          Marcar para contratación
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
