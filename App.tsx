
import React, { useState } from 'react';
import { BirthForm } from './components/BirthForm';
import { SEVEN_RAYS_INFO } from './constants';
import { NatalData, AkashicAnalysis } from './types';
import { getAkashicAnalysis } from './services/geminiService';

const App: React.FC = () => {
    const [view, setView] = useState<'form' | 'analysis' | 'rays'>('form');
    const [analysis, setAnalysis] = useState<AkashicAnalysis | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (data: NatalData) => {
        setLoading(true);
        try {
            const result = await getAkashicAnalysis(data);
            setAnalysis(result);
            setView('analysis');
        } catch (error) {
            console.error(error);
            alert("Error conectando con los registros cósmicos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen cosmic-gradient text-slate-100 pb-20 selection:bg-purple-500/30">
            <header className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-slate-950/80 backdrop-blur-xl z-50">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-cinzel font-bold tracking-[0.3em] text-purple-400">AKASHIC PORTAL</h1>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">Investigación Esotérica Avanzada</span>
                </div>
                <nav className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
                    <button onClick={() => setView('form')} className={`hover:text-purple-400 transition-colors ${view === 'form' ? 'text-purple-400 border-b-2 border-purple-400 pb-1' : 'text-slate-400'}`}>Consulta</button>
                    {analysis && (
                        <>
                            <button onClick={() => setView('analysis')} className={`hover:text-purple-400 transition-colors ${view === 'analysis' ? 'text-purple-400 border-b-2 border-purple-400 pb-1' : 'text-slate-400'}`}>Revelación</button>
                            <button onClick={() => setView('rays')} className={`hover:text-purple-400 transition-colors ${view === 'rays' ? 'text-purple-400 border-b-2 border-purple-400 pb-1' : 'text-slate-400'}`}>Estudio de Rayos</button>
                        </>
                    )}
                </nav>
            </header>

            <main className="max-w-6xl mx-auto p-6 mt-8">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-40 animate-pulse text-center">
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="font-cinzel text-2xl tracking-widest text-purple-300">DESCRIPTANDO CÓDIGOS DE LUZ...</p>
                        <p className="text-slate-500 mt-2 text-sm italic">Accediendo a la Memoria Universal del Alma</p>
                    </div>
                )}

                {!loading && view === 'form' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-cinzel mb-4">Módulo de Formación Esotérica</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                Identifica el origen akáshico a través de la síntesis geocéntrica (talentos de encarnación),
                                heliocéntrica (talentos espirituales) y la influencia estelar/asteroidal.
                            </p>
                        </div>
                        <BirthForm onSubmit={handleFormSubmit} />
                    </div>
                )}

                {!loading && view === 'analysis' && analysis && (
                    <div className="space-y-10 animate-fade-in pb-20">
                        {/* Main Ray Title */}
                        <div className="glass p-12 rounded-[3rem] text-center bg-gradient-to-b from-purple-900/20 to-transparent border-t border-purple-500/30">
                            <span className="text-xs tracking-[0.4em] uppercase text-slate-500 mb-2 block">Esencia Dominante</span>
                            <h3 className="text-5xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-purple-400">
                                {analysis.primaryRay}
                            </h3>
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card title="Origen Akáshico" content={analysis.pastLifeOrigin} color="border-purple-500" icon="🌌" />
                            <Card title="Legado Starseed" content={analysis.starseedLegacy} color="border-cyan-500" icon="✨" />
                            <Card title="Sabiduría Asteroidal" content={analysis.asteroidInsights} color="border-green-500" icon="☄️" />
                            <Card title="Talentos Geocéntricos" content={analysis.incarnationTalents} color="border-blue-500" icon="🌍" />
                            <Card title="Talentos Heliocéntricos" content={analysis.spiritualDormantTalents} color="border-yellow-500" icon="☀️" />
                            <Card title="Alineación Vocacional" content={analysis.vocationAlignment} color="border-orange-500" icon="💼" />
                        </div>

                        <div className="glass p-8 rounded-3xl border-l-8 border-white/20">
                            <h3 className="text-xl font-cinzel mb-4 text-white uppercase tracking-widest">Sendero de Ascensión Esotérica</h3>
                            <p className="text-slate-300 italic leading-relaxed">{analysis.esotericPath}</p>
                        </div>
                    </div>
                )}

                {!loading && view === 'rays' && (
                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-4xl font-cinzel mb-4">Los Siete Rayos de la Manifestación</h2>
                            <p className="text-slate-400 max-w-xl mx-auto">Las siete fuerzas de la creación que estructuran el desarrollo del alma humana.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {SEVEN_RAYS_INFO.map(ray => (
                                <div key={ray.id} className={`${ray.bg} p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group cursor-default`}>
                                    <div className={`text-[10px] font-black mb-1 ${ray.color} tracking-tighter`}>RAYO {ray.id}</div>
                                    <h4 className="text-lg font-cinzel mb-3 group-hover:text-white">{ray.name}</h4>
                                    <p className="text-slate-500 text-xs leading-relaxed mb-4">{ray.description}</p>
                                    <button className="text-[9px] uppercase tracking-widest text-slate-400 hover:text-white">Ver Arquetipos</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
            
            <footer className="fixed bottom-0 left-0 right-0 p-3 text-center bg-slate-950/95 text-[9px] tracking-[0.3em] uppercase text-slate-700 border-t border-white/5 backdrop-blur-md">
                Protocolo de Interpretación Astrológica Cuántica &copy; MMXXIV - Portal de Conciencia
            </footer>
        </div>
    );
};

const Card = ({ title, content, color, icon }: { title: string, content: string, color: string, icon: string }) => (
    <div className={`glass p-8 rounded-3xl border-t-2 ${color} hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500`}>
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-cinzel text-slate-100">{title}</h3>
            <span className="text-xl opacity-50">{icon}</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-400">{content}</p>
    </div>
);

export default App;
