
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationSidebar } from '../components/NavigationSidebar';
import { SOSHeader } from '../components/SOSHeader';
import { ChatWidget } from '../components/ChatWidget';

interface Post {
    id: number;
    user: string;
    role: string;
    time: string;
    content: string;
    likes: number;
    comments: number;
    isSos: boolean;
    isSuccess?: boolean;
    isSaved?: boolean;
}

type FeedFilter = 'all' | 'trends' | 'success';

export const CommunityScreen: React.FC = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [activeView, setActiveView] = useState<'feed' | 'my_posts' | 'saved'>('feed');
    const [feedFilter, setFeedFilter] = useState<FeedFilter>('all');
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [connectedBuddies, setConnectedBuddies] = useState<number[]>([]);
    
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            user: "Usuario #4922",
            role: "3 Días Libre",
            time: "Hace 20m",
            content: "Día 3 y los antojos están pegando fuerte. ¡Distraedme por favor! Intento concentrarme en el trabajo pero es difícil. He estado bebiendo agua pero las ganas son abrumadoras ahora mismo.",
            likes: 24,
            comments: 12,
            isSos: true,
            isSaved: false
        },
        {
            id: 2,
            user: "Usuario #1029",
            role: "6 Meses Libre",
            time: "Hace 2h",
            content: "Finalmente corrí 5km sin jadear. Mejora, lo prometo. Hace seis meses no podía subir escaleras. Hoy terminé mi primera carrera. A todos los que empiezan hoy: vuestro yo del futuro os lo agradecerá.",
            likes: 156,
            comments: 43,
            isSos: false,
            isSuccess: true,
            isSaved: true
        },
        {
            id: 3,
            user: "Usuario #2210",
            role: "1 Mes Libre",
            time: "Hace 5h",
            content: "¡Acabo de ahorrar mis primeros 200€! No puedo creer lo mucho que gastaba en tabaco. Este dinero va directo a mi fondo para vacaciones.",
            likes: 89,
            comments: 15,
            isSos: false,
            isSuccess: true,
            isSaved: false
        }
    ]);

    const handlePost = () => {
        if (!input.trim()) return;
        const newPost: Post = {
            id: Date.now(),
            user: "Alex Morgan",
            role: "12 Días Libre",
            time: "Ahora mismo",
            content: input,
            likes: 0,
            comments: 0,
            isSos: false,
            isSaved: false
        };
        setPosts([newPost, ...posts]);
        setInput('');
        setActiveView('feed');
        setFeedFilter('all');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handlePost();
        }
    };

    const toggleBuddy = (id: number) => {
        if (connectedBuddies.includes(id)) {
            setConnectedBuddies(connectedBuddies.filter(bId => bId !== id));
        } else {
            setConnectedBuddies([...connectedBuddies, id]);
        }
    };

    const toggleSave = (postId: number) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, isSaved: !p.isSaved } : p));
    };

    const handleCheckIn = () => {
        if (!isCheckedIn) {
            setIsCheckedIn(true);
        }
    };

    const getSidebarClass = (view: 'feed' | 'my_posts' | 'saved') => {
        const isActive = activeView === view;
        return `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer group ${
            isActive 
            ? 'bg-primary/10 text-primary' 
            : 'hover:bg-slate-100 dark:hover:bg-[#282e39] text-slate-700 dark:text-white'
        }`;
    };

    const getDisplayedPosts = () => {
        let basePosts = posts;
        
        if (activeView === 'my_posts') {
            return basePosts.filter(p => p.user === 'Alex Morgan');
        }
        if (activeView === 'saved') {
            return basePosts.filter(p => p.isSaved);
        }
        
        // Logic for feed filters
        if (activeView === 'feed') {
            if (feedFilter === 'trends') {
                return basePosts.filter(p => p.likes > 50);
            }
            if (feedFilter === 'success') {
                return basePosts.filter(p => p.isSuccess);
            }
        }
        
        return basePosts;
    };

    const displayedPosts = getDisplayedPosts();

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark">
            <NavigationSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <SOSHeader />
                <div className="layout-container flex grow flex-row max-w-[1440px] mx-auto w-full overflow-hidden relative">
                    <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-[#282e39] overflow-y-auto">
                        <div className="p-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-text-secondary mb-2">Mi Viaje</h3>
                                <div onClick={() => setActiveView('feed')} className={getSidebarClass('feed')}>
                                    <span className="material-symbols-outlined">article</span>
                                    <p className="text-sm font-medium">Feed Comunitario</p>
                                </div>
                                <div onClick={() => setActiveView('my_posts')} className={getSidebarClass('my_posts')}>
                                    <span className="material-symbols-outlined">description</span>
                                    <p className="text-sm font-medium">Mis Publicaciones</p>
                                </div>
                                <div onClick={() => setActiveView('saved')} className={getSidebarClass('saved')}>
                                    <span className="material-symbols-outlined">bookmark</span>
                                    <p className="text-sm font-medium">Recursos Guardados</p>
                                </div>
                            </div>
                            <div className="h-px bg-slate-200 dark:bg-[#282e39] w-full"></div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-text-secondary mb-2">Acciones Diarias</h3>
                                <div onClick={handleCheckIn} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${isCheckedIn ? 'bg-green-500/10 text-green-600' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-[#282e39]'}`}>
                                    <span className="material-symbols-outlined">{isCheckedIn ? 'check_circle' : 'radio_button_unchecked'}</span>
                                    <p className="text-sm font-medium">{isCheckedIn ? 'Check-in Hecho' : 'Check-in Diario'}</p>
                                </div>
                                <div onClick={() => navigate('/sos')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-white hover:bg-red-500/10 group cursor-pointer">
                                    <span className="material-symbols-outlined group-hover:text-red-500">error</span>
                                    <p className="text-sm font-medium group-hover:text-red-500">Ayuda Urgente</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0 p-4 lg:p-8 overflow-y-auto">
                        <div className="max-w-[800px] mx-auto flex flex-col gap-6 pb-20">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black">
                                    {activeView === 'feed' && 'Apoyo Comunitario'}
                                    {activeView === 'my_posts' && 'Mis Publicaciones'}
                                    {activeView === 'saved' && 'Recursos Guardados'}
                                </h1>
                                <p className="text-slate-500 dark:text-text-secondary">
                                    {activeView === 'feed' && 'Conecta con otros en el mismo camino hacia una vida sin humo.'}
                                    {activeView === 'my_posts' && 'Sigue tus aportaciones y actualizaciones de progreso.'}
                                    {activeView === 'saved' && 'Tu colección de consejos útiles e historias inspiradoras.'}
                                </p>
                            </div>

                            {activeView === 'feed' && (
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    <button 
                                        onClick={() => setFeedFilter(feedFilter === 'all' ? 'trends' : 'all')}
                                        className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${feedFilter === 'trends' ? 'bg-primary text-white shadow-md' : 'bg-slate-200 dark:bg-[#282e39] hover:bg-slate-300 dark:hover:bg-[#323a48]'}`}
                                    >
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        <span className="text-sm font-medium">Tendencias</span>
                                    </button>
                                    <button 
                                        onClick={() => setFeedFilter(feedFilter === 'success' ? 'all' : 'success')}
                                        className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${feedFilter === 'success' ? 'bg-primary text-white shadow-md' : 'bg-slate-200 dark:bg-[#282e39] hover:bg-slate-300 dark:hover:bg-[#323a48]'}`}
                                    >
                                        <span className="material-symbols-outlined text-sm">star</span>
                                        <span className="text-sm font-medium">Historias de Éxito</span>
                                    </button>
                                    <button onClick={() => navigate('/sos')} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-red-500/10 border border-red-500/20 px-4 text-red-500 hover:bg-red-500/20 transition-all">
                                        <span className="material-symbols-outlined text-sm">warning</span>
                                        <span className="text-sm font-medium">Necesito Apoyo Ya</span>
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-card border border-slate-200 dark:border-[#282e39] shadow-sm">
                                <input 
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm" 
                                    placeholder="Comparte tu progreso o pide ayuda..." 
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button onClick={handlePost} disabled={!input.trim()} className="p-2 text-primary hover:bg-primary/10 rounded-full disabled:opacity-50">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {displayedPosts.length > 0 ? (
                                    displayedPosts.map(post => (
                                        <article key={post.id} className={`flex flex-col gap-3 p-5 rounded-xl bg-white dark:bg-surface-card border shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 ${post.isSos ? 'border-red-500/30' : 'border-slate-200 dark:border-[#282e39]'}`}>
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">
                                                        {post.isSuccess ? '6M' : <span className="material-symbols-outlined">person</span>}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-slate-900 dark:text-white text-sm font-bold">{post.user}</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#111318] text-slate-500">{post.role}</span>
                                                            <span className="text-slate-400 text-xs">• {post.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {post.isSos && <span className="px-2 py-1 rounded bg-red-100 text-red-600 text-[10px] font-bold">SOS</span>}
                                                {post.isSuccess && !post.isSos && <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold">ÉXITO</span>}
                                            </div>
                                            <p className="text-slate-600 dark:text-text-secondary text-sm leading-relaxed">{post.content}</p>
                                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100 dark:border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <button className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 text-sm transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                                                        <span>{post.likes}</span>
                                                    </button>
                                                    <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary text-sm transition-colors">
                                                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                                                        <span>{post.comments}</span>
                                                    </button>
                                                </div>
                                                <button onClick={() => toggleSave(post.id)} className={`text-sm flex items-center gap-1 transition-colors ${post.isSaved ? 'text-primary font-bold' : 'text-slate-500 hover:text-primary'}`}>
                                                    <span className={`material-symbols-outlined text-[20px] ${post.isSaved ? 'fill-1' : ''}`}>bookmark</span>
                                                    {post.isSaved ? 'Guardado' : 'Guardar'}
                                                </button>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-12 text-center gap-4 bg-slate-50 dark:bg-[#111318] rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                                        <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
                                        <div>
                                            <p className="font-bold text-slate-600 dark:text-slate-300">No hay publicaciones aquí</p>
                                            <p className="text-sm text-slate-500">Prueba a cambiar el filtro o sé el primero en publicar.</p>
                                        </div>
                                        <button onClick={() => {setFeedFilter('all'); setActiveView('feed');}} className="text-primary text-sm font-bold hover:underline">Ver todas las publicaciones</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>

                    <aside className="hidden xl:flex w-80 flex-col bg-white dark:bg-surface-dark border-l border-slate-200 dark:border-[#282e39] p-6">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">diversity_3</span>
                                    Sistema de Amigos
                                </h2>
                                <p className="text-slate-500 text-sm">Conecta con otros en tu etapa.</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-100 dark:border-[#282e39]">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="size-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">5D</div>
                                        <div>
                                            <p className="text-sm font-bold">Usuario #8812</p>
                                            <p className="text-[10px] text-slate-500">Dejó de fumar hace 5 días</p>
                                        </div>
                                    </div>
                                    <button onClick={() => toggleBuddy(1)} className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${connectedBuddies.includes(1) ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-blue-600'}`}>
                                        {connectedBuddies.includes(1) ? 'Conectado' : 'Conectar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                <ChatWidget />
            </div>
        </div>
    );
};
