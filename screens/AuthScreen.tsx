
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthScreen: React.FC = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulación de autenticación
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 via-primary to-indigo-900 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-[-10%] left-[-10%] size-[40%] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] size-[50%] bg-blue-400/10 rounded-full blur-3xl"></div>
            
            <div className="w-full max-w-[440px] z-10 animate-in fade-in zoom-in duration-500">
                {/* Logo y Eslogan */}
                <div className="flex flex-col items-center gap-4 mb-8 text-white">
                    <div className="size-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/30">
                        <span className="material-symbols-outlined text-[40px]">pulmonology</span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-black tracking-tight">LifeBreath</h1>
                        <p className="text-blue-100 font-medium opacity-80">Tu camino hacia una vida libre de humo</p>
                    </div>
                </div>

                {/* Tarjeta de Auth */}
                <div className="bg-white/95 dark:bg-[#1C2333]/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/20 overflow-hidden">
                    {/* Selector de modo */}
                    <div className="flex p-2 gap-1 bg-slate-100 dark:bg-slate-900/50 m-4 rounded-2xl">
                        <button 
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${isLogin ? 'bg-white dark:bg-card-dark text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Iniciar Sesión
                        </button>
                        <button 
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${!isLogin ? 'bg-white dark:bg-card-dark text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Registrarse
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 pt-2 flex flex-col gap-5">
                        <div className="flex flex-col gap-4">
                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Nombre Completo</label>
                                    <div className="relative flex items-center">
                                        <span className="material-symbols-outlined absolute left-4 text-slate-400">person</span>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Ej. Alex Morgan"
                                            className="w-full bg-slate-50 dark:bg-surface-dark border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Correo Electrónico</label>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-4 text-slate-400">mail</span>
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="tu@email.com"
                                        className="w-full bg-slate-50 dark:bg-surface-dark border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contraseña</label>
                                    {isLogin && <button type="button" className="text-[10px] font-bold text-primary hover:underline">¿Olvidaste tu contraseña?</button>}
                                </div>
                                <div className="relative flex items-center">
                                    <span className="material-symbols-outlined absolute left-4 text-slate-400">lock</span>
                                    <input 
                                        required
                                        type="password" 
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 dark:bg-surface-dark border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="mt-2 w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {isLogin ? 'Entrar ahora' : 'Crear mi cuenta'}
                        </button>

                        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
                            Al continuar, aceptas nuestros <button type="button" className="underline hover:text-primary">Términos</button> y <button type="button" className="underline hover:text-primary">Privacidad</button>.
                        </p>
                    </form>
                </div>

                {/* Pie de página social/invitado */}
                <div className="mt-8 flex flex-col items-center gap-4">
                    <p className="text-white/60 text-sm font-medium">O continúa con</p>
                    <div className="flex gap-4">
                        <button className="size-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                            <img src="https://www.svgrepo.com/show/475656/google_color.svg" className="size-6" alt="Google" />
                        </button>
                        <button className="size-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                            <img src="https://www.svgrepo.com/show/475647/facebook.svg" className="size-6" alt="Facebook" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
