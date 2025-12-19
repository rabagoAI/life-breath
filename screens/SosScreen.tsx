
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SosScreen: React.FC = () => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState<'Inhala' | 'Mantén' | 'Exhala'>('Inhala');
    const [timeLeft, setTimeLeft] = useState(4);
    const [sessionTime, setSessionTime] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [activeTool, setActiveTool] = useState<'none' | 'distraction' | 'audio'>('none');

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 1) return prev - 1;
                if (phase === 'Inhala') { setPhase('Mantén'); return 4; }
                else if (phase === 'Mantén') { setPhase('Exhala'); return 6; }
                else { setPhase('Inhala'); return 4; }
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isActive, phase]);

    useEffect(() => {
        const interval = setInterval(() => setSessionTime(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedSessionTime = `${Math.floor(sessionTime / 60).toString().padStart(2, '0')}:${(sessionTime % 60).toString().padStart(2, '0')}`;

    const getScaleClass = () => {
        if (phase === 'Inhala') return 'scale-110 duration-[4000ms]';
        if (phase === 'Mantén') return 'scale-110 duration-0';
        return 'scale-100 duration-[6000ms]';
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col relative overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className={`absolute top-0 left-0 w-full h-full bg-primary/5 transition-all duration-[4000ms] ${phase === 'Inhala' ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            <header className="relative z-20 flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3 text-slate-800 dark:text-white/90 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="size-8 flex items-center justify-center bg-primary/20 rounded-lg text-primary">
                        <span className="material-symbols-outlined">spa</span>
                    </div>
                    <h2 className="font-bold">LifeBreath</h2>
                </div>
                <button onClick={() => navigate('/dashboard')} className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </header>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-extralight tracking-tight text-slate-900 dark:text-white mb-2">Respira conmigo</h1>
                    <p className="text-primary font-medium tracking-widest text-sm uppercase">Céntrate en tu interior</p>
                </div>

                <div className="relative flex items-center justify-center mb-16">
                    <div className={`absolute size-80 rounded-full border border-primary/20 transition-transform ease-in-out ${getScaleClass()}`}></div>
                    <div className={`relative size-64 rounded-full bg-white dark:bg-slate-900 border-4 border-primary shadow-[0_0_60px_rgba(19,91,236,0.1)] dark:shadow-[0_0_60px_rgba(19,91,236,0.3)] flex flex-col items-center justify-center z-10 transition-transform ease-in-out ${getScaleClass()}`}>
                        <span className="text-6xl font-light text-slate-900 dark:text-white tabular-nums">{timeLeft}s</span>
                        <span className="text-sm font-bold text-primary uppercase tracking-widest mt-2">{phase}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl px-4 pb-12">
                    <button onClick={() => setActiveTool('distraction')} className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 transition-all shadow-sm">
                        <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <span className="material-symbols-outlined">extension</span>
                        </div>
                        <div className="text-left">
                            <p className="text-slate-900 dark:text-white font-bold">Concentración</p>
                            <p className="text-slate-500 dark:text-white/50 text-xs">Mini-tarea de enfoque</p>
                        </div>
                    </button>
                    <button onClick={() => setActiveTool('audio')} className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 transition-all shadow-sm">
                        <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <span className="material-symbols-outlined">headphones</span>
                        </div>
                        <div className="text-left">
                            <p className="text-slate-900 dark:text-white font-bold">Escuchar</p>
                            <p className="text-slate-500 dark:text-white/50 text-xs">Afirmaciones relajantes</p>
                        </div>
                    </button>
                    <button onClick={() => navigate('/community')} className="flex items-center gap-4 p-5 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 transition-all shadow-sm">
                        <div className="size-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                            <span className="material-symbols-outlined">forum</span>
                        </div>
                        <div className="text-left">
                            <p className="text-slate-900 dark:text-white font-bold">Hablar con Amigo</p>
                            <p className="text-slate-500 dark:text-white/50 text-xs">Pide ayuda al instante</p>
                        </div>
                    </button>
                </div>

                <div className="mb-10 text-slate-400 dark:text-white/40 text-sm font-medium">
                    Sesión: {formattedSessionTime}
                </div>
            </main>

            {activeTool !== 'none' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveTool('none')}></div>
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
                        <button onClick={() => setActiveTool('none')} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        
                        {activeTool === 'distraction' && (
                            <div className="text-center flex flex-col gap-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tarea de Enfoque</h3>
                                <p className="text-slate-600 dark:text-slate-400">¿Puedes contar hacia atrás desde 100 restando 7 cada vez?</p>
                                <div className="text-4xl font-black text-primary">100... 93... 86...</div>
                                <button onClick={() => setActiveTool('none')} className="bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">Ya estoy enfocado</button>
                            </div>
                        )}

                        {activeTool === 'audio' && (
                            <div className="text-center flex flex-col gap-6">
                                <div className="size-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center text-primary animate-pulse">
                                    <span className="material-symbols-outlined text-4xl">graphic_eq</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Reproduciendo Afirmaciones</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mt-1">"Este deseo pasará. Tengo el control."</p>
                                </div>
                                <button onClick={() => setActiveTool('none')} className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">Detener Audio</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <footer className="relative z-20 flex justify-center pb-8">
                <button onClick={() => navigate('/dashboard')} className="px-10 py-3 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 hover:bg-primary/20 text-slate-900 dark:text-white rounded-full transition-all font-medium">
                    Me siento mejor ahora
                </button>
            </footer>
        </div>
    );
};
