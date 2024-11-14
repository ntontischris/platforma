import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  title?: string;
}

const Card = ({ 
  children, 
  className = '', 
  glowOnHover = true,
  title
}: CardProps) => {
  return (
    <div
      className={cn(
        'neon-card p-6',
        glowOnHover && 'hover:shadow-neon transition-shadow duration-300',
        className
      )}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;