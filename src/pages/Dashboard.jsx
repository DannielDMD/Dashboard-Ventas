import React, { useMemo } from 'react';
import TableSection from '../components/TableSection';
import CardGroup from '../components/CardGroup';
import { dashboardData } from '../data/mockData';
import { calculateTotals } from '../utils/calculations';

const Dashboard = () => {
    // 1. Totales Generales (Colombia) Dinámicos
    const globalTotals = useMemo(() => {
        const allRows = dashboardData.flatMap(section =>
            section.ubicaciones.flatMap(u => u.filas)
        );
        return calculateTotals(allRows);
    }, []);

    // 2. Totales Combinados de Bogotá (Grupo 1 + Grupo 2)
    const { bogotaCombinedTotals, bogotaComparisonData } = useMemo(() => {
        const sectionG1 = dashboardData.find(s => s.id === 'g1');
        const sectionG2 = dashboardData.find(s => s.id === 'g2');
        
        const rowsG1 = sectionG1.ubicaciones.flatMap(u => u.filas);
        const rowsG2 = sectionG2.ubicaciones.flatMap(u => u.filas);
        
        const totG1 = calculateTotals(rowsG1);
        const totG2 = calculateTotals(rowsG2);
        
        return {
            bogotaCombinedTotals: calculateTotals([...rowsG1, ...rowsG2]),
            bogotaComparisonData: [
                { ...totG1, name: 'Grupo 1' },
                { ...totG2, name: 'Grupo 2' }
            ]
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-32">
            {/* Header Premium */}

            {/*
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
                <div className="max-w-[1500px] mx-auto px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200">
                            Telesentinel
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Telesentinel</h1>
                            <p className="text-slate-400 text-sm font-medium mt-1">Cuadro de Ventas Nacional</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
                        <select className="bg-white border-none text-slate-700 text-sm font-bold rounded-xl px-4 py-2.5 shadow-sm outline-none cursor-pointer">
                            <option>Consolidado Colombia</option>
                            {dashboardData.map(section => (
                                <option key={section.id}>{section.nombre}</option>
                            ))}
                        </select>
                        <div className="h-6 w-px bg-slate-200"></div>
                        <input
                            type="date"
                            className="bg-transparent border-none text-slate-600 text-sm font-semibold px-4 py-2 focus:outline-none cursor-pointer"
                            defaultValue="2026-04-07"
                        />
                    </div>
                </div>
            </header>

*/}
            {/* Main Container */}
            <main className="max-w-[1500px] mx-auto px-8 py-12">

                {/* SECCIÓN 1: GENERAL COLOMBIA */}
                <section className="mb-20">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">General Colombia</h2>
                            <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">Métricas acumuladas a nivel país</p>
                        </div>
                    </div>
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
                        <CardGroup totals={globalTotals} title="Consolidado Colombia" />
                    </div>
                </section>

                {/* SECCIÓN BOGOTÁ (Consolida G1 y G2) */}
                <section className="mb-20 space-y-8">
                    {dashboardData.filter(s => s.id === 'g1' || s.id === 'g2').map((section) => (
                        <TableSection key={section.id} sectionData={section} showSummary={false} />
                    ))}

                    {/* Resumen Único de Bogotá */}
                    <div className="p-10 bg-slate-100 rounded-[2.5rem] border border-slate-200 shadow-inner mt-12">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-bold text-slate-800 uppercase tracking-tight">Consolidado Bogotá (G1 + G2)</h4>
                        </div>
                        <CardGroup totals={bogotaCombinedTotals} comparisonData={bogotaComparisonData} title="Consolidado Bogotá (G1 + G2)" />
                    </div>
                </section>

                {/* SECCIÓN DINÁMICA (MEDELLÍN, REGIONALES, ETC.) */}
                <section className="space-y-20">
                    {dashboardData.filter(s => s.id !== 'g1' && s.id !== 'g2').map((section) => (
                        <TableSection key={section.id} sectionData={section} />
                    ))}
                </section>

            </main>
            {/*
            <footer className="max-w-[1500px] mx-auto px-8 py-12 border-t border-slate-200 text-center">
                <p className="text-slate-400 text-sm font-medium italic">Dashboard 4D - Optimizado para lectura de datos rápida y escalable.</p>
            </footer>
            */}
        </div>


    );
};



export default Dashboard;
