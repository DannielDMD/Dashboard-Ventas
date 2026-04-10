import React, { useMemo } from 'react';
import TableSection from '../components/TableSection';
import CardGroup from '../components/CardGroup';
import ChartView from '../components/ChartView';
import CollapsibleSection from '../components/CollapsibleSection';
import { calculateTotals } from '../utils/calculations';
import { useDashboardData } from '../hooks/useDashboardData';
import DashboardSkeleton from '../components/shared/LoadingSkeleton';
import ErrorDisplay from '../components/shared/ErrorDisplay';

const Dashboard = () => {
    const { data, loading, error, retry } = useDashboardData();

    // 1. Totales Generales (Colombia) Dinámicos
    const globalTotals = useMemo(() => {
        if (!data) return null;
        const allRows = data.flatMap(section =>
            section.ubicaciones.flatMap(u => u.filas)
        );
        return calculateTotals(allRows);
    }, [data]);

    // 2. Totales Combinados de Bogotá (Grupo 1 + Grupo 2)
    const bogotaCalculations = useMemo(() => {
        if (!data) return { bogotaCombinedTotals: null, bogotaComparisonData: [] };
        
        const sectionG1 = data.find(s => s.id === 'g1');
        const sectionG2 = data.find(s => s.id === 'g2');

        if (!sectionG1 || !sectionG2) return { bogotaCombinedTotals: null, bogotaComparisonData: [] };

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
    }, [data]);

    const { bogotaCombinedTotals, bogotaComparisonData } = bogotaCalculations;

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-12 md:pb-8">
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
            <main className="max-w-[98%] 2xl:max-w-[1800px] mx-auto px-4 md:px-6 lg:px-4 py-8 md:py-6">
                
                {loading && <DashboardSkeleton />}

                {error && <ErrorDisplay message={error.message} onRetry={retry} />}

                {!loading && !error && data && (
                    <>
                        {/* SECCIÓN 1: GENERAL COLOMBIA */}
                        <section className="mb-6 lg:mb-5">
                            <CardGroup totals={globalTotals} title="General Colombia" />
                        </section>

                        {/* SECCIÓN BOGOTÁ (Consolida G1 y G2) */}
                        <section className="mb-6 lg:mb-5 space-y-4">
                            {data.filter(s => s.id === 'g1' || s.id === 'g2').map((section) => (
                                <TableSection key={section.id} sectionData={section} showSummary={false} />
                            ))}

                            {/* Resumen y Comparativa de Bogotá Colapsable */}
                            <CollapsibleSection title="Consolidado Bogotá (G1 + G2)" subtitle="Comparativa Operativa y Totales" iconColor="bg-blue-600">
                                <div className="space-y-6">
                                    <ChartView comparisonData={bogotaComparisonData} title="Comparativa Grupo 1 vs Grupo 2" />
                                    <CardGroup totals={bogotaCombinedTotals} comparisonData={bogotaComparisonData} title="Totales Bogotá" />
                                </div>
                            </CollapsibleSection>
                        </section>

                        {/* SECCIÓN DINÁMICA (MEDELLÍN, REGIONALES, ETC.) */}
                        <section className="space-y-6 lg:space-y-5">
                            {data.filter(s => s.id !== 'g1' && s.id !== 'g2').map((section) => (
                                <TableSection key={section.id} sectionData={section} />
                            ))}
                        </section>
                    </>
                )}
            </main>
        </div>


    );
};



export default Dashboard;
