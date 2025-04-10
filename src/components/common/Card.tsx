import React from 'react';

interface CardProps {
  title?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, content, children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {content && <div>{content}</div>}
      {children}
    </div>
  );
};

export default Card;