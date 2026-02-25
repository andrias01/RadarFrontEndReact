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
  MessageSquare
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { RadarChart, ComparisonRadarChart } from '../../components/charts/RadarChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CompanyDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const radarData = [
    { subject: 'Trabajo en equipo', value: 90, fullMark: 100 },
    { subject: 'Comunicación', value: 85, fullMark: 100 },
    { subject: 'Liderazgo', value: 78, fullMark: 100 },
    { subject: 'Adaptabilidad', value: 92, fullMark: 100 },
    { subject: 'Pensamiento crítico', value: 88, fullMark: 100 },
    { subject: 'Resolución', value: 86, fullMark: 100 }
  ];

  const comparisonData = [
    { subject: 'Trabajo en equipo', expected: 75, actual: 90, fullMark: 100 },
    { subject: 'Comunicación', expected: 70, actual: 85, fullMark: 100 },
    { subject: 'Liderazgo', expected: 65, actual: 78, fullMark: 100 },
    { subject: 'Adaptabilidad', expected: 80, actual: 92, fullMark: 100 },
    { subject: 'Pensamiento crítico', expected: 75, actual: 88, fullMark: 100 },
    { subject: 'Resolución', expected: 70, actual: 86, fullMark: 100 }
  ];

  const departmentData = [
    { departamento: 'Desarrollo', promedio: 88, practicantes: 8 },
    { departamento: 'Diseño', promedio: 92, practicantes: 5 },
    { departamento: 'Marketing', promedio: 85, practicantes: 6 },
    { departamento: 'Ventas', promedio: 79, practicantes: 4 },
    { departamento: 'RRHH', promedio: 87, practicantes: 3 }
  ];

  const interns = [
    { 
      id: 1, 
      nombre: 'María González', 
      universidad: 'UTN', 
      carrera: 'Ingeniería Industrial',
      departamento: 'Desarrollo',
      promedio: 90,
      inicio: '2026-01-15',
      estado: 'Activo',
      evaluaciones: 3
    },
    { 
      id: 2, 
      nombre: 'Carlos Rodríguez', 
      universidad: 'UBA', 
      carrera: 'Administración',
      departamento: 'Marketing',
      promedio: 85,
      inicio: '2026-02-01',
      estado: 'Activo',
      evaluaciones: 2
    },
    { 
      id: 3, 
      nombre: 'Ana Martínez', 
      universidad: 'UADE', 
      carrera: 'Diseño Gráfico',
      departamento: 'Diseño',
      promedio: 95,
      inicio: '2025-12-10',
      estado: 'Activo',
      evaluaciones: 4
    },
    { 
      id: 4, 
      nombre: 'Juan Pérez', 
      universidad: 'UTN', 
      carrera: 'Ingeniería de Sistemas',
      departamento: 'Desarrollo',
      promedio: 82,
      inicio: '2025-11-20',
      estado: 'Finalizado',
      evaluaciones: 5
    }
  ];

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
            <Button variant="outline">
              <MessageSquare className="w-4 h-4" />
              Feedback
            </Button>
            <Button variant="primary">
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
                  <p className="text-3xl font-bold mt-1">18</p>
                  <p className="text-xs text-[#008b50] mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +3 este mes
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
                  <p className="text-3xl font-bold mt-1">86.8</p>
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
                  <p className="text-3xl font-bold mt-1">5</p>
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
              <CardDescription>Ana Martínez - Diseño Gráfico</CardDescription>
            </CardHeader>
            <CardContent>
              <RadarChart data={radarData} height={320} color="#04b5ac" />
              <div className="mt-4 flex items-center justify-between p-4 bg-[#04b5ac]/10 rounded-lg">
                <div>
                  <p className="text-sm font-semibold">Recomendación</p>
                  <p className="text-xs text-muted-foreground mt-1">Considerar para contratación permanente</p>
                </div>
                <Button variant="primary" size="sm">
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
            <CardTitle>Practicantes Actuales</CardTitle>
            <CardDescription>Gestión y seguimiento de estudiantes en práctica</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Nombre</th>
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
                          <p className="font-medium">{intern.nombre}</p>
                          <p className="text-xs text-muted-foreground">{intern.carrera}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{intern.universidad}</td>
                      <td className="py-3 px-4 text-sm">{intern.departamento}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(intern.inicio).toLocaleDateString('es-ES')}
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
                          {intern.evaluaciones}
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
                          <button className="p-1.5 hover:bg-muted rounded transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-muted rounded transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          {intern.estado === 'Activo' && (
                            <Button variant="outline" size="sm">
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
          <Card className="border-2 border-[#008b50]/20 hover:border-[#008b50]/40 transition-colors cursor-pointer">
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

          <Card className="border-2 border-[#04b5ac]/20 hover:border-[#04b5ac]/40 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#04b5ac]/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#04b5ac]" />
                </div>
                <div>
                  <p className="font-semibold">Evaluaciones pendientes</p>
                  <p className="text-sm text-muted-foreground">5 por completar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ffca00]/20 hover:border-[#ffca00]/40 transition-colors cursor-pointer">
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
      </div>
    </div>
  );
}
