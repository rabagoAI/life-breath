
import React, { useState } from 'react';
import { NavigationSidebar } from '../components/NavigationSidebar';
import { SOSHeader } from '../components/SOSHeader';
import { ChatWidget } from '../components/ChatWidget';

export const ProgramScreen: React.FC = () => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [objectives, setObjectives] = useState([
        { 
            id: 1, 
            title: 'Físico vs. Mental', 
            description: 'Comprende la diferencia entre los antojos físicos y los hábitos mentales.', 
            completed: false, 
            icon: 'psychology', 
            iconClass: 'text-green-500 bg-green-500/10' 
        },
        { 
            id: 2, 
            title: 'Identificar Desencadenantes', 
            description: 'Enumera tus 3 principales disparadores para desactivarlos eficazmente.', 
            completed: false, 
            icon: 'warning', 
            iconClass: 'text-orange-500 bg-orange-500/10' 
        },
        { 
            id: 3, 
            title: "Para-Respira-Elige", 
            description: 'Practica la técnica de pausa de 10 segundos dos veces hoy.', 
            completed: false, 
            icon: 'front_hand', 
            iconClass: 'text-blue-400 bg-blue-400/10' 
        }
    ]);

    const handleComplete = () => {
        setIsCompleted(true);
    };

    const toggleObjective = (id: number) => {
        if (isCompleted) return;
        setObjectives(objectives.map(obj => 
            obj.id === id ? { ...obj, completed: !obj.completed } : obj
        ));
    };

    const allObjectivesCompleted = objectives.every(o => o.completed);

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark">
            <NavigationSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <SOSHeader />
                <main className="flex-1 overflow-y-auto relative">
                    <div className="layout-container flex grow flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6 pb-20">
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Columna Izquierda: Contenido Educativo */}
                            <div className="flex-1 min-w-0 w-full">
                                {/* Encabezado de Página */}
                                <div className="flex flex-col gap-2 mb-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-primary font-bold text-sm uppercase tracking-wider">Día 3</p>
                                        {isCompleted && (
                                            <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold flex items-center gap-1 animate-in fade-in">
                                                <span className="material-symbols-outlined text-base">check_circle</span> COMPLETADO
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Rompiendo la Cadena Mental</h1>
                                    <p className="text-slate-500 dark:text-[#9da6b9] text-base font-normal leading-normal">Entendiendo los disparadores psicológicos de la adicción.</p>
                                </div>
                                
                                {/* Reproductor de Video */}
                                <div className="mb-8 bg-black rounded-xl overflow-hidden shadow-2xl">
                                    {isVideoPlaying ? (
                                        <div className="relative w-full aspect-video animate-in fade-in duration-500">
                                            <iframe 
                                                width="100%" 
                                                height="100%" 
                                                src="https://www.youtube.com/embed/-moW9jvvMr4?autoplay=1" 
                                                title="Reproductor de video de YouTube" 
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                                className="absolute inset-0"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <div 
                                            onClick={() => setIsVideoPlaying(true)}
                                            className="relative w-full aspect-video cursor-pointer group"
                                        >
                                            <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-70 transition-opacity duration-300" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCm-KglEQzY48rpQouRwmY1yeT0sNfKLZLyjh2EGeudR7pO2dMrH2ZTsGExBjF2_hLw-xpuBDsINVi_plhjA-1nMqUrM_NYbThbss1K9GtMGQjb77txCYPIWGyve1pSn_XWC2KyKzbpOs_-SBFmSZnGJCRVXwlhDqZzZXxtLSCqFRRysMcdX8C3PZ9p2OVK9UT4jxRKzi2AAfUtvAu0XyN9pytPVfh6pqNWC7Dhn6-eTysUXdvOQdsvwZeDw6pRuz_0Iv1avtOKk4I')"}}></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <button className="flex items-center justify-center rounded-full size-20 bg-primary/90 text-white backdrop-blur-sm shadow-lg transform transition-all duration-300 group-hover:scale-110 hover:bg-primary">
                                                    <span className="material-symbols-outlined text-[40px] ml-1">play_arrow</span>
                                                </button>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                                                <div>
                                                    <span className="px-2 py-1 bg-black/60 rounded text-xs font-bold text-white mb-2 inline-block">LECCIÓN EN VIDEO</span>
                                                    <h3 className="text-white text-lg font-bold">Lección 3: Entendiendo los disparadores</h3>
                                                </div>
                                                <span className="text-white/90 font-medium text-sm flex items-center gap-1 bg-black/40 px-2 py-1 rounded">
                                                    <span className="material-symbols-outlined text-[16px]">schedule</span> 13:45
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Mantra del Día */}
                                <div className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-primary/5 to-transparent border-l-4 border-primary p-6 md:p-8">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <span className="material-symbols-outlined text-8xl text-primary">format_quote</span>
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Mantra del Día</h3>
                                        <p className="text-xl md:text-2xl font-serif italic text-slate-800 dark:text-white leading-relaxed">"Soy más fuerte que mi antojo más intenso. Elijo la libertad."</p>
                                    </div>
                                </div>

                                {/* Objetivos Diarios */}
                                <div className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">check_box</span>
                                            <h2 className="text-slate-900 dark:text-white text-xl font-bold">Objetivos Diarios</h2>
                                        </div>
                                        <span className={`text-sm font-bold transition-colors ${allObjectivesCompleted ? 'text-green-500' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {objectives.filter(o => o.completed).length}/{objectives.length} Completados
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {objectives.map((objective) => (
                                            <div 
                                                key={objective.id}
                                                onClick={() => toggleObjective(objective.id)}
                                                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group select-none ${
                                                    objective.completed 
                                                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' 
                                                    : 'bg-white dark:bg-card-dark border-slate-200 dark:border-slate-800/60 hover:border-primary/40 hover:shadow-sm'
                                                }`}
                                            >
                                                <div className={`flex items-center justify-center rounded-lg shrink-0 size-10 mt-1 transition-all duration-300 ${objective.completed ? 'bg-green-500 text-white scale-110' : objective.iconClass}`}>
                                                    <span className="material-symbols-outlined">
                                                        {objective.completed ? 'check' : objective.icon}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`font-bold text-base mb-1 transition-colors ${objective.completed ? 'text-slate-700 dark:text-slate-200 line-through decoration-slate-400 decoration-2' : 'text-slate-900 dark:text-white'}`}>
                                                        {objective.title}
                                                    </h4>
                                                    <p className={`text-sm leading-relaxed transition-colors ${objective.completed ? 'text-slate-500' : 'text-slate-600 dark:text-slate-400'}`}>
                                                        {objective.description}
                                                    </p>
                                                </div>
                                                <div className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                                    objective.completed 
                                                    ? 'border-green-500 bg-green-500 scale-110' 
                                                    : 'border-slate-300 dark:border-slate-600 group-hover:border-primary'
                                                }`}>
                                                    {objective.completed && <span className="material-symbols-outlined text-white text-sm font-bold animate-in zoom-in">check</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Pie de Acción */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Próxima lección en <span className="text-slate-900 dark:text-white font-bold">14 horas</span></p>
                                    <button 
                                        onClick={handleComplete}
                                        disabled={isCompleted || !allObjectivesCompleted}
                                        className={`w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-8 transition-all text-base font-bold shadow-lg ${
                                            isCompleted 
                                            ? 'bg-green-600 text-white cursor-default shadow-green-900/20' 
                                            : !allObjectivesCompleted
                                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                                : 'bg-primary hover:bg-blue-600 text-white shadow-blue-900/20 hover:scale-105 active:scale-95'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined">{isCompleted ? 'check' : 'check_circle'}</span>
                                        {isCompleted ? 'Completado' : 'Marcar Lección como Completada'}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Columna Derecha: Sidebar / Seguimiento de Progreso */}
                            <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
                                <div className="bg-white dark:bg-card-dark rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-slate-900 dark:text-white font-bold text-lg">Tu Viaje</h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded transition-colors ${isCompleted ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                                            {isCompleted ? '66%' : '50%'} HECHO
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-1 overflow-hidden">
                                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500' : 'bg-primary'}`} style={{width: isCompleted ? '66%' : '50%'}}></div>
                                    </div>
                                    <p className="text-right text-xs text-slate-500 dark:text-slate-400 mt-1">{isCompleted ? '4' : '3'} de 6 Días</p>
                                </div>
                                
                                <div className="bg-white dark:bg-card-dark rounded-xl p-2 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                                    {/* Días del programa (Traducidos) */}
                                    <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left group">
                                        <div className="relative flex items-center justify-center size-8 rounded-full bg-green-500/20 text-green-500 shrink-0">
                                            <span className="material-symbols-outlined text-lg font-bold">check</span>
                                            <div className="absolute top-8 w-0.5 h-full bg-slate-200 dark:bg-slate-700 -z-10"></div>
                                        </div>
                                        <div className="flex-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Día 1</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white line-through decoration-slate-500">La Decisión</p>
                                        </div>
                                    </button>
                                    <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left group">
                                        <div className="relative flex items-center justify-center size-8 rounded-full bg-green-500/20 text-green-500 shrink-0">
                                            <span className="material-symbols-outlined text-lg font-bold">check</span>
                                            <div className="absolute top-8 w-0.5 h-6 bg-slate-200 dark:bg-slate-700 -z-10"></div>
                                        </div>
                                        <div className="flex-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Día 2</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white line-through decoration-slate-500">Detox Físico</p>
                                        </div>
                                    </button>
                                    <div className={`relative rounded-lg p-3 my-1 border transition-all duration-500 ${isCompleted ? 'bg-green-500/5 border-green-500/20' : 'bg-primary/10 dark:bg-primary/20 border-primary/20'}`}>
                                        <div className="flex items-center gap-4 text-left">
                                            <div className={`relative flex items-center justify-center size-8 rounded-full shrink-0 shadow-lg transition-colors duration-500 ${isCompleted ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-primary text-white shadow-primary/30'}`}>
                                                <span className="material-symbols-outlined text-lg">{isCompleted ? 'check' : 'play_arrow'}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-xs font-bold uppercase tracking-wide transition-colors ${isCompleted ? 'text-green-600 dark:text-green-500' : 'text-primary'}`}>Día 3 • Hoy</p>
                                                <p className={`text-sm font-bold text-slate-900 dark:text-white transition-all ${isCompleted ? 'line-through opacity-80' : ''}`}>Cadena Mental</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ... bloqueado ... */}
                                    <button className="flex items-center gap-4 p-3 rounded-lg opacity-50 cursor-not-allowed">
                                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm">lock</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase">Día 4</p>
                                            <p className="text-sm font-bold">Armadura Emocional</p>
                                        </div>
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <ChatWidget />
                </main>
            </div>
        </div>
    );
};
