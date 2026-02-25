import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon, Target } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isLanding = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#008b50] to-[#04b5ac] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#008b50] to-[#04b5ac] bg-clip-text text-transparent">
              RADAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isLanding && (
              <>
                <a href="#problema" className="text-foreground/70 hover:text-foreground transition-colors">
                  Problema
                </a>
                <a href="#solucion" className="text-foreground/70 hover:text-foreground transition-colors">
                  Solución
                </a>
                <a href="#beneficios" className="text-foreground/70 hover:text-foreground transition-colors">
                  Beneficios
                </a>
              </>
            )}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <Link to="/login">
              <Button variant="outline" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" size="sm">
                Comenzar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card"
          >
            <div className="px-4 py-4 space-y-3">
              {isLanding && (
                <>
                  <a href="#problema" className="block py-2 text-foreground/70 hover:text-foreground transition-colors">
                    Problema
                  </a>
                  <a href="#solucion" className="block py-2 text-foreground/70 hover:text-foreground transition-colors">
                    Solución
                  </a>
                  <a href="#beneficios" className="block py-2 text-foreground/70 hover:text-foreground transition-colors">
                    Beneficios
                  </a>
                </>
              )}
              <Link to="/login" className="block">
                <Button variant="outline" size="sm" className="w-full">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/login" className="block">
                <Button variant="primary" size="sm" className="w-full">
                  Comenzar
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
