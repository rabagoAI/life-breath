
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationSidebar } from '../components/NavigationSidebar';
import { SOSHeader } from '../components/SOSHeader';
import { ChatWidget } from '../components/ChatWidget';

interface HealthMetric {
    id: string;
    name: string;
    progress: number;
    detail: string;
    icon: string;
    color: string;
    timeLeft: string;
    history: number[];
}

export const DashboardScreen: React.FC = () => {
    const navigate = useNavigate();
    const [selectedHealth, setSelectedHealth] = useState<string | null>(null);

    const healthData: HealthMetric[] = [
        { 
            id: 'carbon', 
            name: 'Monóxido de Carbono', 
            progress: 100, 
            detail: 'Los niveles en sangre han vuelto a la normalidad. Tus niveles de oxígeno son óptimos y tu corazón no tiene que esforzarse tanto.', 
            icon: 'check_circle', 
            color: 'emerald',
            timeLeft: 'Totalmente Recuperado',
            history: [20, 40, 60, 80, 95, 100]
        },
        { 
            id: 'taste', 
            name: 'Sentido del Gusto y Olfato', 
            progress: 82, 
            detail: 'Las terminaciones nerviosas se están regenerando a un ritmo constante. Notarás sabores sutiles que no sentías hace años.', 
            icon: 'lunch_dining', 
            color: 'blue',
            timeLeft: '2 días restantes',
            history: [10, 25, 40, 55, 70, 82]
        },
        { 
            id: 'lungs', 
            name: 'Capacidad Pulmonar', 
            progress: 45, 
            detail: 'Tus bronquios están empezando a relajarse y abrirse. Esto facilita la respiración y aumenta tus niveles de energía generales.', 
            icon: 'air', 
            color: 'primary',
            timeLeft: '14 días restantes',
            history: [5, 12, 20, 28, 35, 45]
        },
        { 
            id: 'circulation', 
            name: 'Circulación Sanguínea', 
            progress: 30, 
            detail: 'El flujo sanguíneo a tus manos y pies está mejorando. Tu ritmo cardíaco y presión arterial están bajando a niveles saludables.', 
            icon: 'favorite', 
            color: 'rose',
            timeLeft: '21 días restantes',
            history: [2, 8, 14, 20, 25, 30]
        }
    ];

    const renderSparkline = (data: number[], colorClass: string) => {
        const width = 100;
        const height = 30;
        const max = 100;
        const points = data.map((d, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - (d / max) * height;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width={width} height={height} className="overflow-visible">
                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    className={colorClass}
                />
            </svg>
        );
    };

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark">
            <NavigationSidebar />
            <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-background-light dark:bg-background-dark">
                <SOSHeader />
                <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 flex flex-col gap-8 pb-20">
                    {/* Cabecera */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Bienvenido de nuevo, Alex</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Has respirado libremente durante 288 horas. Tu cuerpo se está sanando.</p>
                    </div>

                    {/* Cuadrícula de Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1C2333] p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all cursor-pointer">
                            <p className="text-sm font-medium text-slate-500">Días Sin Fumar</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">12 Días</p>
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-primary">calendar_today</span>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1C2333] p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer">
                            <p className="text-sm font-medium text-slate-500">Dinero Ahorrado</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">150,00 €</p>
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-emerald-500">savings</span>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1C2333] p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer">
                            <p className="text-sm font-medium text-slate-500">Cigarrillos Evitados</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">240</p>
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-6xl text-indigo-500">smoke_free</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sección de Recuperación de Salud Mejorada */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Estado de Recuperación</h3>
                                <button onClick={() => navigate('/milestones')} className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                                    Análisis Completo <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {healthData.map((item) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => setSelectedHealth(selectedHealth === item.id ? null : item.id)}
                                        className={`flex flex-col gap-4 p-5 rounded-2xl bg-white dark:bg-[#1C2333] border transition-all cursor-pointer group shadow-sm ${
                                            selectedHealth === item.id 
                                            ? 'border-primary ring-1 ring-primary/20' 
                                            : 'border-slate-200 dark:border-slate-800 hover:border-primary/40'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-xl transition-colors duration-300 ${
                                                    item.progress === 100 
                                                    ? 'bg-emerald-500/10 text-emerald-500' 
                                                    : 'bg-primary/10 text-primary'
                                                }`}>
                                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.timeLeft}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="hidden sm:block">
                                                    {renderSparkline(item.history, item.progress === 100 ? 'text-emerald-500' : 'text-primary')}
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-xl font-black ${item.progress === 100 ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                                                        {item.progress}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800/50 overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                                        item.progress === 100 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-primary shadow-[0_0_10px_rgba(19,91,236,0.3)]'
                                                    }`} 
                                                    style={{ width: `${item.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {selectedHealth === item.id && (
                                            <div className="pt-2 animate-in slide-in-from-top-2 duration-300">
                                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                                        {item.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Columna Lateral */}
                        <div className="flex flex-col gap-6">
                            {/* Inspiración Diaria */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-indigo-600 p-6 shadow-xl text-white">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 p-8 opacity-10">
                                    <span className="material-symbols-outlined text-9xl">format_quote</span>
                                </div>
                                <span className="material-symbols-outlined text-3xl opacity-50 mb-2">format_quote</span>
                                <p className="text-lg font-medium leading-relaxed italic relative z-10">
                                    "El secreto de avanzar es comenzar. Cada respiración que tomas hoy es una victoria sobre tu pasado."
                                </p>
                                <p className="text-xs uppercase tracking-widest opacity-60 mt-6 font-bold">— Motor de Motivación</p>
                            </div>

                            {/* Mini-Feed de Comunidad */}
                            <div className="rounded-2xl bg-white dark:bg-[#1C2333] p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Apoyo en Vivo</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <span className="text-[10px] font-bold text-slate-400">1.2K ACTIVOS</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 group cursor-pointer">
                                        <div className="size-9 rounded-full bg-slate-200 bg-cover border border-white dark:border-slate-700" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjYS8xjnoFOztRMoEDdi7HTfgpwb6hJCf3qgFEGYe5Ahp8u3FDgWAjC-RBPrWTKHQFD-oOE_z3_Ogh6BK_150Y-deb_Li_hb2VacKUL24bPOipb0EV5NA1cvA9OF3Gg2i_lp7lIVBjADQ2u4a5TQH96YIrRb9tGK8viCyLUDXs7D241Owhj4iTHG1iZZM_1lyuGELZThG9YHvQFH_9y1XtvL-dVmQnDEvvStE8rMO8nHqsfcaynPvvcHc-xiXZBKXBimoc-WmHP3Y')"}}></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">¡Sarah llegó a 30 Días!</p>
                                            <p className="text-[10px] text-slate-500">Ahora mismo en Comunidad</p>
                                        </div>
                                        <span className="material-symbols-outlined text-yellow-500 text-lg">celebration</span>
                                    </div>
                                    <div className="flex items-center gap-3 group cursor-pointer">
                                        <div className="size-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border border-white dark:border-slate-700">JD</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">John resistió un antojo</p>
                                            <p className="text-[10px] text-slate-500">Hace 2 mins • Dale apoyo</p>
                                        </div>
                                        <span className="material-symbols-outlined text-rose-500 text-lg">favorite</span>
                                    </div>
                                </div>
                                <button onClick={() => navigate('/community')} className="w-full mt-2 py-2.5 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-xl transition-all">
                                    Ir al Feed de Comunidad
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ChatWidget />
            </main>
        </div>
    );
};
