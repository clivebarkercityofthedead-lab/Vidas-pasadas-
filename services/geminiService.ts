
import { GoogleGenAI, Type } from "@google/genai";
import { NatalData, AkashicAnalysis, PlanetaryPosition } from "../types";

const MODEL_NAME = "gemini-3-pro-preview";

export const estimatePlanetaryPositions = async (birthInfo: Partial<NatalData>): Promise<{ geocentric: PlanetaryPosition[], heliocentric: PlanetaryPosition[] }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    const prompt = `
        Como un astrómano experto en efemérides y astrología esotérica, estima con la mayor precisión posible las posiciones planetarias (Signo y Casa) 
        para el siguiente nacimiento.
        Fecha: ${birthInfo.birthDay}/${birthInfo.birthMonth}/${birthInfo.birthYear}
        Hora: ${birthInfo.birthHour}:${birthInfo.birthMinute}
        Lugar: ${birthInfo.city}, ${birthInfo.country}

        Genera posiciones geocéntricas completas y una carta heliocéntrica para el análisis del alma.
        
        Devuelve un JSON con:
        1. geocentric: Lista de objetos { planet, sign, house } para los 10 planetas + Quirón y Nodos.
        2. heliocentric: Lista de objetos { planet, sign, house } para los planetas (usando el Sol como centro).
    `;

    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    geocentric: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                planet: { type: Type.STRING },
                                sign: { type: Type.STRING },
                                house: { type: Type.NUMBER }
                            }
                        }
                    },
                    heliocentric: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                planet: { type: Type.STRING },
                                sign: { type: Type.STRING },
                                house: { type: Type.NUMBER }
                            }
                        }
                    }
                }
            }
        }
    });

    return JSON.parse(response.text || "{}");
};

export const getAkashicAnalysis = async (data: NatalData): Promise<AkashicAnalysis> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    const prompt = `
        Actúa como un Maestro Supremo en Astrología Esotérica, Registros Akáshicos y Conexiones Galácticas.
        Usa la metodología "Astrodiest" para el análisis de asteroides y "Starseed Origins" para las estrellas fijas.

        PERFIL DEL ALMA: ${data.name}
        MISIÓN ACTUAL: ${data.vocation}
        COORDENADAS ESPACIO-TIEMPO: ${data.birthDay}/${data.birthMonth}/${data.birthYear} | ${data.city}, ${data.country}.

        DATOS GEOCÉNTRICOS (Vehículo Terrestre): ${JSON.stringify(data.geocentric)}
        DATOS HELIOCÉNTRICOS (Esencia Solar): ${JSON.stringify(data.heliocentric)}
        ASTEROIDES ACTIVOS (Metodología Astrodiest): ${data.asteroids.join(", ")}
        ESTRELLAS FIJAS (Marcadores Starseed): ${data.fixedStars.join(", ")}

        Tu misión es revelar:
        1. Origen Akáshico: El punto de partida galáctico y las memorias de vidas pasadas predominantes.
        2. Talentos de Encarnación: Capacidades tangibles en esta vida (foco geocéntrico).
        3. Talentos Dormidos: Capacidades del alma que esperan ser activadas (foco heliocéntrico).
        4. Legado Starseed: Basado en las Estrellas Fijas seleccionadas, identifica de qué sistema estelar proviene su linaje (Sirio, Pléyades, Arcturus, etc.).
        5. Sabiduría de Asteroides: Talentos de interpretación astrológica y sanación según los asteroides Astrodiest.
        6. Alineación Vocacional: Cómo su vocación declarada encaja en el Plan Divino.
        7. Sendero Esotérico y Rayo Primario de los Siete Rayos.

        Responde en formato JSON detallado.
    `;

    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    pastLifeOrigin: { type: Type.STRING },
                    incarnationTalents: { type: Type.STRING },
                    spiritualDormantTalents: { type: Type.STRING },
                    starseedLegacy: { type: Type.STRING },
                    asteroidInsights: { type: Type.STRING },
                    vocationAlignment: { type: Type.STRING },
                    esotericPath: { type: Type.STRING },
                    primaryRay: { type: Type.STRING }
                },
                required: ["pastLifeOrigin", "incarnationTalents", "spiritualDormantTalents", "starseedLegacy", "asteroidInsights", "vocationAlignment", "esotericPath", "primaryRay"]
            }
        }
    });

    return JSON.parse(response.text || "{}") as AkashicAnalysis;
};
