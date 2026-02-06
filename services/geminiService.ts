
import { GoogleGenAI, Type } from "@google/genai";
import { NatalData, AkashicAnalysis, PlanetaryPosition } from "../types";

const MODEL_NAME = "gemini-3-pro-preview";

export const estimatePlanetaryPositions = async (birthInfo: Partial<NatalData>): Promise<{ geocentric: PlanetaryPosition[], heliocentric: PlanetaryPosition[] }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    const prompt = `
        Como un astrómano experto en efemérides, estima con la mayor precisión posible las posiciones planetarias (Signo y Casa) 
        para el siguiente nacimiento.
        Fecha: ${birthInfo.birthDay}/${birthInfo.birthMonth}/${birthInfo.birthYear}
        Hora: ${birthInfo.birthHour}:${birthInfo.birthMinute}
        Lugar: ${birthInfo.city}, ${birthInfo.country}

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
        Analiza profundamente esta configuración:

        CONSULTANTE: ${data.name}
        VOCACIÓN: ${data.vocation}
        NACIMIENTO: ${data.birthDay}/${data.birthMonth}/${data.birthYear} a las ${data.birthHour}:${data.birthMinute} en ${data.city}, ${data.country}.

        DATOS GEOCÉNTRICOS (Personalidad): ${JSON.stringify(data.geocentric)}
        DATOS HELIOCÉNTRICOS (Misión del Alma): ${JSON.stringify(data.heliocentric)}
        ASTEROIDES ACTIVOS: ${data.asteroids.join(", ")}
        ESTRELLAS FIJAS: ${data.fixedStars.join(", ")}

        Análisis requerido:
        1. Origen Akáshico: Vidas pasadas clave y herencia kármica.
        2. Talentos de Encarnación: Habilidades prácticas actuales.
        3. Talentos Dormidos: Habilidades espirituales heliocéntricas.
        4. Legado Starseed: Conexiones con sistemas estelares (Sirio, Pléyades, etc.) según las estrellas fijas.
        5. Sabiduría de Asteroides: Talentos específicos (sanación, sabiduría, justicia).
        6. Alineación Vocacional: Cómo su trabajo actual se conecta con su plan de alma.
        7. Sendero Esotérico y Rayo Primario.

        Responde en formato JSON.
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
