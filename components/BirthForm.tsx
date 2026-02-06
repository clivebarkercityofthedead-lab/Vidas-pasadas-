
import React, { useState } from 'react';
import { ZODIAC_SIGNS, PLANETS, ASTEROIDS, FIXED_STARS } from '../constants';
import { NatalData, PlanetaryPosition } from '../types';
import { estimatePlanetaryPositions } from '../services/geminiService';

interface BirthFormProps {
    onSubmit: (data: NatalData) => void;
}

export const BirthForm: React.FC<BirthFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [birthDay, setBirthDay] = useState(1);
    const [birthMonth, setBirthMonth] = useState(1);
    const [birthYear, setBirthYear] = useState(1990);
    const [birthHour, setBirthHour] = useState(12);
    const [birthMinute, setBirthMinute] = useState(0);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [vocation, setVocation] = useState('');
    
    const [geoPositions, setGeoPositions] = useState<PlanetaryPosition[]>([]);
    const [helioPositions, setHelioPositions] = useState<PlanetaryPosition[]>([]);
    const [selectedAsteroids, setSelectedAsteroids] = useState<string[]>([]);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    
    const [isAutofilling, setIsAutofilling] = useState(false);

    const handleAutofill = async () => {
        if (!birthYear || !city) {
            alert("Por favor completa los datos de nacimiento básicos para el asistente de IA.");
            return;
        }
        setIsAutofilling(true);
        try {
            const data = await estimatePlanetaryPositions({ birthDay, birthMonth, birthYear, birthHour, birthMinute, city, country });
            setGeoPositions(data.geocentric);
            setHelioPositions(data.heliocentric);
        } catch (error) {
            console.error(error);
            alert("El asistente cósmico no pudo calcular las efemérides.");
        } finally {
            setIsAutofilling(false);
        }
    };

    const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        if (list.includes(item)) setList(list.filter(i => i !== item));
        else setList([...list, item]);
    };

    const addPosition = (type: 'geo' | 'helio') => {
        const newPos: PlanetaryPosition = { planet: PLANETS[0], sign: ZODIAC_SIGNS[0], house: 1 };
        if (type === 'geo') setGeoPositions([...geoPositions, newPos]);
        else setHelioPositions([...helioPositions, newPos]);
    };

    const updatePosition = (index: number, type: 'geo' | 'helio', field: keyof PlanetaryPosition, value: any) => {
        const updated = type === 'geo' ? [...geoPositions] : [...helioPositions];
        updated[index] = { ...updated[index], [field]: value };
        if (type === 'geo') setGeoPositions(updated);
        else setHelioPositions(updated);
    };

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Section 1: Identity & Birth */}
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-2xl font-cinzel text-purple-400 border-b border-purple-900/50 pb-2">Identidad y Encarnación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input type="text" placeholder="Nombre Completo" value={name} onChange={e => setName(e.target.value)} className="input-style" />
                    <input type="text" placeholder="Vocación / Profesión" value={vocation} onChange={e => setVocation(e.target.value)} className="input-style" />
                    <input type="text" placeholder="Ciudad" value={city} onChange={e => setCity(e.target.value)} className="input-style" />
                    <input type="text" placeholder="País" value={country} onChange={e => setCountry(e.target.value)} className="input-style" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase text-slate-500 ml-1">Día</label>
                        <input type="number" min="1" max="31" value={birthDay} onChange={e => setBirthDay(parseInt(e.target.value))} className="input-style" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase text-slate-500 ml-1">Mes</label>
                        <input type="number" min="1" max="12" value={birthMonth} onChange={e => setBirthMonth(parseInt(e.target.value))} className="input-style" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase text-slate-500 ml-1">Año</label>
                        <input type="number" min="1800" max="2100" value={birthYear} onChange={e => setBirthYear(parseInt(e.target.value))} className="input-style" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase text-slate-500 ml-1">Hora</label>
                        <input type="number" min="0" max="23" value={birthHour} onChange={e => setBirthHour(parseInt(e.target.value))} className="input-style" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] uppercase text-slate-500 ml-1">Minuto</label>
                        <input type="number" min="0" max="59" value={birthMinute} onChange={e => setBirthMinute(parseInt(e.target.value))} className="input-style" />
                    </div>
                </div>

                <button 
                    onClick={handleAutofill}
                    disabled={isAutofilling}
                    className="flex items-center gap-2 text-sm font-bold bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 px-4 py-2 rounded-lg transition-all"
                >
                    {isAutofilling ? 'Calculando Efemérides...' : '✨ Autocompletar con Asistente IA'}
                </button>
            </div>

            {/* Section 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-6 rounded-2xl">
                    <h3 className="text-xl font-cinzel mb-4 text-purple-300">Geocéntrica (Personalidad)</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {geoPositions.map((pos, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <select value={pos.planet} onChange={e => updatePosition(i, 'geo', 'planet', e.target.value)} className="select-style flex-1">
                                    {PLANETS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <select value={pos.sign} onChange={e => updatePosition(i, 'geo', 'sign', e.target.value)} className="select-style flex-1">
                                    {ZODIAC_SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <input type="number" min="1" max="12" value={pos.house} onChange={e => updatePosition(i, 'geo', 'house', parseInt(e.target.value))} className="input-style w-16" />
                                <button onClick={() => setGeoPositions(geoPositions.filter((_, idx) => idx !== i))} className="text-red-900/50 hover:text-red-500 px-2">×</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addPosition('geo')} className="mt-4 text-xs font-bold text-purple-500 hover:text-purple-400">+ AÑADIR PLANETA</button>
                </div>

                <div className="glass p-6 rounded-2xl">
                    <h3 className="text-xl font-cinzel mb-4 text-yellow-300">Heliocéntrica (Alma)</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {helioPositions.map((pos, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <select value={pos.planet} onChange={e => updatePosition(i, 'helio', 'planet', e.target.value)} className="select-style flex-1">
                                    {PLANETS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <select value={pos.sign} onChange={e => updatePosition(i, 'helio', 'sign', e.target.value)} className="select-style flex-1">
                                    {ZODIAC_SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <input type="number" min="1" max="12" value={pos.house} onChange={e => updatePosition(i, 'helio', 'house', parseInt(e.target.value))} className="input-style w-16" />
                                <button onClick={() => setHelioPositions(helioPositions.filter((_, idx) => idx !== i))} className="text-red-900/50 hover:text-red-500 px-2">×</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addPosition('helio')} className="mt-4 text-xs font-bold text-yellow-500 hover:text-yellow-400">+ AÑADIR PLANETA</button>
                </div>
            </div>

            {/* Section 3: Asteroids & Fixed Stars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-6 rounded-2xl">
                    <h3 className="text-xl font-cinzel mb-4 text-green-300 italic">Asteroides de Talento (Astrodiest)</h3>
                    <div className="flex flex-wrap gap-2">
                        {ASTEROIDS.map(ast => (
                            <button 
                                key={ast} 
                                onClick={() => toggleItem(selectedAsteroids, setSelectedAsteroids, ast)}
                                className={`px-3 py-1 rounded-full text-xs transition-all ${selectedAsteroids.includes(ast) ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
                            >
                                {ast}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="glass p-6 rounded-2xl">
                    <h3 className="text-xl font-cinzel mb-4 text-cyan-300">Conexiones Starseed (Estrellas)</h3>
                    <div className="flex flex-wrap gap-2">
                        {FIXED_STARS.map(star => (
                            <button 
                                key={star} 
                                onClick={() => toggleItem(selectedStars, setSelectedStars, star)}
                                className={`px-3 py-1 rounded-full text-xs transition-all ${selectedStars.includes(star) ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
                            >
                                {star}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button 
                onClick={() => onSubmit({ 
                    name, birthDay, birthMonth, birthYear, birthHour, birthMinute, 
                    city, country, vocation, geocentric: geoPositions, heliocentric: helioPositions,
                    asteroids: selectedAsteroids, fixedStars: selectedStars
                })}
                className="w-full cosmic-gradient p-6 rounded-2xl font-cinzel text-2xl hover:scale-[1.01] transition-transform gold-glow border border-white/20"
            >
                INICIAR APERTURA DE REGISTROS
            </button>

            <style>{`
                .input-style { @apply bg-slate-900/50 border border-slate-700/50 p-3 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-600 text-sm; }
                .select-style { @apply bg-slate-800 border border-slate-700 p-2 rounded-lg text-xs outline-none focus:border-purple-500; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
            `}</style>
        </div>
    );
};
