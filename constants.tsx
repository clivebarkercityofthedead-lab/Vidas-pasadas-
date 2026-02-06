
import React from 'react';

export const ZODIAC_SIGNS = [
    "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", 
    "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"
];

export const PLANETS = [
    "Sol", "Luna", "Mercurio", "Venus", "Marte", "Júpiter", 
    "Saturno", "Urano", "Neptuno", "Plutón", "Quirón", "Nodo Norte", "Nodo Sur"
];

// Expanded Asteroids based on "Astrodiest" methodology for Talents and Past Lives
export const ASTEROID_CATEGORIES = {
    "Talento y Sabiduría": ["Pallas", "Urania", "Minerva", "Sapiéntia", "Sophy", "Musa"],
    "Kármicos y Vidas Pasadas": ["Kaali", "Shiva", "Karma", "Nemesis", "Leto", "Mnemosyne"],
    "Sanación y Nutrición": ["Ceres", "Higea", "Panacea", "Aesculapius", "Chiron", "Salacia"],
    "Amor y Alma": ["Juno", "Vesta", "Psyche", "Eros", "Amor", "Anteros"]
};

export const ASTEROIDS = Object.values(ASTEROID_CATEGORIES).flat();

// Expanded Fixed Stars categorized by Starseed Origins
export const STARSEED_STARS = {
    "Sirianos": ["Sirio", "Murzim", "Muliphein"],
    "Pleyadianos": ["Alcyone", "Maia", "Electra", "Merope", "Taygeta"],
    "Arcturianos": ["Arturo"],
    "Andromedanos": ["Alpheratz", "Mirach", "Almach"],
    "Orionitas": ["Rigel", "Betelgeuse", "Bellatrix", "Mintaka"],
    "Lirianos": ["Vega", "Sheliak"],
    "Antarianos/Marcianos": ["Antares"],
    "Reales (Persas)": ["Regulus", "Aldebarán", "Fomalhaut", "Antares"]
};

export const FIXED_STARS = Object.values(STARSEED_STARS).flat();

export const SEVEN_RAYS_INFO = [
    { id: 1, name: "Voluntad o Poder", color: "text-blue-400", bg: "bg-blue-900/20", description: "La fuerza de propósito y la iniciativa divina." },
    { id: 2, name: "Amor-Sabiduría", color: "text-yellow-400", bg: "bg-yellow-900/20", description: "La capacidad de atraer, nutrir y comprender." },
    { id: 3, name: "Inteligencia Activa", color: "text-green-400", bg: "bg-green-900/20", description: "La adaptabilidad creativa y el uso de la materia." },
    { id: 4, name: "Armonía / Conflicto", color: "text-white", bg: "bg-gray-700/20", description: "El arte de encontrar equilibrio a través de la lucha." },
    { id: 5, name: "Ciencia / Conocimiento", color: "text-orange-400", bg: "bg-orange-900/20", description: "El análisis detallado y la investigación de la verdad." },
    { id: 6, name: "Devoción / Idealismo", color: "text-rose-400", bg: "bg-rose-900/20", description: "La entrega a una visión o un ideal superior." },
    { id: 7, name: "Orden / Magia", color: "text-purple-400", bg: "bg-purple-900/20", description: "La manifestación del espíritu en la forma ritualizada." },
];
