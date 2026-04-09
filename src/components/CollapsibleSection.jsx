import React, { useState } from 'react';

const CollapsibleSection = ({ title, subtitle, children, defaultExpanded = true, iconColor = "bg-blue-600" }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`transition-all duration-300 ${isExpanded ? 'space-y-4' : 'space-y-0'}`}>
      <div 
        className={`flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer group transition-all ${isExpanded ? 'bg-white shadow-sm border-b-transparent rounded-b-none' : 'bg-white hover:bg-slate-50'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
            <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-3">
             <div className={`w-1.5 h-6 ${iconColor} rounded-full shadow-[0_0_10px_rgba(37,99,235,0.2)]`}></div>
             <div>
               <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight uppercase leading-none">{title}</h3>
               {subtitle && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>}
             </div>
          </div>
        </div>
        {!isExpanded && (
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Click para expandir</span>
        )}
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`space-y-4 p-4 bg-slate-50/10 border-x border-b border-slate-200 rounded-b-2xl`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
