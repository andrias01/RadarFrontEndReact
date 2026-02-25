import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Building2, 
  GraduationCap,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'forms' | 'attributes'>('overview');

  const userDistribution = [
    { name: 'Instituciones', value: 42, color: '#008b50' },
    { name: 'Empresas', value: 68, color: '#04b5ac' },
    { name: 'Estudiantes', value: 248, color: '#ffca00' },
    { name: 'Administradores', value: 5, color: '#1d3475' }
  ];

  const activityData = [
    { mes: 'Ene', usuarios: 280, evaluaciones: 156 },
    { mes: 'Feb', usuarios: 310, evaluaciones: 189 },
    { mes: 'Mar', usuarios: 295, evaluaciones: 203 },
    { mes: 'Abr', usuarios: 340, evaluaciones: 228 },
    { mes: 'May', usuarios: 363, evaluaciones: 245 },
    { mes: 'Jun', usuarios: 380, evaluaciones: 267 }
  ];

  const attributes = [
    { id: 1, nombre: 'Trabajo en equipo', categoria: 'Colaboración', activo: true, usos: 248 },
    { id: 2, nombre: 'Comunicación', categoria: 'Habilidades blandas', activo: true, usos: 248 },
    { id: 3, nombre: 'Liderazgo', categoria: 'Gestión', activo: true, usos: 186 },
    { id: 4, nombre: 'Adaptabilidad', categoria: 'Resiliencia', activo: true, usos: 234 },
    { id: 5, nombre: 'Pensamiento crítico', categoria: 'Cognición', activo: true, usos: 221 },
    { id: 6, nombre: 'Resolución de problemas', categoria: 'Cognición', activo: true, usos: 248 },
    { id: 7, nombre: 'Creatividad', categoria: 'Innovación', activo: false, usos: 92 }
  ];

  const users = [
    { id: 1, nombre: 'Universidad Tecnológica', tipo: 'Institución', email: 'admin@utn.edu', estudiantes: 145, activo: true },
    { id: 2, nombre: 'TechCorp SA', tipo: 'Empresa', email: 'hr@techcorp.com', practicantes: 18, activo: true },
    { id: 3, nombre: 'Universidad de Buenos Aires', tipo: 'Institución', email: 'contacto@uba.ar', estudiantes: 98, activo: true },
    { id: 4, nombre: 'Innovate Inc', tipo: 'Empresa', email: 'talent@innovate.com', practicantes: 12, activo: true },
    { id: 5, nombre: 'UADE', tipo: 'Institución', email: 'info@uade.edu', estudiantes: 76, activo: false }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestión integral de la plataforma RADAR</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4" />
              Exportar reportes
            </Button>
            <Button variant="primary">
              <Settings className="w-4 h-4" />
              Configuración
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Resumen', icon: Activity },
              { id: 'users', label: 'Usuarios', icon: Users },
              { id: 'forms', label: 'Formularios', icon: Edit },
              { id: 'attributes', label: 'Atributos', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#008b50] text-[#008b50]'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total usuarios</p>
                      <p className="text-3xl font-bold mt-1">363</p>
                      <p className="text-xs text-[#008b50] mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +17 este mes
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
                      <p className="text-sm text-muted-foreground">Instituciones</p>
                      <p className="text-3xl font-bold mt-1">42</p>
                      <p className="text-xs text-[#04b5ac] mt-1">Activas</p>
                    </div>
                    <div className="w-12 h-12 bg-[#04b5ac]/10 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-[#04b5ac]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Empresas</p>
                      <p className="text-3xl font-bold mt-1">68</p>
                      <p className="text-xs text-[#ffca00] mt-1">Registradas</p>
                    </div>
                    <div className="w-12 h-12 bg-[#ffca00]/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-[#ffca00]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Evaluaciones</p>
                      <p className="text-3xl font-bold mt-1">1,288</p>
                      <p className="text-xs text-[#e28210] mt-1">Total realizadas</p>
                    </div>
                    <div className="w-12 h-12 bg-[#e28210]/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-[#e28210]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Usuarios</CardTitle>
                  <CardDescription>Por tipo de cuenta en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actividad de la Plataforma</CardTitle>
                  <CardDescription>Usuarios activos y evaluaciones por mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="mes" tick={{ fill: 'var(--foreground)' }} />
                      <YAxis tick={{ fill: 'var(--foreground)' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          color: 'var(--foreground)'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="usuarios" stroke="#008b50" strokeWidth={2} name="Usuarios" />
                      <Line type="monotone" dataKey="evaluaciones" stroke="#04b5ac" strokeWidth={2} name="Evaluaciones" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Gestión de Usuarios</CardTitle>
                  <CardDescription>Administrar instituciones, empresas y estudiantes</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar usuario..."
                      className="pl-9 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50] w-64"
                    />
                  </div>
                  <Button variant="primary">
                    <Plus className="w-4 h-4" />
                    Nuevo usuario
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
                      <th className="text-left py-3 px-4 text-sm font-semibold">Tipo</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Métricas</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Estado</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium">{user.nombre}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.tipo === 'Institución' 
                              ? 'bg-[#008b50]/10 text-[#008b50]' 
                              : 'bg-[#04b5ac]/10 text-[#04b5ac]'
                          }`}>
                            {user.tipo}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="py-3 px-4 text-sm">
                          {user.tipo === 'Institución' 
                            ? `${user.estudiantes} estudiantes` 
                            : `${user.practicantes} practicantes`}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.activo 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {user.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 hover:bg-muted rounded transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 hover:bg-muted rounded transition-colors text-destructive">
                              <Trash2 className="w-4 h-4" />
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
        )}

        {/* Attributes Tab */}
        {activeTab === 'attributes' && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Atributos de Calidad</CardTitle>
                  <CardDescription>Competencias y habilidades evaluadas en la plataforma</CardDescription>
                </div>
                <Button variant="primary">
                  <Plus className="w-4 h-4" />
                  Nuevo atributo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {attributes.map((attr) => (
                  <Card key={attr.id} className={`${attr.activo ? 'border-[#008b50]/20' : 'border-muted'}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{attr.nombre}</h4>
                          <p className="text-xs text-muted-foreground">{attr.categoria}</p>
                        </div>
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-muted rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          attr.activo 
                            ? 'bg-[#008b50]/10 text-[#008b50]' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {attr.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        <span className="text-xs text-muted-foreground">{attr.usos} evaluaciones</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Forms Tab */}
        {activeTab === 'forms' && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Formularios Dinámicos</CardTitle>
                  <CardDescription>Plantillas de evaluación personalizables</CardDescription>
                </div>
                <Button variant="primary">
                  <Plus className="w-4 h-4" />
                  Crear formulario
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: 'Evaluación Mensual Estándar', uses: 248, active: true, lastEdit: '2026-02-20' },
                  { name: 'Evaluación de Ingreso', uses: 52, active: true, lastEdit: '2026-02-15' },
                  { name: 'Evaluación Final', uses: 38, active: true, lastEdit: '2026-01-30' },
                  { name: 'Auto-evaluación Estudiante', uses: 186, active: true, lastEdit: '2026-02-18' }
                ].map((form, idx) => (
                  <Card key={idx} className="border-2 hover:border-[#008b50]/40 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{form.name}</h4>
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span>{form.uses} usos</span>
                            <span>•</span>
                            <span>Modificado: {form.lastEdit}</span>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          form.active 
                            ? 'bg-[#008b50]/10 text-[#008b50]' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {form.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
