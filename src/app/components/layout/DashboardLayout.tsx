import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Building2, 
  Shield,
  LogOut,
  Sun,
  Moon,
  Target
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function DashboardLayout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const getDashboardType = () => {
    if (location.pathname.includes('institution')) return 'institution';
    if (location.pathname.includes('company')) return 'company';
    if (location.pathname.includes('admin')) return 'admin';
    return 'institution';
  };

  const dashboardType = getDashboardType();

  const dashboardConfig = {
    institution: {
      icon: GraduationCap,
      color: '#008b50',
      label: 'Institución'
    },
    company: {
      icon: Building2,
      color: '#04b5ac',
      label: 'Empresa'
    },
    admin: {
      icon: Shield,
      color: '#1d3475',
      label: 'Administrador'
    }
  };

  const config = dashboardConfig[dashboardType];
  const DashboardIcon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#008b50] to-[#04b5ac] rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#008b50] to-[#04b5ac] bg-clip-text text-transparent hidden sm:inline">
              RADAR
            </span>
          </Link>
          <div className="h-8 w-px bg-border hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <DashboardIcon className="w-5 h-5" style={{ color: config.color }} />
            </div>
            <span className="font-semibold hidden sm:inline">{config.label}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}
