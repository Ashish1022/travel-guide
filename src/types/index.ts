export interface Activity {
    name: string;
    description: string;
    duration: string;
    cost: string;
    location: string;
    image: string;
}

export interface Meal {
    type: string;
    suggestion: string;
    estimatedCost: string;
    cuisine: string;
}

export interface Accommodation {
    type: string;
    priceRange: string;
    area: string;
}

export interface Day {
    day: number;
    title: string;
    activities: Activity[];
    meals: Meal[];
    accommodation: Accommodation;
}

export interface Highlight {
    name: string;
    description: string;
    estimatedCost: string;
    image: string;
}

export interface BudgetBreakdown {
    accommodation: string;
    food: string;
    transportation: string;
    activities: string;
}

export interface EstimatedBudget {
    total: string;
    perPerson: string;
    breakdown: BudgetBreakdown;
}

export interface LocalInfo {
    currency: string;
    language: string;
    transport: string;
    safety: string;
}

export interface TripData {
    destination: string;
    destinationImage: string;
    duration: number;
    bestTime: string;
    estimatedBudget: EstimatedBudget;
    highlights: Highlight[];
    days: Day[];
    travelTips: string[];
    localInfo: LocalInfo;
}

export interface PredefinedItineraries {
    [key: string]: TripData;
}

export interface SuggestedTrip {
    id: number;
    destination: string;
    duration: string;
    budget: string;
    image: string;
    highlights: string[];
}

export interface UnsplashResponse {
    results: Array<{
        urls?: {
            regular?: string
        }
    }>
}

interface WeatherInfo {
    temperature: string;
    condition: string;
    humidity: string;
    description: string;
}

export interface Itinerary {
    destination: string
    duration: number
    bestTime: string
    estimatedBudget: {
        total: string
        perPerson: string
        breakdown: {
            accommodation: string
            food: string
            transportation: string
            activities: string
        }
    }
    highlights: Highlight[]
    days: Day[]
    travelTips: string[]
    localInfo: {
        currency: string
        language: string
        transport: string
        safety: string
    }
    destinationImage?: string
    weather?: WeatherInfo;
}

export interface RequestBody {
    destination: string
    startDate: string
    endDate: string
    interests: string
    budget: string
    travelers: number
}