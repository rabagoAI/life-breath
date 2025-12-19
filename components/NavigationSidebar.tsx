
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavigationSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname;
    
    const getLinkClass = (path: string) => {
        const isActive = active === path;
        const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer";
        return isActive 
            ? `${baseClass} bg-primary text-white shadow-md shadow-primary/20 hover:opacity-90` 
            : `${baseClass} text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800`;
    };

    return (
        <aside className="hidden md:flex w-72 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] p-6 z-10 h-screen">
            <div className="flex flex-col gap-8">
                {/* Marca */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="size-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <span className="material-symbols-outlined">pulmonology</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">LifeBreath</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Breathe Free</p>
                    </div>
                </div>
                {/* Navegación */}
                <nav className="flex flex-col gap-2">
                    <div onClick={() => navigate('/dashboard')} className={getLinkClass('/dashboard')}>
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-medium">Panel Principal</span>
                    </div>
                    <div onClick={() => navigate('/program')} className={getLinkClass('/program')}>
                        <span className="material-symbols-outlined">school</span>
                        <span className="font-medium">Programa Diario</span>
                    </div>
                    <div onClick={() => navigate('/community')} className={getLinkClass('/community')}>
                        <span className="material-symbols-outlined">groups</span>
                        <span className="font-medium">Comunidad</span>
                    </div>
                    <div onClick={() => navigate('/milestones')} className={getLinkClass('/milestones')}>
                        <span className="material-symbols-outlined">emoji_events</span>
                        <span className="font-medium">Mis Logros</span>
                    </div>
                    <div onClick={() => navigate('/profile')} className={getLinkClass('/profile')}>
                        <span className="material-symbols-outlined">account_circle</span>
                        <span className="font-medium">Mi Perfil</span>
                    </div>
                    <div onClick={() => navigate('/settings')} className={getLinkClass('/settings')}>
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-medium">Ajustes</span>
                    </div>
                </nav>
            </div>
            {/* Usuario */}
            <div onClick={() => navigate('/profile')} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="size-10 rounded-full bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0aWyqcNHnd1rzvYcXlUVFzM57oHRRU9L6x15hCscXtBvmIjCvpxImsiydPab2qR2GElfp_rNBu5LqxbkEUYIEVZMEHpjTlntiVic85gsSxQgedKdSFtOooPzA8u_36yfSGatuZPLIMAoAIRtEa2S-gXGFgG2Rn9jPrgn958Hn33rgIkcqO4M4WEGThqGPMft2V-WJKd8__px2c6d0uz2pkPUQO7hFleklG460yMd1Owea7hhpFgJ26m2VQdq9w93W2t6iXmwMNQg')"}}></div>
                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Alex Morgan</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Plan Gratuito</p>
                </div>
            </div>
        </aside>
    );
};
