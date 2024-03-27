import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: number;
  children: ReactNode;
}

const CardStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {

  
  return (
    <div className="rounded-2xl shadow-lg flex justify-center items-center h-32 gap-5 bg-white p-3 ">
      <div className="flex  items-center justify-center rounded-full w-16 h-16  dark:bg-gray-900 text-4xl">
        {children}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h4 className="text-lg font-bold dark:text-white text-emerald-500">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        
      </div>
    </div>
  );
};

export default CardStats;
