import {
  Cpu,
  Code2,
  Layers,
  Terminal,
  Database,
  Monitor,
  ShieldCheck,
  Trophy,
  Award,
  GraduationCap,
  School,
} from 'lucide-react';
import data from '../data/portfolio.json';

const ICONS = {
  cpu: Cpu,
  code2: Code2,
  layers: Layers,
  terminal: Terminal,
  database: Database,
  monitor: Monitor,
  shield: ShieldCheck,
  trophy: Trophy,
  award: Award,
  graduation: GraduationCap,
  school: School,
};

const withIcon = (item) => ({ ...item, icon: ICONS[item.icon] || Layers });

export const PROJECTS = data.projects;
export const EXPERIENCE = data.experience;
export const EDUCATION = data.education.map(withIcon);
export const SKILLS = data.skills.map(withIcon);
export const CERTIFICATIONS = data.certifications.map(withIcon);
