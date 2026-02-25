import React from 'react';
import { Link } from 'react-router';
import { Home, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d3475] via-[#1d3475] to-[#024426] flex items-center justify-center p-4">
      <div className="text-center text-white space-y-6">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#008b50] to-[#04b5ac] rounded-2xl flex items-center justify-center">
            <Target className="w-14 h-14 text-white" />
          </div>
        </div>
        
        <h1 className="text-8xl font-bold bg-gradient-to-r from-[#ffca00] to-[#e28210] bg-clip-text text-transparent">
          404
        </h1>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Página no encontrada</h2>
          <p className="text-white/70 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <Link to="/">
          <Button variant="secondary" size="lg">
            <Home className="w-5 h-5" />
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
