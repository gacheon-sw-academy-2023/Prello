import { HTMLAttributes } from 'react';
interface IMember {
  name: string;
  profile: string;
}
export interface SideBarProps extends HTMLAttributes<HTMLDivElement> {
  memberInfo?: string[];
  onModal?: () => void;
  onNavigate?: () => void;
}
