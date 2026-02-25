import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Target, Mail, Lock, Github } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role: string) => {
    // Mock login - en producción conectaría con Supabase
    switch(role) {
      case 'institution':
        navigate('/dashboard/institution');
        break;
      case 'company':
        navigate('/dashboard/company');
        break;
      case 'admin':
        navigate('/dashboard/admin');
        break;
      default:
        navigate('/dashboard/institution');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d3475] via-[#1d3475] to-[#024426] dark:from-[#0f1419] dark:via-[#1d3475] dark:to-[#024426] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card/95 backdrop-blur-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#008b50] to-[#04b5ac] rounded-xl flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl">Bienvenido a RADAR</CardTitle>
            <CardDescription>
              Inicia sesión para acceder a tu dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleLogin('institution')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar con Google
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleLogin('company')}
              >
                <Github className="w-5 h-5" />
                Continuar con GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">O continúa con</span>
              </div>
            </div>

            {/* Email Login */}
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin('institution'); }}>
              <div className="space-y-2">
                <label className="text-sm">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008b50] transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Recordarme</span>
                </label>
                <a href="#" className="text-[#008b50] hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Iniciar sesión
              </Button>
            </form>

            {/* Demo Links */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-3">
                Acceso rápido a demos:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLogin('institution')}
                  className="text-xs"
                >
                  Institución
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLogin('company')}
                  className="text-xs"
                >
                  Empresa
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLogin('admin')}
                  className="text-xs"
                >
                  Admin
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-[#008b50] hover:underline font-medium">
                Regístrate aquí
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
