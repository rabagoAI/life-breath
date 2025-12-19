
import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message } from '../types';

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init-1',
            role: 'model',
            text: "¡Hola Alex! Estoy aquí para apoyarte en tu camino. ¿Cómo te sientes hoy?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: inputValue.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const responseText = await sendMessageToGemini(userMessage.text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Ventana de Chat */}
            {isOpen && (
                <div className="pointer-events-auto mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Cabecera */}
                    <div className="bg-primary p-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3 text-white">
                            <div className="size-8 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-lg">smart_toy</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Asistente LifeBreath</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="size-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    En línea
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Área de Mensajes */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#151921]">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                                        msg.role === 'user' 
                                            ? 'bg-primary text-white rounded-br-none' 
                                            : 'bg-white dark:bg-[#282e39] text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-100 dark:border-slate-700'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-[#282e39] rounded-2xl rounded-bl-none px-4 py-3 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                                    <span className="size-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                                    <span className="size-1.5 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                                    <span className="size-1.5 rounded-full bg-slate-400 animate-bounce delay-300"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Área de Entrada */}
                    <div className="p-4 bg-white dark:bg-card-dark border-t border-slate-200 dark:border-slate-800 shrink-0">
                        <div className="relative flex items-center">
                            <input 
                                type="text" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Pregúntame lo que quieras..."
                                className="w-full bg-slate-100 dark:bg-[#111318] text-slate-900 dark:text-white rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border-none"
                            />
                            <button 
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                className="absolute right-2 p-1.5 bg-primary text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-slate-400">Impulsado por Gemini AI</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Botón Flotante */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto shadow-xl shadow-primary/30 hover:shadow-primary/50 bg-primary hover:bg-blue-600 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
            >
                {isOpen ? (
                    <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
                ) : (
                    <span className="material-symbols-outlined text-2xl group-hover:animate-pulse">smart_toy</span>
                )}
            </button>
        </div>
    );
};
