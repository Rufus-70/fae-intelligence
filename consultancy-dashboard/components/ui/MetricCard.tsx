import React from 'react';
import { Card } from './Card';
import { MetricCardProps } from '../../types';

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  colorClass = "text-sky-400",
  isLoading,
  subtext,
  onClick,
  ariaLabel
}) => {
  const cardContent = (
    <>
      <div className={`text-4xl mb-3 ${colorClass}`}>{icon}</div>
      <h3 className="text-lg font-semibold text-slate-300 mb-1">{title}</h3>
      {isLoading ? (
        <div className="h-8 w-24 bg-slate-700 animate-pulse rounded-md mt-1"></div>
      ) : (
        <p className="text-3xl font-bold text-white">{value}</p>
      )}
      {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
    </>
  );

  const cardClassName = "bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center hover:shadow-sky-500/30 transition-shadow duration-300 min-h-[170px]";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${cardClassName} w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${colorClass.replace('text-', 'focus:ring-')}`}
        aria-label={ariaLabel || `View details for ${title}`}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Card className={cardClassName}>
      {cardContent}
    </Card>
  );
};
