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
  BarChart3
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { RadarChart } from '../../components/charts/RadarChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export function InstitutionDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  const radarData = [
    { subject: 'Trabajo en equipo', value: 82, fullMark: 100 },
    { subject: 'Comunicación', value: 88, fullMark: 100 },
    { subject: 'Liderazgo', value: 74, fullMark: 100 },
    { subject: 'Adaptabilidad', value: 85, fullMark: 100 },
    { subject: 'Pensamiento crítico', value: 79, fullMark: 100 },
    { subject: 'Resolución', value: 81, fullMark: 100 }
  ];

  const performanceData = [
    { mes: 'Ene', promedio: 72 },
    { mes: 'Feb', promedio: 75 },
    { mes: 'Mar', promedio: 78 },
    { mes: 'Abr', promedio: 82 },
    { mes: 'May', promedio: 85 },
    { mes: 'Jun', promedio: 87 }
  ];

  const careerData = [
    { carrera: 'Ingeniería', estudiantes: 145, promedio: 85 },
    { carrera: 'Administración', estudiantes: 120, promedio: 82 },
    { carrera: 'Diseño', estudiantes: 98, promedio: 88 },
    { carrera: 'Comunicación', estudiantes: 76, promedio: 79 },
    { carrera: 'Psicología', estudiantes: 65, promedio: 81 }
  ];

  const students = [
    { id: 1, nombre: 'María González', carrera: 'Ingeniería Industrial', empresa: 'TechCorp SA', promedio: 88, estado: 'Activo' },
    { id: 2, nombre: 'Carlos Rodríguez', carrera: 'Administración', empresa: 'Innovate Inc', promedio: 85, estado: 'Activo' },
    { id: 3, nombre: 'Ana Martínez', carrera: 'Diseño Gráfico', empresa: 'Creative Studio', promedio: 92, estado: 'Activo' },
    { id: 4, nombre: 'Juan Pérez', carrera: 'Ingeniería de Sistemas', empresa: 'DevLabs', promedio: 79, estado: 'Finalizado' },
    { id: 5, nombre: 'Laura Silva', carrera: 'Comunicación', empresa: 'Media Group', promedio: 86, estado: 'Activo' }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Institución</h1>
            <p className="text-muted-foreground">Universidad Tecnológica Nacional</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <Button variant="primary">
              <Upload className="w-4 h-4" />
              Cargar datos
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
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Nombre</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Carrera</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Empresa</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Promedio</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Estado</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{student.nombre}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{student.carrera}</td>
                      <td className="py-3 px-4 text-sm">{student.empresa}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          student.promedio >= 85 
                            ? 'bg-[#008b50]/10 text-[#008b50]' 
                            : student.promedio >= 70 
                            ? 'bg-[#ffca00]/10 text-[#e28210]'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {student.promedio}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          student.estado === 'Activo' 
                            ? 'bg-[#04b5ac]/10 text-[#04b5ac]' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {student.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-muted rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded">
                            <FileText className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
