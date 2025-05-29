// app/components/ui/card.tsx (Simpler version, closer to original DashboardCard)
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl ${className}`} // Base style from DashboardCard
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

export { Card };
