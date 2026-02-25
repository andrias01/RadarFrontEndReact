import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Building2, 
  GraduationCap,
  BarChart3,
  Brain,
  Heart,
  MessageSquare,
  Lightbulb,
  Target,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { ComparisonRadarChart } from '../components/charts/RadarChart';

export function Landing() {
  // Datos para el gráfico de comparación antes/después
  const comparisonData = [
    { subject: 'Trabajo en equipo', before: 30, after: 85, fullMark: 100 },
    { subject: 'Comunicación', before: 25, after: 90, fullMark: 100 },
    { subject: 'Liderazgo', before: 20, after: 75, fullMark: 100 },
    { subject: 'Adaptabilidad', before: 35, after: 88, fullMark: 100 },
    { subject: 'Pensamiento crítico', before: 28, after: 82, fullMark: 100 },
    { subject: 'Resolución', before: 22, after: 80, fullMark: 100 }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d3475] via-[#1d3475] to-[#024426] dark:from-[#0f1419] dark:via-[#1d3475] dark:to-[#024426] text-white pt-24 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#008b50] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#04b5ac] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div className="space-y-6" {...fadeInUp}>
              <div className="inline-block px-4 py-2 bg-[#008b50]/20 border border-[#008b50]/30 rounded-full text-sm">
                <span className="text-[#ffca00]">✦</span> Plataforma educativa inteligente
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                RADAR convierte el potencial en{' '}
                <span className="bg-gradient-to-r from-[#ffca00] to-[#e28210] bg-clip-text text-transparent">
                  información clara
                </span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed">
                Analizamos competencias, emociones y desempeño real para cerrar la brecha entre educación y empleo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/login">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    <Target className="w-5 h-5" />
                    Explorar RADAR
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#1d3475]">
                    <Building2 className="w-5 h-5" />
                    Soy una institución
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-[#ffca00]">95%</div>
                  <div className="text-sm text-white/70">Precisión</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#04b5ac]">500+</div>
                  <div className="text-sm text-white/70">Instituciones</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#c1c12f]">10k+</div>
                  <div className="text-sm text-white/70">Estudiantes</div>
                </div>
              </div>
            </motion.div>

            {/* Right - Radar Comparison */}
            <motion.div 
              className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Transformación Medible</h3>
                <p className="text-white/70 text-sm">De la incertidumbre a la claridad</p>
              </div>
              <ComparisonRadarChart data={comparisonData} height={350} />
              <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Antes: Incertidumbre</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#008b50]"></div>
                  <span>Después: Con RADAR</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* El Problema */}
      <section id="problema" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">El Problema Actual</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              La desconexión entre academia y empresa genera incertidumbre y riesgos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Falta de métricas reales',
                description: 'Las instituciones no tienen visibilidad del desempeño laboral de sus egresados',
                color: '#e28210'
              },
              {
                icon: Users,
                title: 'Desconexión academia-empresa',
                description: 'Empresas contratan sin conocer el verdadero potencial de los candidatos',
                color: '#1d3475'
              },
              {
                icon: Shield,
                title: 'Evaluaciones subjetivas',
                description: 'Sin estándares claros, las decisiones se basan en percepciones',
                color: '#008b50'
              }
            ].map((problem, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${problem.color}20` }}
                    >
                      <problem.icon className="w-8 h-8" style={{ color: problem.color }} />
                    </div>
                    <CardTitle>{problem.title}</CardTitle>
                    <CardDescription>{problem.description}</CardDescription>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* La Solución RADAR */}
      <section id="solucion" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">La Solución RADAR</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Análisis estructurado que convierte datos en insights accionables
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Análisis estructurado',
                description: 'Evaluaciones consistentes basadas en competencias definidas',
                color: '#008b50'
              },
              {
                icon: TrendingUp,
                title: 'Visualización clara',
                description: 'Dashboards intuitivos con métricas en tiempo real',
                color: '#04b5ac'
              },
              {
                icon: Building2,
                title: 'Integración total',
                description: 'Conectamos instituciones, empresas y estudiantes',
                color: '#1d3475'
              },
              {
                icon: Brain,
                title: 'Inteligencia emocional',
                description: 'Medimos competencias blandas y habilidades humanas',
                color: '#ffca00'
              },
              {
                icon: CheckCircle2,
                title: 'Datos accionables',
                description: 'Información que impulsa decisiones estratégicas',
                color: '#e28210'
              },
              {
                icon: Zap,
                title: 'Feedback continuo',
                description: 'Seguimiento durante todo el ciclo formativo-laboral',
                color: '#c1c12f'
              }
            ].map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card hover className="h-full">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${solution.color}20` }}
                  >
                    <solution.icon className="w-6 h-6" style={{ color: solution.color }} />
                  </div>
                  <CardTitle className="mb-2">{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Radar Emocional */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-[#008b50]/10 border border-[#008b50]/20 rounded-full text-sm mb-6">
              <Heart className="w-4 h-4 inline mr-2 text-[#008b50]" />
              Evaluación Humana Integral
            </div>
            <h2 className="text-4xl font-bold mb-4">
              No solo medimos conocimientos.{' '}
              <span className="bg-gradient-to-r from-[#008b50] to-[#04b5ac] bg-clip-text text-transparent">
                Medimos personas.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              RADAR evalúa las competencias que realmente importan en el mundo laboral
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, label: 'Trabajo en equipo', color: '#008b50' },
              { icon: MessageSquare, label: 'Comunicación', color: '#04b5ac' },
              { icon: Target, label: 'Liderazgo', color: '#1d3475' },
              { icon: Zap, label: 'Adaptabilidad', color: '#ffca00' },
              { icon: Brain, label: 'Pensamiento crítico', color: '#e28210' },
              { icon: Lightbulb, label: 'Resolución de problemas', color: '#c1c12f' }
            ].map((attribute, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className="p-6 rounded-xl border-2 transition-all cursor-pointer"
                  style={{ 
                    borderColor: `${attribute.color}40`,
                    backgroundColor: `${attribute.color}08`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${attribute.color}20` }}
                    >
                      <attribute.icon className="w-6 h-6" style={{ color: attribute.color }} />
                    </div>
                    <span className="font-semibold text-lg">{attribute.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios por Rol */}
      <section id="beneficios" className="py-20 bg-gradient-to-br from-[#1d3475] to-[#024426] dark:from-[#0f1419] dark:to-[#1d3475] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Beneficios para Todos</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Una plataforma que genera valor para cada actor del ecosistema educativo-laboral
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Instituciones */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-lg border-white/20 h-full">
                <CardHeader>
                  <div className="w-14 h-14 bg-[#008b50] rounded-xl flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Para Instituciones</CardTitle>
                  <CardDescription className="text-white/70">
                    Mejora continua basada en datos reales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Seguimiento real del desempeño de egresados',
                      'Métricas de calidad educativa verificables',
                      'Identificación de brechas formativas',
                      'Mejora de prestigio institucional',
                      'Datos para acreditación y rankings'
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#ffca00] flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Empresas */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-lg border-white/20 h-full">
                <CardHeader>
                  <div className="w-14 h-14 bg-[#04b5ac] rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">Para Empresas</CardTitle>
                  <CardDescription className="text-white/70">
                    Contratación inteligente y libre de riesgos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Evaluaciones estructuradas de practicantes',
                      'Reducción del riesgo al contratar',
                      'Visibilidad de competencias reales',
                      'Recomendaciones basadas en datos',
                      'Banco de talento verificado'
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#ffca00] flex-shrink-0 mt-0.5" />
                        <span className="text-white/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              ¿Listo para transformar la{' '}
              <span className="bg-gradient-to-r from-[#008b50] to-[#04b5ac] bg-clip-text text-transparent">
                incertidumbre en claridad?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Únete a las instituciones y empresas que ya confían en RADAR
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/login">
                <Button variant="primary" size="lg">
                  Comenzar ahora
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Agendar demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
