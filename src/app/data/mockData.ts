import { Student, University, Evaluation } from '../types';

export const mockEvaluations: Evaluation[] = [
  {
    id: 1,
    studentId: 1,
    evaluatorName: 'Carlos Mendoza',
    evaluatorRole: 'Gerente de Desarrollo',
    fecha: '2026-02-15',
    habilidadesTecnicas: {
      'Programación': 88,
      'Análisis de datos': 92,
      'Gestión de proyectos': 85,
      'Herramientas digitales': 90
    },
    habilidadesBlandas: {
      'Trabajo en equipo': 92,
      'Comunicación': 87,
      'Liderazgo': 80,
      'Adaptabilidad': 93,
      'Pensamiento crítico': 89,
      'Resolución de problemas': 88
    },
    comentarios: 'Excelente desempeño en todas las áreas. Muestra gran iniciativa.',
    promedioEvaluacion: 89
  },
  {
    id: 2,
    studentId: 3,
    evaluatorName: 'Laura Jiménez',
    evaluatorRole: 'Directora de Diseño',
    fecha: '2026-02-20',
    habilidadesTecnicas: {
      'Adobe Creative Suite': 96,
      'UI/UX Design': 94,
      'Prototipado': 92,
      'Ilustración digital': 90
    },
    habilidadesBlandas: {
      'Trabajo en equipo': 94,
      'Comunicación': 92,
      'Liderazgo': 87,
      'Adaptabilidad': 96,
      'Pensamiento crítico': 91,
      'Resolución de problemas': 90
    },
    comentarios: 'Sobresaliente. Candidata ideal para contratación permanente.',
    promedioEvaluacion: 94
  }
];

export const mockStudents: Student[] = [
  {
    id: 1,
    nombre: 'María',
    apellido: 'González',
    email: 'maria.gonzalez@uco.edu.co',
    telefono: '+57 310 123 4567',
    documento: '1234567890',
    universidad: 'Universidad Católica de Oriente',
    carrera: 'Ingeniería Industrial',
    semestre: 8,
    promedio: 90,
    estado: 'Activo',
    empresa: 'TechCorp SA',
    departamento: 'Desarrollo',
    inicio: '2026-01-15',
    evaluaciones: 3,
    habilidadesTecnicas: {
      'Programación': 85,
      'Análisis de datos': 90,
      'Gestión de proyectos': 88,
      'Herramientas digitales': 92
    },
    habilidadesBlandas: {
      'Trabajo en equipo': 90,
      'Comunicación': 85,
      'Liderazgo': 78,
      'Adaptabilidad': 92,
      'Pensamiento crítico': 88,
      'Resolución de problemas': 86
    },
    observaciones: 'Estudiante destacado con excelente desempeño en todas las áreas.',
    fechaRegistro: '2025-12-01'
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    email: 'carlos.rodriguez@uco.edu.co',
    telefono: '+57 320 234 5678',
    documento: '2345678901',
    universidad: 'Universidad Católica de Oriente',
    carrera: 'Administración de Empresas',
    semestre: 7,
    promedio: 85,
    estado: 'Activo',
    empresa: 'TechCorp SA',
    departamento: 'Marketing',
    inicio: '2026-02-01',
    evaluaciones: 2,
    habilidadesTecnicas: {
      'Marketing digital': 88,
      'Análisis de mercado': 82,
      'CRM': 85,
      'Herramientas de diseño': 80
    },
    habilidadesBlandas: {
      'Trabajo en equipo': 88,
      'Comunicación': 90,
      'Liderazgo': 75,
      'Adaptabilidad': 85,
      'Pensamiento crítico': 82,
      'Resolución de problemas': 84
    },
    observaciones: 'Buen desempeño, muestra iniciativa en proyectos.',
    fechaRegistro: '2025-12-15'
  },
  {
    id: 3,
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana.martinez@uco.edu.co',
    telefono: '+57 315 345 6789',
    documento: '3456789012',
    universidad: 'Universidad Católica de Oriente',
    carrera: 'Diseño Gráfico',
    semestre: 9,
    promedio: 95,
    estado: 'Activo',
    empresa: 'TechCorp SA',
    departamento: 'Diseño',
    inicio: '2025-12-10',
    evaluaciones: 4,
    habilidadesTecnicas: {
      'Adobe Creative Suite': 95,
      'UI/UX Design': 92,
      'Prototipado': 90,
      'Ilustración digital': 88
    },
    habilidadesBlandas: {
      'Trabajo en equipo': 92,
      'Comunicación': 90,
      'Liderazgo': 85,
      'Adaptabilidad': 95,
      'Pensamiento crítico': 90,
      'Resolución de problemas': 88
    },
    observaciones: 'Estudiante excepcional, candidata ideal para contratación permanente.',
    fechaRegistro: '2025-11-20'
  },
  {
    id: 4,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@uco.edu.co',
    telefono: '+57 318 456 7890',
    documento: '4567890123',
    universidad: 'Universidad Católica de Oriente',
    carrera: 'Ingeniería de Sistemas',
    semestre: 10,
    promedio: 82,
    estado: 'Finalizado',
    empresa: 'TechCorp SA',
    departamento: 'Desarrollo',
    inicio: '2025-11-20',
    evaluaciones: 5,
    habilidadesTecnicas: {
      'Programación': 80,
      'Base de datos': 85,
      'Desarrollo web': 82,
      'Testing': 78
    },
    habilidadesBlandas: {
      'Trabajo en equipo': 82,
      'Comunicación': 80,
      'Liderazgo': 75,
      'Adaptabilidad': 85,
      'Pensamiento crítico': 78,
      'Resolución de problemas': 80
    },
    observaciones: 'Completó satisfactoriamente su práctica.',
    fechaRegistro: '2025-10-15'
  },
  {
    id: 5,
    nombre: 'Laura',
    apellido: 'Silva',
    email: 'laura.silva@uco.edu.co',
    telefono: '+57 312 567 8901',
    documento: '5678901234',
    universidad: 'Universidad Católica de Oriente',
    carrera: 'Comunicación Social',
    semestre: 6,
    promedio: 86,
    estado: 'Activo',
    empresa: 'TechCorp SA',
    departamento: 'Marketing',
    inicio: '2026-01-20',
    evaluaciones: 2,
    habilidadesTecnicas: {
      'Redacción': 90,
      'Redes sociales': 88,
      'Fotografía': 82,
      'Edición de video': 85
    },
    habilidadesBlandas: {
      'Trabajo en equipo': 88,
      'Comunicación': 92,
      'Liderazgo': 80,
      'Adaptabilidad': 86,
      'Pensamiento crítico': 84,
      'Resolución de problemas': 82
    },
    observaciones: 'Excelente en comunicación, muy creativa.',
    fechaRegistro: '2025-12-10'
  }
];

export const mockUniversities: University[] = [
  {
    id: 1,
    nombre: 'Universidad Católica de Oriente',
    codigo: 'UCO',
    ciudad: 'Rionegro, Antioquia',
    programas: [
      'Ingeniería Industrial',
      'Ingeniería de Sistemas',
      'Administración de Empresas',
      'Diseño Gráfico',
      'Comunicación Social',
      'Psicología',
      'Derecho',
      'Contaduría Pública'
    ],
    estudiantesActivos: 248,
    promedioGeneral: 84.5
  }
];