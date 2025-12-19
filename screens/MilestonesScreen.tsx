
import React from 'react';
import { NavigationSidebar } from '../components/NavigationSidebar';
import { SOSHeader } from '../components/SOSHeader';
import { ChatWidget } from '../components/ChatWidget';

export const MilestonesScreen: React.FC = () => {
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark">
            <NavigationSidebar />
            <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-background-light dark:bg-background-dark">
                <SOSHeader />
                <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 flex flex-col gap-8 pb-20">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Mis Logros</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Celebra cada victoria en tu camino hacia la libertad.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2">
                            <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">emoji_events</span>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">12</h3>
                            <p className="text-xs text-slate-500">Logros Desbloqueados</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center gap-2">
                            <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined">timeline</span>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">45%</h3>
                            <p className="text-xs text-slate-500">Salud Recuperada</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Logros de Tiempo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="relative group p-6 rounded-2xl bg-white dark:bg-card-dark border border-primary/30 shadow-md">
                                <div className="absolute top-0 right-0 p-3"><span className="material-symbols-outlined text-yellow-500">star</span></div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xl font-bold">24h</div>
                                    <div>
                                        <h3 className="font-bold">Primer Día</h3>
                                        <p className="text-xs text-green-600 font-medium">Logrado: 12 Oct</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500">Completaste la parte más difícil: empezar. Tu cuerpo comenzó a eliminar el monóxido de carbono.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hitos de Salud</h2>
                        <div className="flex flex-col gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-orange-100 text-orange-600"><span className="material-symbols-outlined">favorite</span></div>
                                    <div>
                                        <h3 className="font-bold">Ritmo Cardíaco Normalizado</h3>
                                        <p className="text-sm text-slate-500">20 minutos después de dejarlo</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-green-500">check_circle</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ChatWidget />
            </main>
        </div>
    );
};
