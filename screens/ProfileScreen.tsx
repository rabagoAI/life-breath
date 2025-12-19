
import React, { useState, useRef } from 'react';
import { NavigationSidebar } from '../components/NavigationSidebar';
import { SOSHeader } from '../components/SOSHeader';
import { ChatWidget } from '../components/ChatWidget';

export const ProfileScreen: React.FC = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [profileImage, setProfileImage] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuC0aWyqcNHnd1rzvYcXlUVFzM57oHRRU9L6x15hCscXtBvmIjCvpxImsiydPab2qR2GElfp_rNBu5LqxbkEUYIEVZMEHpjTlntiVic85gsSxQgedKdSFtOooPzA8u_36yfSGatuZPLIMAoAIRtEa2S-gXGFgG2Rn9jPrgn958Hn33rgIkcqO4M4WEGThqGPMft2V-WJKd8__px2c6d0uz2pkPUQO7hFleklG460yMd1Owea7hhpFgJ26m2VQdq9w93W2t6iXmwMNQg");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        setIsSaving(true);
        // Simulación de guardado en servidor
        setTimeout(() => setIsSaving(false), 1500);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark">
            <NavigationSidebar />
            <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-background-light dark:bg-background-dark">
                <SOSHeader />
                <div className="flex-1 w-full max-w-4xl mx-auto p-6 md:p-8 lg:p-12 flex flex-col gap-8 pb-20">
                    <div className="flex items-center justify-between">
                         <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Tu Perfil</h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400">Gestiona tu plan para dejar de fumar y tus datos personales.</p>
                        </div>
                        <button 
                            onClick={handleSave}
                            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg font-bold transition-all disabled:opacity-70"
                            disabled={isSaving}
                        >
                            {isSaving ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">save</span>}
                            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group">
                                <div 
                                    className="size-32 rounded-full bg-slate-300 bg-cover bg-center border-4 border-white dark:border-card-dark shadow-lg transition-transform duration-300 group-hover:scale-105" 
                                    style={{backgroundImage: `url('${profileImage}')`}}
                                ></div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                />
                                <button 
                                    onClick={handleImageClick}
                                    className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white shadow-lg hover:bg-blue-600 transition-colors transform hover:scale-110 active:scale-95 flex items-center justify-center"
                                    title="Cambiar foto de perfil"
                                >
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                </button>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Alex Morgan</h3>
                                <p className="text-sm text-slate-500">Plan Gratuito</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-6">
                            <div className="p-6 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                                <h3 className="font-bold border-b dark:border-slate-800 pb-2 text-slate-900 dark:text-white">Datos Personales</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre de Usuario</label>
                                        <input type="text" defaultValue="Alex Morgan" className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface-dark border dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                        <input type="email" defaultValue="alex.morgan@example.com" className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface-dark border dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                            </div>

                             <div className="p-6 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                                <h3 className="font-bold border-b dark:border-slate-800 pb-2 text-slate-900 dark:text-white">Mi Plan para Dejar de Fumar</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Fecha en que lo dejas</label>
                                        <input type="date" defaultValue="2023-10-12" className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface-dark border dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Cigarrillos al día</label>
                                        <input type="number" defaultValue="20" className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface-dark border dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Coste por paquete (€)</label>
                                        <input type="number" step="0.01" defaultValue="5.50" className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface-dark border dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Años fumando</label>
                                        <input type="number" defaultValue="8" className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-surface-dark border dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ChatWidget />
            </main>
        </div>
    );
};
