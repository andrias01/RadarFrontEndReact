import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/RootLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { InstitutionDashboard } from './pages/dashboards/Institution';
import { CompanyDashboard } from './pages/dashboards/Company';
import { AdminDashboard } from './pages/dashboards/Admin';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Landing
      },
      {
        path: 'login',
        Component: Login
      }
    ]
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      {
        path: 'institution',
        Component: InstitutionDashboard
      },
      {
        path: 'company',
        Component: CompanyDashboard
      },
      {
        path: 'admin',
        Component: AdminDashboard
      }
    ]
  },
  {
    path: '*',
    Component: NotFound
  }
]);
