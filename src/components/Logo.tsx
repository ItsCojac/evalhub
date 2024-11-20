import React from 'react';
import { ClipboardList } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return <ClipboardList className={className} />;
};