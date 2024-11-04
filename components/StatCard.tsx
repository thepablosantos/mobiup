import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <div className="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:border-bitcoin transition duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-bitcoin/20 text-bitcoin">
          {icon}
        </div>
        <div>
          <p className="text-neutral-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  )
} 