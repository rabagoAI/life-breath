
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const SOSHeader: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Panel Principal', path: '/dashboard', icon: 'dashboard' },
        { name: 'Programa Diario', path: '/program', icon: 'school' },
        { name: 'Comunidad', path: '/community', icon: 'groups' },
        { name: 'Logros', path: '/milestones', icon: 'emoji_events' },
        { name: 'Perfil', path: '/profile', icon: 'account_circle' },
        { name: 'Ajustes', path: '/settings', icon: 'settings' },
    ];

    return (
        <>
            <header className="sticky top-0 z-30 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="md:hidden size-8 rounded-full bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-sm">pulmonology</span>
                        </div>
                        <span className="font-bold text-lg dark:text-white">LifeBreath</span>
                    </div>
                </div>
                
                <div className="hidden md:block">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Racha Actual: <span className="text-primary font-bold">12 Días</span></p>
                </div>

                <button onClick={() => navigate('/sos')} className="group relative flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg shadow-rose-600/20 transition-all hover:shadow-rose-600/40 hover:-translate-y-0.5 active:translate-y-0">
                    <span className="material-symbols-outlined animate-pulse text-[18px] md:text-[20px]">emergency_home</span>
                    <span className="font-bold tracking-wide text-xs md:text-sm uppercase">SOS</span>
                </button>
            </header>

            {/* Menú Lateral Móvil */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#111318] p-6 shadow-2xl flex flex-col gap-8 animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined">pulmonology</span>
                                </div>
                                <span className="font-bold text-xl dark:text-white">LifeBreath</span>
                            </div>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <div 
                                    key={link.path}
                                    onClick={() => { navigate(link.path); setIsMobileMenuOpen(false); }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === link.path ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                >
                                    <span className="material-symbols-outlined">{link.icon}</span>
                                    <span className="font-medium">{link.name}</span>
                                </div>
                            ))}
                        </nav>
                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0aWyqcNHnd1rzvYcXlUVFzM57oHRRU9L6x15hCscXtBvmIjCvpxImsiydPab2qR2GElfp_rNBu5LqxbkEUYIEVZMEHpjTlntiVic85gsSxQgedKdSFtOooPzA8u_36yfSGatuZPLIMAoAIRtEa2S-gXGFgG2Rn9jPrgn958Hn33rgIkcqO4M4WEGThqGPMft2V-WJKd8__px2c6d0uz2pkPUQO7hFleklG460yMd1Owea7hhpFgJ26m2VQdq9w93W2t6iXmwMNQg')"}}></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Alex Morgan</p>
                                    <p className="text-xs text-slate-500">Racha de 12 Días</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
};
