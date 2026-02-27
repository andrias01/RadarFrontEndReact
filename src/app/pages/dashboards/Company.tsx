import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Star,
  UserPlus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { RadarChart, ComparisonRadarChart } from '../../components/charts/RadarChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StudentProfileModal } from '../../components/StudentProfileModal';
import { EvaluationModal } from '../../components/EvaluationModal';
import { NewEvaluationModal, EvaluationData } from '../../components/NewEvaluationModal';
import { InternshipRequestModal, InternshipRequestData } from '../../components/InternshipRequestModal';
import { TalentShowcaseModal } from '../../components/TalentShowcaseModal';
import { FeedbackModal, FeedbackData } from '../../components/FeedbackModal';
import { mockStudents, mockUniversities, mockEvaluations } from '../../data/mockData';
import { Student, Evaluation } from '../../types';

export function CompanyDashboard() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isNewEvaluationModalOpen, setIsNewEvaluationModalOpen] = useState(false);
  const [isInternshipRequestModalOpen, setIsInternshipRequestModalOpen] = useState(false);
  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  // Usar datos de students (filtrar los de TechCorp SA)
  const interns = students.filter(s => s.empresa === 'TechCorp SA' && s.estado === 'Activo');
  
  // Estudiante destacado del mes basado en promedio real
  const featuredStudent = interns.reduce((max, student) => 
    student.promedio > max.promedio ? student : max
  , interns[0] || students[0]);

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleEvaluateStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEvaluationModalOpen(true);
  };

  const handleSubmitEvaluation = (evaluation: EvaluationData) => {
    // Agregar nueva evaluación
    const newEval: Evaluation = {
      id: evaluations.length + 1,
      ...evaluation,
      promedioEvaluacion: calculateEvaluationAverage(evaluation)
    };
    setEvaluations([...evaluations, newEval]);

    // Actualizar contador de evaluaciones y promedio del estudiante
    setStudents(students.map(s => {
      if (s.id === evaluation.studentId) {
        const studentEvals = [...evaluations, newEval].filter(e => e.studentId === s.id);
        const newPromedio = studentEvals.reduce((sum, e) => sum + (e.promedioEvaluacion || 0), 0) / studentEvals.length;
        
        return {
          ...s,
          evaluaciones: (s.evaluaciones || 0) + 1,
          promedio: Math.round(newPromedio),
          habilidadesTecnicas: evaluation.habilidadesTecnicas,
          habilidadesBlandas: evaluation.habilidadesBlandas
        };
      }
      return s;
    }));

    alert('Evaluación enviada exitosamente');
  };

  const calculateEvaluationAverage = (evaluation: EvaluationData): number => {
    const allSkills = [
      ...Object.values(evaluation.habilidadesTecnicas),
      ...Object.values(evaluation.habilidadesBlandas)
    ];
    return Math.round(allSkills.reduce((sum, val) => sum + val, 0) / allSkills.length);
  };

  const handleSubmitInternshipRequest = (request: InternshipRequestData) => {
    console.log('Solicitud de practicante:', request);
    alert('Solicitud enviada exitosamente a la universidad');
  };

  const handleSubmitFeedback = (feedback: FeedbackData) => {
    console.log('Retroalimentación:', feedback);
    alert('Gracias por su retroalimentación. Ha sido enviada exitosamente.');
  };

  const handleViewFeaturedProfile = () => {
    if (featuredStudent) {
      setSelectedStudent(featuredStudent);
      setIsProfileModalOpen(true);
    }
  };

  // Calcular datos reales para el gráfico de expectativa vs realidad
  const calculateComparisonData = () => {
    const skillsExpectation: { [key: string]: number[] } = {};
    const skillsActual: { [key: string]: number[] } = {};

    interns.forEach(student => {
      Object.entries(student.habilidadesBlandas).forEach(([skill, value]) => {
        if (!skillsExpectation[skill]) {
          skillsExpectation[skill] = [];
          skillsActual[skill] = [];
        }
        // Expectativa inicial (asumimos 75 como baseline)
        skillsExpectation[skill].push(75);
        skillsActual[skill].push(value);
      });
    });

    return Object.keys(skillsExpectation).map(skill => ({
      subject: skill,
      expected: Math.round(skillsExpectation[skill].reduce((a, b) => a + b, 0) / skillsExpectation[skill].length),
      actual: Math.round(skillsActual[skill].reduce((a, b) => a + b, 0) / skillsActual[skill].length),
      fullMark: 100
    }));
  };

  const comparisonData = calculateComparisonData();

  // Radar data para el estudiante destacado
  const featuredRadarData = featuredStudent ? 
    Object.entries(featuredStudent.habilidadesBlandas).map(([key, value]) => ({
      subject: key,
      value: value,
      fullMark: 100
    })) : [];

  // Datos por departamento
  const departmentData = [
    { departamento: 'Desarrollo', promedio: 88, practicantes: interns.filter(s => s.departamento === 'Desarrollo').length },
    { departamento: 'Diseño', promedio: 92, practicantes: interns.filter(s => s.departamento === 'Diseño').length },
    { departamento: 'Marketing', promedio: 85, practicantes: interns.filter(s => s.departamento === 'Marketing').length },
    { departamento: 'Ventas', promedio: 79, practicantes: 0 },
    { departamento: 'RRHH', promedio: 87, practicantes: 0 }
  ];

  // Fecha actual para calcular evaluaciones pendientes del mes
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const studentsNeedingEvaluation = interns.filter(student => {
    const lastEval = evaluations
      .filter(e => e.studentId === student.id)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];
    
    if (!lastEval) return true; // Nunca evaluado
    
    const lastEvalDate = new Date(lastEval.fecha);
    const daysSinceEval = (Date.now() - lastEvalDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceEval > 30; // Más de 30 días desde última evaluación
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Empresa</h1>
            <p className="text-muted-foreground">TechCorp SA - Gestión de Practicantes</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsFeedbackModalOpen(true)}>
              <MessageSquare className="w-4 h-4" />
              Feedback
            </Button>
            <Button variant="primary" onClick={() => setIsNewEvaluationModalOpen(true)}>
              <UserPlus className="w-4 h-4" />
              Nueva evaluación
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Practicantes activos</p>
                  <p className="text-3xl font-bold mt-1">{interns.length}</p>
                  <p className="text-xs text-[#008b50] mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +{Math.round(interns.length * 0.15)} este mes
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#008b50]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#008b50]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Promedio general</p>
                  <p className="text-3xl font-bold mt-1">
                    {interns.length > 0 
                      ? Math.round(interns.reduce((sum, s) => sum + s.promedio, 0) / interns.length)
                      : 0
                    }
                  </p>
                  <p className="text-xs text-[#04b5ac] mt-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Excelente desempeño
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#04b5ac]/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#04b5ac]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Evaluaciones pendientes</p>
                  <p className="text-3xl font-bold mt-1">{studentsNeedingEvaluation.length}</p>
                  <p className="text-xs text-[#ffca00] mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Por completar
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#ffca00]/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#ffca00]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasa retención</p>
                  <p className="text-3xl font-bold mt-1">78%</p>
                  <p className="text-xs text-[#e28210] mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Post-práctica
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#e28210]/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#e28210]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Radar de Practicante Destacado */}
          <Card>
            <CardHeader>
              <CardTitle>Practicante Destacado del Mes</CardTitle>
              <CardDescription>
                {featuredStudent ? `${featuredStudent.nombre} ${featuredStudent.apellido} - ${featuredStudent.carrera}` : 'No disponible'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {featuredStudent && <RadarChart data={featuredRadarData} height={320} color="#04b5ac" />}
              <div className="mt-4 flex items-center justify-between p-4 bg-[#04b5ac]/10 rounded-lg">
                <div>
                  <p className="text-sm font-semibold">Recomendación</p>
                  <p className="text-xs text-muted-foreground mt-1">Considerar para contratación permanente</p>
                </div>
                <Button variant="primary" size="sm" onClick={handleViewFeaturedProfile}>
                  Ver perfil completo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Comparación Expectativa vs Real */}
          <Card>
            <CardHeader>
              <CardTitle>Expectativa vs Realidad</CardTitle>
              <CardDescription>Promedio de todos los practicantes</CardDescription>
            </CardHeader>
            <CardContent>
              <ComparisonRadarChart 
                data={comparisonData} 
                beforeKey="expected" 
                afterKey="actual" 
                height={320} 
              />
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Expectativa inicial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#008b50]"></div>
                  <span>Desempeño real</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desempeño por Departamento */}
        <Card>
          <CardHeader>
            <CardTitle>Desempeño por Departamento</CardTitle>
            <CardDescription>Distribución de practicantes y promedio de evaluación</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="departamento" tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--foreground)' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)'
                  }}
                />
                <Bar dataKey="promedio" fill="#008b50" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabla de Practicantes */}
        <Card>
          <CardHeader>
            <CardTitle>Gestión y Seguimiento de Estudiantes en Práctica</CardTitle>
            <CardDescription>Lista completa de practicantes actuales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Nombre Completo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Universidad</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Departamento</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Inicio</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Promedio</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Evaluaciones</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Estado</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {interns.map((intern) => (
                    <tr key={intern.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{intern.nombre} {intern.apellido}</p>
                          <p className="text-xs text-muted-foreground">{intern.carrera}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{intern.universidad}</td>
                      <td className="py-3 px-4 text-sm">{intern.departamento}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {intern.inicio ? new Date(intern.inicio).toLocaleDateString('es-ES') : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2 max-w-[60px]">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-[#008b50] to-[#04b5ac]"
                              style={{ width: `${intern.promedio}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{intern.promedio}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#04b5ac]/10 text-[#04b5ac]">
                          <CheckCircle2 className="w-3 h-3" />
                          {intern.evaluaciones || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          intern.estado === 'Activo' 
                            ? 'bg-[#008b50]/10 text-[#008b50]' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {intern.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button 
                            className="p-1.5 hover:bg-muted rounded transition-colors"
                            onClick={() => handleViewProfile(intern)}
                            title="Ver perfil"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1.5 hover:bg-muted rounded transition-colors"
                            onClick={() => handleEvaluateStudent(intern)}
                            title="Generar reporte"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          {intern.estado === 'Activo' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEvaluateStudent(intern)}
                            >
                              Evaluar
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card 
            className="border-2 border-[#008b50]/20 hover:border-[#008b50]/40 transition-colors cursor-pointer"
            onClick={() => setIsInternshipRequestModalOpen(true)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#008b50]/10 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-[#008b50]" />
                </div>
                <div>
                  <p className="font-semibold">Solicitar practicante</p>
                  <p className="text-sm text-muted-foreground">Buscar nuevo talento</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-[#04b5ac]/20 hover:border-[#04b5ac]/40 transition-colors cursor-pointer"
            onClick={() => {
              if (studentsNeedingEvaluation.length > 0) {
                alert(`${studentsNeedingEvaluation.length} practicantes necesitan evaluación este mes:\n\n` + 
                  studentsNeedingEvaluation.map(s => `- ${s.nombre} ${s.apellido}`).join('\n'));
              } else {
                alert('No hay evaluaciones pendientes este mes');
              }
            }}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#04b5ac]/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#04b5ac]" />
                </div>
                <div>
                  <p className="font-semibold">Evaluaciones pendientes</p>
                  <p className="text-sm text-muted-foreground">{studentsNeedingEvaluation.length} por completar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-[#ffca00]/20 hover:border-[#ffca00]/40 transition-colors cursor-pointer"
            onClick={() => setIsTalentModalOpen(true)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ffca00]/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#ffca00]" />
                </div>
                <div>
                  <p className="font-semibold">Talento destacado</p>
                  <p className="text-sm text-muted-foreground">Ver recomendaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modales */}
        <StudentProfileModal 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
          student={selectedStudent} 
        />
        <EvaluationModal 
          isOpen={isEvaluationModalOpen} 
          onClose={() => setIsEvaluationModalOpen(false)} 
          student={selectedStudent} 
          onSubmit={handleSubmitEvaluation} 
        />
        <NewEvaluationModal 
          isOpen={isNewEvaluationModalOpen} 
          onClose={() => setIsNewEvaluationModalOpen(false)} 
          onSubmit={handleSubmitEvaluation} 
          students={interns}
        />
        <InternshipRequestModal 
          isOpen={isInternshipRequestModalOpen} 
          onClose={() => setIsInternshipRequestModalOpen(false)} 
          onSubmit={handleSubmitInternshipRequest} 
          universities={mockUniversities} 
        />
        <TalentShowcaseModal 
          isOpen={isTalentModalOpen} 
          onClose={() => setIsTalentModalOpen(false)} 
          students={interns} 
        />
        <FeedbackModal 
          isOpen={isFeedbackModalOpen} 
          onClose={() => setIsFeedbackModalOpen(false)} 
          onSubmit={handleSubmitFeedback} 
        />
      </div>
    </div>
  );
}
