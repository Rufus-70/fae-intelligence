
import React from 'react';
import { MonitoringPoint } from '../types';
import { Card } from './ui/Card';

interface MonitoringSectionProps {
  title: string;
  tips: MonitoringPoint[];
}

export const MonitoringSection: React.FC<MonitoringSectionProps> = ({ title, tips }) => {
  return (
    <section aria-labelledby="monitoring-title">
      <Card className="bg-[#F7FAFC] shadow-xl p-6 md:p-8"> {/* Updated: Light Gray bg */}
        <h2 id="monitoring-title" className="text-3xl font-bold text-[#1B365D] mb-8 text-center">{title}</h2> {/* Fae Blue title */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <Card key={tip.id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 flex flex-col border border-slate-200"> {/* White inner cards */}
              <h3 className="text-xl font-semibold text-[#1B365D] mb-3 flex items-center"> {/* Fae Blue tip title */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 text-purple-500"> {/* Maintained purple icon for accent */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                {tip.title}
              </h3>
              <p className="text-[#4A5568] text-sm leading-relaxed flex-grow">{tip.description}</p> {/* Professional Gray text */}
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
};