import React from 'react';
import { Student } from '../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RadarChart } from './charts/RadarChart';
import { Mail, Phone, FileText, GraduationCap, Building2, Calendar, Award } from 'lucide-react';

interface StudentProfileModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentProfileModal({ student, isOpen, onClose }: StudentProfileModalProps) {
  if (!student) return null;

  const radarData = Object.entries(student.habilidadesBlandas).map(([key, value]) => ({
    subject: key,
    value: value,
    fullMark: 100
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Perfil del Estudiante</DialogTitle>
          <DialogDescription>Información completa y evaluación de competencias</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Información Personal */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#008b50]" />
              Información Personal
            </h3>
            <div className="grid md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Nombre completo</p>
                <p className="font-medium">{student.nombre} {student.apellido}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documento</p>
                <p className="font-medium">{student.documento}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email
                </p>
                <p className="font-medium text-sm">{student.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Teléfono
                </p>
                <p className="font-medium">{student.telefono}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Información Académica */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#04b5ac]" />
              Información Académica
            </h3>
            <div className="grid md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Universidad</p>
                <p className="font-medium">{student.universidad}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carrera</p>
                <p className="font-medium">{student.carrera}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Semestre</p>
                <p className="font-medium">{student.semestre}° Semestre</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Award className="w-3 h-3" /> Promedio
                </p>
                <p className="font-medium text-[#008b50]">{student.promedio}</p>
              </div>
            </div>
          </div>

          {student.empresa && (
            <>
              <Separator />
              {/* Información de Práctica */}
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#ffca00]" />
                  Información de Práctica
                </h3>
                <div className="grid md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Empresa</p>
                    <p className="font-medium">{student.empresa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Departamento</p>
                    <p className="font-medium">{student.departamento}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Fecha de inicio
                    </p>
                    <p className="font-medium">
                      {student.inicio ? new Date(student.inicio).toLocaleDateString('es-ES') : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <Badge className={
                      student.estado === 'Activo' 
                        ? 'bg-[#008b50]/10 text-[#008b50] hover:bg-[#008b50]/20' 
                        : student.estado === 'Finalizado'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-[#ffca00]/10 text-[#e28210] hover:bg-[#ffca00]/20'
                    }>
                      {student.estado}
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Habilidades Blandas - Radar Chart */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Habilidades Blandas</h3>
            <div className="bg-muted/30 p-4 rounded-lg">
              <RadarChart data={radarData} height={320} color="#04b5ac" />
            </div>
          </div>

          <Separator />

          {/* Habilidades Técnicas */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Habilidades Técnicas</h3>
            <div className="grid md:grid-cols-2 gap-3 bg-muted/30 p-4 rounded-lg">
              {Object.entries(student.habilidadesTecnicas).map(([skill, value]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill}</span>
                    <span className="text-sm font-bold text-[#008b50]">{value}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#008b50] to-[#04b5ac]"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {student.observaciones && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Observaciones</h3>
                <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
                  {student.observaciones}
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
