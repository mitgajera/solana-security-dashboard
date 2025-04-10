import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return <div className={cn("bg-dark-card rounded-lg border border-dark-border shadow-dark-md p-4", className)}>{children}</div>;
};

export const CardHeader: React.FC<CardProps> = ({ className = "", children }) => {
  return <div className={cn("pb-2 border-b border-dark-border", className)}>{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ className = "", children }) => {
  return <h3 className={cn("text-lg font-semibold text-primary", className)}>{children}</h3>;
};

export const CardContent: React.FC<CardProps> = ({ className = "", children }) => {
  return <div className={cn("pt-4", className)}>{children}</div>;
};