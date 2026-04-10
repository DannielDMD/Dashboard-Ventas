import React from 'react';

const SkeletonBase = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`}></div>
);

export const CardSkeleton = () => (
  <div className="bg-white rounded-xl border border-slate-100 p-4 h-[100px] flex flex-col justify-between">
    <SkeletonBase className="h-3 w-2/3 mx-auto" />
    <SkeletonBase className="h-6 w-full mt-2" />
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <SkeletonBase className="w-1.5 h-5" />
        <SkeletonBase className="h-5 w-40" />
      </div>
      <SkeletonBase className="h-8 w-32" />
    </div>
    <div className="space-y-2">
      <SkeletonBase className="h-10 w-full" />
      <SkeletonBase className="h-10 w-full" />
      <SkeletonBase className="h-10 w-full" />
      <SkeletonBase className="h-10 w-full" />
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    {/* Totales */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {[...Array(7)].map((_, i) => <CardSkeleton key={i} />)}
    </div>
    
    {/* Tablas */}
    <div className="space-y-6">
      <TableSkeleton />
      <TableSkeleton />
    </div>
  </div>
);

export default DashboardSkeleton;
