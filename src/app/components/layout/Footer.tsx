import React from 'react';
import { Target, Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1d3475] dark:bg-[#0f1419] text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#008b50] to-[#04b5ac] rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">RADAR</span>
            </div>
            <p className="text-white/70 text-sm">
              Transformando el potencial en información clara para cerrar la brecha entre educación y empleo.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Características
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Casos de estudio
                </a>
              </li>
              <li>
                <Link to="/login" className="text-white/70 hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4" />
                <a href="mailto:contacto@radar.com" className="hover:text-white transition-colors">
                  contacto@radar.com
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/70">
          <p>&copy; {currentYear} RADAR. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
