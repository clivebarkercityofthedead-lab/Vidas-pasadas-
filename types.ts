
export enum RayType {
    Ray1 = "Primer Rayo: Voluntad o Poder",
    Ray2 = "Segundo Rayo: Amor-Sabiduría",
    Ray3 = "Tercer Rayo: Inteligencia Activa",
    Ray4 = "Cuarto Rayo: Armonía a través del Conflicto",
    Ray5 = "Quinto Rayo: Conocimiento Concreto o Ciencia",
    Ray6 = "Sexto Rayo: Idealismo Abstracto o Devoción",
    Ray7 = "Séptimo Rayo: Orden Ceremonial o Magia"
}

export interface PlanetaryPosition {
    planet: string;
    sign: string;
    house: number;
    degree?: string;
}

export interface NatalData {
    name: string;
    birthDay: number;
    birthMonth: number;
    birthYear: number;
    birthHour: number;
    birthMinute: number;
    city: string;
    country: string;
    vocation: string;
    geocentric: PlanetaryPosition[];
    heliocentric: PlanetaryPosition[];
    asteroids: string[];
    fixedStars: string[];
}

export interface AkashicAnalysis {
    pastLifeOrigin: string;
    incarnationTalents: string;
    spiritualDormantTalents: string;
    starseedLegacy: string;
    asteroidInsights: string;
    vocationAlignment: string;
    esotericPath: string;
    primaryRay: RayType;
}
