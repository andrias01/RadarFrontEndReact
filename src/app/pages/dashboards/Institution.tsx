import React, { useState } from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Award,
  Upload,
  Download,
  Filter,
  Search,
  MoreVertical,
  Eye,
  FileText,
  BarChart3,
  UserPlus,
  Edit,
  Trash2,
  ToggleLeft,
  Sliders
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { RadarChart } from '../../components/charts/RadarChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { StudentProfileModal } from '../../components/StudentProfileModal';
import { StudentFormModal } from '../../components/StudentFormModal';
import { SkillsEditorModal } from '../../components/SkillsEditorModal';
import { mockStudents, mockEvaluations } from '../../data/mockData';
import { Student, Evaluation } from '../../types';

export function InstitutionDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [showActionsMenu, setShowActionsMenu] = useState<number | null>(null);

  const institutionName = 'Universidad Católica de Oriente';

  // Calcular datos reales desde los estudiantes
  const activeStudents = students.filter(s => s.estado === 'Activo');
  const averagePromedio = students.length > 0 
    ? students.reduce((sum, s) => sum + s.promedio, 0) / students.length 
    : 0;

  // Agrupar datos por carrera
  const careerStats = students.reduce((acc, student) => {
    const carrera = student.carrera;
    if (!acc[carrera]) {
      acc[carrera] = { total: 0, sum: 0 };
    }
    acc[carrera].total += 1;
    acc[carrera].sum += student.promedio;
    return acc;
  }, {} as Record<string, { total: number; sum: number }>);

  const careerData = Object.entries(careerStats).map(([carrera, stats]) => ({
    carrera: carrera.split(' ')[0], // Simplificar nombre
    estudiantes: stats.total,
    promedio: Math.round(stats.sum / stats.total)
  }));

  // Calcular promedio de habilidades blandas para el radar
  const calculateAverageSkills = () => {
    if (students.length === 0) return [];
    
    const skillsSum: { [key: string]: number } = {};
    const skillsCount: { [key: string]: number } = {};
    
    students.forEach(student => {
      Object.entries(student.habilidadesBlandas).forEach(([skill, value]) => {
        if (!skillsSum[skill]) {
          skillsSum[skill] = 0;
          skillsCount[skill] = 0;
        }
        skillsSum[skill] += value;
        skillsCount[skill] += 1;
      });
    });
    
    return Object.entries(skillsSum).map(([skill, sum]) => ({
      subject: skill,
      value: Math.round(sum / skillsCount[skill]),
      fullMark: 100
    }));
  };

  const radarData = calculateAverageSkills();

  // Datos de rendimiento mensual (simulado)
  const performanceData = [
    { mes: 'Ene', promedio: 72 },
    { mes: 'Feb', promedio: 75 },
    { mes: 'Mar', promedio: 78 },
    { mes: 'Abr', promedio: 82 },
    { mes: 'May', promedio: 85 },
    { mes: 'Jun', promedio: Math.round(averagePromedio) }
  ];

  const handleOpenProfileModal = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setSelectedStudent(null);
    setIsProfileModalOpen(false);
  };

  const handleOpenFormModal = (mode: 'create' | 'edit', student?: Student) => {
    setFormMode(mode);
    if (mode === 'edit' && student) {
      setSelectedStudent(student);
    } else {
      setSelectedStudent(null);
    }
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setSelectedStudent(null);
    setIsFormModalOpen(false);
  };

  const handleSubmitStudent = (studentData: Partial<Student>) => {
    if (formMode === 'create') {
      const newStudent: Student = {
        ...studentData,
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        habilidadesTecnicas: studentData.habilidadesTecnicas || {},
        habilidadesBlandas: studentData.habilidadesBlandas || {},
      } as Student;
      setStudents([...students, newStudent]);
      alert('Estudiante registrado exitosamente');
    } else {
      setStudents(students.map(s => 
        s.id === selectedStudent?.id ? { ...s, ...studentData } : s
      ));
      alert('Estudiante actualizado exitosamente');
    }
    handleCloseFormModal();
  };

  const handleDeleteStudent = (studentId: number) => {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      setStudents(students.filter(s => s.id !== studentId));
      alert('Estudiante eliminado exitosamente');
    }
  };

  const handleChangeStatus = (student: Student) => {
    const newStatus = prompt(
      `Cambiar estado de ${student.nombre} ${student.apellido}.\nEstado actual: ${student.estado}\nNuevo estado (Activo/Inactivo/En espera/Finalizado):`
    );
    if (newStatus && ['Activo', 'Inactivo', 'En espera', 'Finalizado'].includes(newStatus)) {
      setStudents(students.map(s => 
        s.id === student.id ? { ...s, estado: newStatus as Student['estado'] } : s
      ));
      alert('Estado actualizado exitosamente');
    }
  };

  const handleExportCSV = () => {
    // Preparar datos para CSV
    const headers = ['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'Documento', 'Universidad', 'Carrera', 'Semestre', 'Promedio', 'Estado', 'Empresa', 'Departamento', 'Fecha Inicio', 'Evaluaciones'];
    const csvData = students.map(s => [
      s.id,
      s.nombre,
      s.apellido,
      s.email,
      s.telefono,
      s.documento,
      s.universidad,
      s.carrera,
      s.semestre,
      s.promedio,
      s.estado,
      s.empresa || '',
      s.departamento || '',
      s.inicio || '',
      s.evaluaciones || 0
    ]);

    // Crear CSV
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `estudiantes_${institutionName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      
      // Omitir la primera línea (encabezados)
      const dataLines = lines.slice(1).filter(line => line.trim());
      
      const importedStudents: Student[] = dataLines.map((line, index) => {
        const values = line.split(',');
        return {
          id: students.length + index + 1,
          nombre: values[1]?.trim() || '',
          apellido: values[2]?.trim() || '',
          email: values[3]?.trim() || '',
          telefono: values[4]?.trim() || '',
          documento: values[5]?.trim() || '',
          universidad: values[6]?.trim() || institutionName,
          carrera: values[7]?.trim() || '',
          semestre: parseInt(values[8]) || 1,
          promedio: parseFloat(values[9]) || 0,
          estado: (values[10]?.trim() as Student['estado']) || 'Activo',
          empresa: values[11]?.trim() || undefined,
          departamento: values[12]?.trim() || undefined,
          inicio: values[13]?.trim() || undefined,
          evaluaciones: parseInt(values[14]) || 0,
          habilidadesTecnicas: {},
          habilidadesBlandas: {},
          fechaRegistro: new Date().toISOString().split('T')[0]
        };
      });

      setStudents([...students, ...importedStudents]);
      alert(`${importedStudents.length} estudiantes importados exitosamente`);
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const filteredStudents = students.filter(s => 
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.carrera.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Institución</h1>
            <p className="text-muted-foreground">{institutionName}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <label htmlFor="csv-upload">
              <Button variant="outline" as="span">
                <Upload className="w-4 h-4" />
                Cargar CSV
              </Button>
            </label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
            <Button variant="primary" onClick={() => handleOpenFormModal('create')}>
              <UserPlus className="w-4 h-4" />
              Nuevo estudiante
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Estudiantes en práctica</p>
                  <p className="text-3xl font-bold mt-1">248</p>
                  <p className="text-xs text-[#008b50] mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% vs mes anterior
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
                  <p className="text-3xl font-bold mt-1">84.5</p>
                  <p className="text-xs text-[#04b5ac] mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +3.2 puntos
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#04b5ac]/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#04b5ac]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Empresas aliadas</p>
                  <p className="text-3xl font-bold mt-1">42</p>
                  <p className="text-xs text-[#ffca00] mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +5 nuevas este mes
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#ffca00]/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#ffca00]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasa de éxito</p>
                  <p className="text-3xl font-bold mt-1">92%</p>
                  <p className="text-xs text-[#e28210] mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Excelente desempeño
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#e28210]/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#e28210]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Radar de Competencias */}
          <Card>
            <CardHeader>
              <CardTitle>Competencias Institucionales</CardTitle>
              <CardDescription>Promedio de todos los estudiantes en práctica</CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChart data={radarData} height={320} />
            </CardContent>
          </Card>

          {/* Evolución Temporal */}
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Desempeño</CardTitle>
              <CardDescription>Tendencia mensual del promedio general</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" tick={{ fill: 'var(--foreground)' }} />
                  <YAxis tick={{ fill: 'var(--foreground)' }} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--foreground)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="promedio" 
                    stroke="#008b50" 
                    strokeWidth={3}
                    dot={{ fill: '#008b50', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Desempeño por Carrera */}
        <Card>
          <CardHeader>
            <CardTitle>Desempeño por Carrera</CardTitle>
            <CardDescription>Comparativa de estudiantes y promedio por programa académico</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={careerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="carrera" tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: 'var(--foreground)' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--foreground)' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="estudiantes" fill="#04b5ac" name="Estudiantes" />
                <Bar yAxisId="right" dataKey="promedio" fill="#ffca00" name="Promedio" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabla de Estudiantes */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Seguimiento de Estudiantes</CardTitle>
                <CardDescription>Listado de estudiantes actualmente en práctica</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 md:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar estudiante..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50] w-full md:w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 text-xs font-semibold">Nombre Completo</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">Carrera</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">En Práctica</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">Empresa</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">Evaluaciones</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">Último Evaluador</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">Fechas</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">Promedio</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">Estado</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const lastEval = evaluations.filter(e => e.studentId === student.id).sort((a, b) => 
                      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
                    )[0];
                    const enPractica = student.empresa ? 'Sí' : 'No';
                    const fechaFin = student.inicio ? new Date(new Date(student.inicio).getTime() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : '-';
                    
                    return (
                      <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-3 font-medium">{student.nombre} {student.apellido}</td>
                        <td className="py-3 px-3 text-xs text-muted-foreground">{student.carrera}</td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                            enPractica === 'Sí' 
                              ? 'bg-[#008b50]/10 text-[#008b50]' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {enPractica}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs">{student.empresa || '-'}</td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#04b5ac]/10 text-[#04b5ac]">
                            {student.evaluaciones || 0}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs text-muted-foreground">{lastEval?.evaluatorName || '-'}</td>
                        <td className="py-3 px-3 text-xs text-muted-foreground">
                          {student.inicio && (
                            <>
                              <div>Inicio: {new Date(student.inicio).toLocaleDateString('es-ES')}</div>
                              <div>Fin: {new Date(fechaFin).toLocaleDateString('es-ES')}</div>
                            </>
                          )}
                          {!student.inicio && '-'}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                            student.promedio >= 85 
                              ? 'bg-[#008b50]/10 text-[#008b50]' 
                              : student.promedio >= 70 
                              ? 'bg-[#ffca00]/10 text-[#e28210]'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {student.promedio}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                            student.estado === 'Activo' 
                              ? 'bg-[#04b5ac]/10 text-[#04b5ac]' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {student.estado}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1">
                            <button 
                              className="p-1.5 hover:bg-muted rounded" 
                              onClick={() => handleOpenProfileModal(student)}
                              title="Ver perfil"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 hover:bg-muted rounded" 
                              onClick={() => { setSelectedStudent(student); setIsSkillsModalOpen(true); }}
                              title="Editar habilidades"
                            >
                              <Sliders className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 hover:bg-muted rounded" 
                              onClick={() => handleOpenFormModal('edit', student)}
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 hover:bg-muted rounded text-red-500" 
                              onClick={() => handleDeleteStudent(student.id)}
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <StudentProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} student={selectedStudent} />
      <StudentFormModal 
        isOpen={isFormModalOpen} 
        onClose={handleCloseFormModal} 
        mode={formMode} 
        student={selectedStudent} 
        onSubmit={handleSubmitStudent}
        institutionName={institutionName}
      />
      <SkillsEditorModal 
        isOpen={isSkillsModalOpen} 
        onClose={() => setIsSkillsModalOpen(false)} 
        student={selectedStudent} 
        onSubmit={(studentId, habilidadesTecnicas, habilidadesBlandas) => {
          setStudents(students.map(s => 
            s.id === studentId ? { ...s, habilidadesTecnicas, habilidadesBlandas } : s
          ));
          alert('Habilidades actualizadas exitosamente');
          setIsSkillsModalOpen(false);
        }}
      />
    </div>
  );
}