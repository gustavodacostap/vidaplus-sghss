import { UserRole } from '../../../core/auth/models/User.model';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

export const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  ADMIN: [{ label: 'Pacientes', icon: 'groups', route: '/admin/pacientes' }],
  PROFESSIONAL: [{ label: 'Agenda', icon: 'calendar_today', route: '/professional/agenda' }],
  PATIENT: [{ label: 'Consultas', icon: 'event', route: '/patient/consultas' }],
};
