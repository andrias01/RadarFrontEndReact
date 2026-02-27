// Tipos compartidos para la plataforma RADAR

export interface Student {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  documento: string;
  universidad: string;
  carrera: string;
  semestre: number;
  promedio: number;
  estado: 'Activo' | 'Inactivo' | 'Finalizado' | 'En espera';
  empresa?: string;
  departamento?: string;
  inicio?: string;
  evaluaciones?: number;
  habilidadesTecnicas: { [key: string]: number };
  habilidadesBlandas: { [key: string]: number };
  observaciones?: string;
  fechaRegistro: string;
}

export interface Evaluation {
  id: number;
  studentId: number;
  evaluatorName: string;
  evaluatorRole: string;
  fecha: string;
  habilidadesTecnicas: { [key: string]: number };
  habilidadesBlandas: { [key: string]: number };
  comentarios: string;
  promedioEvaluacion?: number;
}

export interface University {
  id: number;
  nombre: string;
  codigo: string;
  ciudad: string;
  programas: string[];
  estudiantesActivos: number;
  promedioGeneral: number;
}

export interface InternshipRequest {
  id: number;
  empresaId: number;
  universidadId: number;
  departamento: string;
  posicion: string;
  descripcion: string;
  habilidadesRequeridas: string[];
  duracion: string;
  fechaSolicitud: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
}

export interface StudentEvaluation extends Student {
  lastEvaluator?: string;
  lastEvaluationDate?: string;
  evaluationCount: number;
  initialExpectation?: {
    habilidadesTecnicas: { [key: string]: number };
    habilidadesBlandas: { [key: string]: number };
  };
}