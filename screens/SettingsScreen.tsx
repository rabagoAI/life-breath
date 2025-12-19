
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationSidebar } from '../components/NavigationSidebar';
import { SOSHeader } from '../components/SOSHeader';
import { ChatWidget } from '../components/ChatWidget';

type SettingsModal = 'none' | 'help' | 'privacy' | 'logout';

export const SettingsScreen: React.FC = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [sound, setSound] = useState(true);
    const [activeModal, setActiveModal] = useState<SettingsModal>('none');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleLogout = () => {
        // Cerramos el modal
        setActiveModal('none');
        // Redirigimos a la pantalla de inicio/auth
        navigate('/');
    };

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark">
            <NavigationSidebar />
            <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-background-light dark:bg-background-dark">
                <SOSHeader />
                <div className="flex-1 w-full max-w-3xl mx-auto p-6 md:p-8 lg:p-12 flex flex-col gap-8 pb-20">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Ajustes</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Personaliza tu experiencia en LifeBreath.</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white px-1">Preferencias</h2>
                        <div className="rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                        <span className="material-symbols-outlined">dark_mode</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-900 dark:text-slate-200">Modo Oscuro</h3>
                                        <p className="text-xs text-slate-500">Más cómodo para la vista por la noche</p>
                                    </div>
                                </div>
                                <button onClick={toggleDarkMode} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-slate-300'}`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 border-b dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                        <span className="material-symbols-outlined">notifications</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-900 dark:text-slate-200">Recordatorios Diarios</h3>
                                        <p className="text-xs text-slate-500">Notificaciones de check-in a las 9:00 AM</p>
                                    </div>
                                </div>
                                <button onClick={() => setNotifications(!notifications)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? 'bg-primary' : 'bg-slate-300'}`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                                        <span className="material-symbols-outlined">volume_up</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-slate-900 dark:text-slate-200">Efectos de Sonido</h3>
                                        <p className="text-xs text-slate-500">Audio para logros y SOS</p>
                                    </div>
                                </div>
                                <button onClick={() => setSound(!sound)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${sound ? 'bg-primary' : 'bg-slate-300'}`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sound ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-bold px-1 text-slate-900 dark:text-white">Soporte y Privacidad</h2>
                        <div className="rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                            <button 
                                onClick={() => setActiveModal('help')}
                                className="flex items-center justify-between p-4 border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                            >
                                <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Centro de Ayuda</span>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </button>
                             <button 
                                onClick={() => setActiveModal('privacy')}
                                className="flex items-center justify-between p-4 border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                            >
                                <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Política de Privacidad</span>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </button>
                             <button 
                                onClick={() => setActiveModal('logout')}
                                className="flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
                            >
                                <span className="font-medium text-red-600">Cerrar Sesión</span>
                                <span className="material-symbols-outlined text-red-600 group-hover:translate-x-1 transition-transform">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
                <ChatWidget />
            </main>

            {/* Modales de Ajustes */}
            {activeModal !== 'none' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setActiveModal('none')}
                    ></div>
                    <div className="relative bg-white dark:bg-[#1C2333] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-300 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {activeModal === 'help' && 'Centro de Ayuda'}
                                {activeModal === 'privacy' && 'Política de Privacidad'}
                                {activeModal === 'logout' && '¿Cerrar Sesión?'}
                            </h3>
                            <button onClick={() => setActiveModal('none')} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            {activeModal === 'help' && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold text-primary mb-2">¿Cómo funciona la racha?</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">La racha cuenta los días completos desde que marcaste tu último cigarrillo. Se actualiza cada 24 horas.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2">¿Qué es el botón SOS?</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Es una herramienta de emergencia para cuando sientes un antojo incontrolable. Te guía a través de ejercicios de respiración y distracción.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-2">¿Cómo contacto con soporte?</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Puedes usar nuestro Asistente LifeBreath por IA en cualquier momento, o escribirnos a support@lifebreath.app.</p>
                                    </div>
                                </div>
                            )}

                            {activeModal === 'privacy' && (
                                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <p>En <strong>LifeBreath</strong>, nos tomamos tu privacidad muy en serio. Tus datos de salud y progreso son estrictamente personales.</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>No compartimos tus datos con anunciantes ni terceros.</li>
                                        <li>Toda la información del chat está cifrada.</li>
                                        <li>Puedes exportar o borrar tus datos en cualquier momento desde tu perfil.</li>
                                    </ul>
                                    <p className="pt-2 italic">Última actualización: Mayo 2024</p>
                                </div>
                            )}

                            {activeModal === 'logout' && (
                                <div className="text-center space-y-4">
                                    <div className="size-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 mx-auto flex items-center justify-center">
                                        <span className="material-symbols-outlined text-3xl">warning</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">¿Estás seguro de que quieres salir? Tu progreso se mantendrá guardado, pero tendrás que iniciar sesión de nuevo para acceder.</p>
                                    <div className="flex gap-3 pt-4">
                                        <button 
                                            onClick={() => setActiveModal('none')}
                                            className="flex-1 py-3 rounded-xl font-bold border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            onClick={handleLogout}
                                            className="flex-1 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {activeModal !== 'logout' && (
                            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t dark:border-slate-800 text-center">
                                <button 
                                    onClick={() => setActiveModal('none')}
                                    className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                                >
                                    Entendido
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
