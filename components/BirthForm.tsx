
import React, { useState } from 'react';
import { ZODIAC_SIGNS, PLANETS, ASTEROID_CATEGORIES, STARSEED_STARS } from '../constants';
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
            <div className="glass p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
                <h3 className="text-2xl font-cinzel text-purple-400 border-b border-purple-900/50 pb-2 flex items-center gap-2">
                    <span className="text-xl">🪪</span> Identidad y Encarnación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input type="text" placeholder="Nombre Completo" value={name} onChange={e => setName(e.target.value)} className="input-style" />
                    <input type="text" placeholder="Vocación / Misión" value={vocation} onChange={e => setVocation(e.target.value)} className="input-style" />
                    <input type="text" placeholder="Ciudad de Origen" value={city} onChange={e => setCity(e.target.value)} className="input-style" />
                    <input type="text" placeholder="País" value={country} onChange={e => setCountry(e.target.value)} className="input-style" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="flex flex-col"><label className="label-style">Día</label><input type="number" min="1" max="31" value={birthDay} onChange={e => setBirthDay(parseInt(e.target.value))} className="input-style" /></div>
                    <div className="flex flex-col"><label className="label-style">Mes</label><input type="number" min="1" max="12" value={birthMonth} onChange={e => setBirthMonth(parseInt(e.target.value))} className="input-style" /></div>
                    <div className="flex flex-col"><label className="label-style">Año</label><input type="number" min="1800" max="2100" value={birthYear} onChange={e => setBirthYear(parseInt(e.target.value))} className="input-style" /></div>
                    <div className="flex flex-col"><label className="label-style">Hora</label><input type="number" min="0" max="23" value={birthHour} onChange={e => setBirthHour(parseInt(e.target.value))} className="input-style" /></div>
                    <div className="flex flex-col"><label className="label-style">Min</label><input type="number" min="0" max="59" value={birthMinute} onChange={e => setBirthMinute(parseInt(e.target.value))} className="input-style" /></div>
                </div>

                <button 
                    onClick={handleAutofill}
                    disabled={isAutofilling}
                    className="flex items-center gap-2 text-sm font-bold bg-purple-600/30 text-purple-200 hover:bg-purple-600/50 px-6 py-3 rounded-xl transition-all border border-purple-500/30"
                >
                    {isAutofilling ? '⏳ Sintonizando con las Estrellas...' : '✨ Generar Carta con Asistente AI'}
                </button>
            </div>

            {/* Section 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-6 rounded-2xl border-l-4 border-purple-500">
                    <h3 className="text-xl font-cinzel mb-4 text-purple-300">Carta Geocéntrica (Personalidad)</h3>
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
                                <button onClick={() => setGeoPositions(geoPositions.filter((_, idx) => idx !== i))} className="text-red-900/50 hover:text-red-500">×</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addPosition('geo')} className="mt-4 text-[10px] font-black tracking-widest text-purple-400 hover:text-purple-300 uppercase">+ Añadir Punto</button>
                </div>

                <div className="glass p-6 rounded-2xl border-l-4 border-yellow-500">
                    <h3 className="text-xl font-cinzel mb-4 text-yellow-300">Carta Heliocéntrica (Espíritu)</h3>
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
                                <button onClick={() => setHelioPositions(helioPositions.filter((_, idx) => idx !== i))} className="text-red-900/50 hover:text-red-500">×</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addPosition('helio')} className="mt-4 text-[10px] font-black tracking-widest text-yellow-400 hover:text-yellow-300 uppercase">+ Añadir Punto</button>
                </div>
            </div>

            {/* Section 3: Specialized Asteroids (Astrodiest) */}
            <div className="glass p-8 rounded-3xl border border-green-500/20 shadow-lg">
                <h3 className="text-2xl font-cinzel mb-6 text-green-300 flex items-center gap-2">
                    <span className="text-xl">☄️</span> Asteroides Astrodiest (Talento y Karma)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(ASTEROID_CATEGORIES).map(([cat, items]) => (
                        <div key={cat} className="space-y-3">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-green-600 mb-2">{cat}</h4>
                            <div className="flex flex-wrap gap-2">
                                {items.map(ast => (
                                    <button 
                                        key={ast} 
                                        onClick={() => toggleItem(selectedAsteroids, setSelectedAsteroids, ast)}
                                        className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${selectedAsteroids.includes(ast) ? 'bg-green-600/40 text-green-100 border-green-400 shadow-lg shadow-green-900/20' : 'bg-slate-900/50 text-slate-500 border-slate-800'}`}
                                    >
                                        {ast}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 4: Starseed Origins (Fixed Stars) */}
            <div className="glass p-8 rounded-3xl border border-cyan-500/20 shadow-lg">
                <h3 className="text-2xl font-cinzel mb-6 text-cyan-300 flex items-center gap-2">
                    <span className="text-xl">✨</span> Orígenes Starseed (Estrellas Fijas)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(STARSEED_STARS).map(([origin, items]) => (
                        <div key={origin} className="space-y-3">
                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-cyan-600 mb-2">{origin}</h4>
                            <div className="flex flex-wrap gap-2">
                                {items.map(star => (
                                    <button 
                                        key={star} 
                                        onClick={() => toggleItem(selectedStars, setSelectedStars, star)}
                                        className={`px-3 py-1.5 rounded-lg text-xs transition-all border ${selectedStars.includes(star) ? 'bg-cyan-600/40 text-cyan-100 border-cyan-400 shadow-lg shadow-cyan-900/20' : 'bg-slate-900/50 text-slate-500 border-slate-800'}`}
                                    >
                                        {star}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={() => onSubmit({ 
                    name, birthDay, birthMonth, birthYear, birthHour, birthMinute, 
                    city, country, vocation, geocentric: geoPositions, heliocentric: helioPositions,
                    asteroids: selectedAsteroids, fixedStars: selectedStars
                })}
                className="w-full cosmic-gradient p-8 rounded-3xl font-cinzel text-3xl hover:scale-[1.01] transition-transform gold-glow border border-white/20 shadow-2xl"
            >
                ABRIR REGISTROS AKÁSHICOS
            </button>

            <style>{`
                .input-style { @apply bg-slate-950/50 border border-slate-800 p-4 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-700 text-sm font-medium; }
                .label-style { @apply text-[10px] uppercase font-bold text-slate-500 ml-1 mb-1 tracking-widest; }
                .select-style { @apply bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs outline-none focus:border-purple-500 transition-all; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #4c1d95; border-radius: 10px; }
            `}</style>
        </div>
    );
};
