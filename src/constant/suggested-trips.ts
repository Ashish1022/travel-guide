import { SuggestedTrip, TripData } from "@/types";

export const predefinedItineraries: Record<number, TripData> = {
    1: {
        destination: "Bali, Indonesia",
        destinationImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
        duration: 7,
        bestTime: "April to October",
        estimatedBudget: {
            total: "$1,500 - $2,500",
            perPerson: "$1,500 - $2,500",
            breakdown: {
                accommodation: "$400 - $700",
                food: "$210 - $350",
                transportation: "$150 - $250",
                activities: "$400 - $800"
            }
        },
        highlights: [
            {
                name: "Uluwatu Temple",
                description: "Clifftop temple with stunning sunset views and traditional Kecak dance performances",
                estimatedCost: "$5",
                image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80"
            },
            {
                name: "Tegallalang Rice Terraces",
                description: "Iconic terraced rice fields with lush green landscapes",
                estimatedCost: "$2",
                image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80"
            },
            {
                name: "Sacred Monkey Forest",
                description: "Ancient temple complex home to hundreds of playful long-tailed macaques",
                estimatedCost: "$5",
                image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80"
            }
        ],
        days: [
            {
                day: 1,
                title: "Arrival & Seminyak Beach",
                activities: [
                    {
                        name: "Seminyak Beach",
                        description: "Relax at the beautiful beach and watch the stunning Bali sunset",
                        duration: "3-4 hours",
                        cost: "Free",
                        location: "Seminyak",
                        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80"
                    },
                    {
                        name: "Beach Walk & Shopping",
                        description: "Explore boutique shops and trendy cafes along the beach strip",
                        duration: "2-3 hours",
                        cost: "$20-50",
                        location: "Seminyak",
                        image: "https://images.unsplash.com/photo-1441986380878-c4248f5b8b5b?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast buffet", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Warung local Indonesian food", estimatedCost: "$8", cuisine: "Indonesian" },
                    { type: "Dinner", suggestion: "Ku De Ta beach club", estimatedCost: "$40", cuisine: "Fusion" }
                ],
                accommodation: { type: "4-star beachfront hotel", priceRange: "$80-120 per night", area: "Seminyak" }
            },
            {
                day: 2,
                title: "Ubud Cultural Experience",
                activities: [
                    {
                        name: "Tegallalang Rice Terraces",
                        description: "Walk through iconic terraced rice fields and swing over the valley",
                        duration: "2-3 hours",
                        cost: "$2",
                        location: "Tegallalang, Ubud",
                        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80"
                    },
                    {
                        name: "Sacred Monkey Forest",
                        description: "Visit ancient temple complex with wild monkeys in their natural habitat",
                        duration: "2 hours",
                        cost: "$5",
                        location: "Ubud",
                        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Cafe with rice field views", estimatedCost: "$12", cuisine: "Western" },
                    { type: "Lunch", suggestion: "Locavore or Sari Organik", estimatedCost: "$25", cuisine: "Farm-to-table" },
                    { type: "Dinner", suggestion: "Bebek Bengil (Dirty Duck)", estimatedCost: "$20", cuisine: "Balinese" }
                ],
                accommodation: { type: "Boutique villa with pool", priceRange: "$90-140 per night", area: "Ubud" }
            },
            {
                day: 3,
                title: "Water Temples & Waterfalls",
                activities: [
                    {
                        name: "Tirta Empul Temple",
                        description: "Experience sacred water purification ritual at this holy spring temple",
                        duration: "2 hours",
                        cost: "$3",
                        location: "Tampaksiring",
                        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80"
                    },
                    {
                        name: "Tegenungan Waterfall",
                        description: "Swimming and photography at this beautiful jungle waterfall",
                        duration: "2 hours",
                        cost: "$2",
                        location: "Gianyar",
                        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Villa breakfast", estimatedCost: "$10", cuisine: "International" },
                    { type: "Lunch", suggestion: "Local warung near waterfall", estimatedCost: "$8", cuisine: "Indonesian" },
                    { type: "Dinner", suggestion: "Ubud market food stalls", estimatedCost: "$10", cuisine: "Street food" }
                ],
                accommodation: { type: "Boutique villa with pool", priceRange: "$90-140 per night", area: "Ubud" }
            },
            {
                day: 4,
                title: "Mount Batur Sunrise Trek",
                activities: [
                    {
                        name: "Mount Batur Sunrise Trek",
                        description: "Early morning volcano hike with breakfast cooked by steam at the summit",
                        duration: "6 hours",
                        cost: "$35-50",
                        location: "Mount Batur",
                        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                    },
                    {
                        name: "Natural Hot Springs",
                        description: "Relax tired muscles in therapeutic volcanic hot springs",
                        duration: "2 hours",
                        cost: "$8",
                        location: "Toya Bungkah",
                        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Summit breakfast (included)", estimatedCost: "Included", cuisine: "Light meal" },
                    { type: "Lunch", suggestion: "Restaurant with volcano views", estimatedCost: "$15", cuisine: "Indonesian" },
                    { type: "Dinner", suggestion: "Ubud restaurant", estimatedCost: "$20", cuisine: "Asian fusion" }
                ],
                accommodation: { type: "Boutique villa with pool", priceRange: "$90-140 per night", area: "Ubud" }
            },
            {
                day: 5,
                title: "Beach Day in Nusa Dua",
                activities: [
                    {
                        name: "Nusa Dua Beach",
                        description: "Pristine white sand beach perfect for water sports and relaxation",
                        duration: "4 hours",
                        cost: "$30-60",
                        location: "Nusa Dua",
                        image: "https://images.unsplash.com/photo-1589726786531-1f60e74c44da?w=400&q=80"
                    },
                    {
                        name: "Water Blow",
                        description: "Natural rock formation where waves crash creating spectacular sprays",
                        duration: "1 hour",
                        cost: "Free",
                        location: "Nusa Dua",
                        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Beachfront seafood", estimatedCost: "$30", cuisine: "Seafood" },
                    { type: "Dinner", suggestion: "Jimbaran Bay BBQ", estimatedCost: "$35", cuisine: "Seafood" }
                ],
                accommodation: { type: "Beach resort", priceRange: "$100-150 per night", area: "Nusa Dua" }
            },
            {
                day: 6,
                title: "Uluwatu & Kecak Dance",
                activities: [
                    {
                        name: "Uluwatu Temple",
                        description: "Clifftop temple perched on dramatic cliffs with panoramic ocean views",
                        duration: "2 hours",
                        cost: "$5",
                        location: "Uluwatu",
                        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80"
                    },
                    {
                        name: "Kecak Fire Dance",
                        description: "Traditional Balinese trance dance at sunset with 70+ performers",
                        duration: "1.5 hours",
                        cost: "$7",
                        location: "Uluwatu Temple",
                        image: "https://images.unsplash.com/photo-1589726786531-1f60e74c44da?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Resort breakfast", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Single Fin cliff cafe", estimatedCost: "$20", cuisine: "Western" },
                    { type: "Dinner", suggestion: "Rock Bar Ayana", estimatedCost: "$50", cuisine: "Fine dining" }
                ],
                accommodation: { type: "Beach resort", priceRange: "$100-150 per night", area: "Uluwatu" }
            },
            {
                day: 7,
                title: "Departure & Shopping",
                activities: [
                    {
                        name: "Souvenir Shopping",
                        description: "Last-minute shopping for traditional crafts, batik, and Balinese art",
                        duration: "2-3 hours",
                        cost: "$50-100",
                        location: "Seminyak or Kuta",
                        image: "https://images.unsplash.com/photo-1441986380878-c4248f5b8b5b?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Airport restaurant", estimatedCost: "$15", cuisine: "Indonesian" }
                ],
                accommodation: { type: "Departure day", priceRange: "Check-out", area: "N/A" }
            }
        ],
        travelTips: [
            "Rent a scooter for easy transportation (international license required)",
            "Always dress modestly at temples - sarong and sash required",
            "Bargaining is expected at markets, start at 50% of asking price",
            "Stay hydrated and use high SPF sunscreen",
            "Book popular restaurants and activities in advance",
            "Carry small bills (IDR) for warungs and temple donations",
            "Be cautious of monkeys - don't carry loose items",
            "Try local warungs for authentic and affordable meals"
        ],
        localInfo: {
            currency: "Indonesian Rupiah (IDR) - $1 ≈ 15,000 IDR",
            language: "Indonesian & Balinese, English widely spoken in tourist areas",
            transport: "Scooter rental ($5/day), Grab/Gojek ride-sharing, private drivers ($40-60/day)",
            safety: "Very safe for tourists, watch belongings in crowded areas, roads can be chaotic"
        }
    },
    2: {
        destination: "Paris, France",
        destinationImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
        duration: 5,
        bestTime: "April to June, September to October",
        estimatedBudget: {
            total: "$3,000 - $5,000",
            perPerson: "$3,000 - $5,000",
            breakdown: {
                accommodation: "$800 - $1,500",
                food: "$400 - $600",
                transportation: "$100 - $150",
                activities: "$400 - $700"
            }
        },
        highlights: [
            {
                name: "Eiffel Tower",
                description: "Iconic iron lattice tower offering panoramic views of Paris",
                estimatedCost: "$30",
                image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80"
            },
            {
                name: "Louvre Museum",
                description: "World's largest art museum housing 35,000 works including the Mona Lisa",
                estimatedCost: "$20",
                image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80"
            },
            {
                name: "Notre-Dame Cathedral",
                description: "Gothic architectural masterpiece on Île de la Cité",
                estimatedCost: "Free (exterior)",
                image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80"
            }
        ],
        days: [
            {
                day: 1,
                title: "Arrival & Eiffel Tower",
                activities: [
                    {
                        name: "Eiffel Tower",
                        description: "Visit the iconic tower, book summit tickets in advance for best experience",
                        duration: "3 hours",
                        cost: "$30",
                        location: "Champ de Mars",
                        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80"
                    },
                    {
                        name: "Seine River Cruise",
                        description: "Evening boat cruise with illuminated monuments and dinner option",
                        duration: "1.5 hours",
                        cost: "$25",
                        location: "Port de la Bourdonnais",
                        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel continental breakfast", estimatedCost: "$20", cuisine: "French" },
                    { type: "Lunch", suggestion: "Café de l'Homme", estimatedCost: "$50", cuisine: "French" },
                    { type: "Dinner", suggestion: "Le Relais de l'Entrecôte", estimatedCost: "$40", cuisine: "French bistro" }
                ],
                accommodation: { type: "4-star boutique hotel", priceRange: "$180-250 per night", area: "7th Arrondissement" }
            },
            {
                day: 2,
                title: "Louvre & Le Marais",
                activities: [
                    {
                        name: "Louvre Museum",
                        description: "Explore world-famous art collection, see Mona Lisa and Venus de Milo",
                        duration: "4 hours",
                        cost: "$20",
                        location: "Rue de Rivoli",
                        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80"
                    },
                    {
                        name: "Le Marais Walking Tour",
                        description: "Explore historic Jewish quarter with trendy boutiques and galleries",
                        duration: "2 hours",
                        cost: "Free",
                        location: "Le Marais",
                        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Angelina hot chocolate", estimatedCost: "$25", cuisine: "French patisserie" },
                    { type: "Lunch", suggestion: "L'As du Fallafel", estimatedCost: "$15", cuisine: "Middle Eastern" },
                    { type: "Dinner", suggestion: "Chez Janou", estimatedCost: "$45", cuisine: "Provençal" }
                ],
                accommodation: { type: "4-star boutique hotel", priceRange: "$180-250 per night", area: "4th Arrondissement" }
            },
            {
                day: 3,
                title: "Versailles Palace Day Trip",
                activities: [
                    {
                        name: "Palace of Versailles",
                        description: "Tour opulent palace, Hall of Mirrors, and royal apartments",
                        duration: "5 hours",
                        cost: "$30",
                        location: "Versailles",
                        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80"
                    },
                    {
                        name: "Versailles Gardens",
                        description: "Stroll through magnificent French formal gardens and fountains",
                        duration: "2 hours",
                        cost: "Included",
                        location: "Versailles",
                        image: "https://images.unsplash.com/photo-1585159812596-fac104f2f069?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$20", cuisine: "French" },
                    { type: "Lunch", suggestion: "La Flottille in gardens", estimatedCost: "$35", cuisine: "French" },
                    { type: "Dinner", suggestion: "Le Comptoir du Relais", estimatedCost: "$50", cuisine: "French bistro" }
                ],
                accommodation: { type: "4-star boutique hotel", priceRange: "$180-250 per night", area: "6th Arrondissement" }
            },
            {
                day: 4,
                title: "Montmartre & Sacré-Cœur",
                activities: [
                    {
                        name: "Sacré-Cœur Basilica",
                        description: "Visit white-domed basilica with stunning panoramic city views",
                        duration: "2 hours",
                        cost: "Free (dome €6)",
                        location: "Montmartre",
                        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80"
                    },
                    {
                        name: "Montmartre Artists Quarter",
                        description: "Explore charming cobblestone streets and Place du Tertre",
                        duration: "2 hours",
                        cost: "Free",
                        location: "Montmartre",
                        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Le Consulat cafe", estimatedCost: "$18", cuisine: "French cafe" },
                    { type: "Lunch", suggestion: "La Maison Rose", estimatedCost: "$35", cuisine: "French" },
                    { type: "Dinner", suggestion: "Moulin Rouge show", estimatedCost: "$200", cuisine: "French gastronomy" }
                ],
                accommodation: { type: "4-star boutique hotel", priceRange: "$180-250 per night", area: "18th Arrondissement" }
            },
            {
                day: 5,
                title: "Latin Quarter & Departure",
                activities: [
                    {
                        name: "Notre-Dame Cathedral",
                        description: "Visit Gothic cathedral exterior and surrounding Île de la Cité",
                        duration: "1 hour",
                        cost: "Free",
                        location: "Île de la Cité",
                        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80"
                    },
                    {
                        name: "Latin Quarter Exploration",
                        description: "Wander through historic student quarter and bookshops",
                        duration: "2 hours",
                        cost: "Free",
                        location: "5th Arrondissement",
                        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80"
                    }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Café de Flore", estimatedCost: "$25", cuisine: "French cafe" },
                    { type: "Lunch", suggestion: "Shakespeare & Co Cafe", estimatedCost: "$20", cuisine: "Cafe" }
                ],
                accommodation: { type: "Departure day", priceRange: "Check-out", area: "N/A" }
            }
        ],
        travelTips: [
            "Buy Paris Museum Pass for skip-the-line access to 60+ attractions",
            "Use Metro and buses - buy multi-day passes for savings",
            "Learn basic French phrases (Bonjour, Merci, S'il vous plaît)",
            "Book popular restaurants 2-3 weeks in advance",
            "Beware of pickpockets, especially at tourist sites and Metro",
            "Tipping: 5-10% at restaurants (service included in bill)",
            "Many shops close on Sundays",
            "Free museum entry first Sunday of each month"
        ],
        localInfo: {
            currency: "Euro (EUR) - Major cards widely accepted",
            language: "French, English in tourist areas and hotels",
            transport: "Metro, RER trains, buses, Vélib bike-sharing, taxis",
            safety: "Generally safe, watch for pickpockets in crowded tourist areas"
        }
    },
    3: {
        destination: "Tokyo, Japan",
        destinationImage: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=1200&q=80",
        duration: 6,
        bestTime: "March to May, October to November",
        estimatedBudget: {
            total: "$2,500 - $4,000",
            perPerson: "$2,500 - $4,000",
            breakdown: {
                accommodation: "$600 - $1,200",
                food: "$300 - $500",
                transportation: "$150 - $300",
                activities: "$400 - $700"
            }
        },
        highlights: [
            { name: "Shibuya Crossing", description: "World-famous busy intersection with neon lights", estimatedCost: "Free", image: "https://images.unsplash.com/photo-1584120934312-3f9d12d0f7b1?w=600&q=80" },
            { name: "Senso-ji Temple", description: "Historic Buddhist temple in Asakusa district", estimatedCost: "Free", image: "https://images.unsplash.com/photo-1587049352856-2d5b31c09c56?w=600&q=80" },
            { name: "Tokyo Tower", description: "Iconic observation tower with panoramic city views", estimatedCost: "$10", image: "https://images.unsplash.com/photo-1586112202490-1eecf48c330c?w=600&q=80" }
        ],
        days: [
            {
                day: 1,
                title: "Arrival & Shibuya",
                activities: [
                    { name: "Shibuya Crossing", description: "Experience the bustling intersection and take photos", duration: "1-2 hours", cost: "Free", location: "Shibuya", image: "https://images.unsplash.com/photo-1584120934312-3f9d12d0f7b1?w=400&q=80" },
                    { name: "Hachiko Statue", description: "Famous statue of loyal dog Hachiko", duration: "30 min", cost: "Free", location: "Shibuya", image: "https://images.unsplash.com/photo-1600491199700-b44e0fbe68f3?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel buffet", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Ramen shop", estimatedCost: "$12", cuisine: "Japanese" },
                    { type: "Dinner", suggestion: "Sushi conveyor belt restaurant", estimatedCost: "$25", cuisine: "Japanese" }
                ],
                accommodation: { type: "3-star hotel", priceRange: "$80-150 per night", area: "Shibuya" }
            },
            {
                day: 2,
                title: "Asakusa & Ueno",
                activities: [
                    { name: "Senso-ji Temple", description: "Explore the historic temple and Nakamise street", duration: "2 hours", cost: "Free", location: "Asakusa", image: "https://images.unsplash.com/photo-1587049352856-2d5b31c09c56?w=400&q=80" },
                    { name: "Ueno Park", description: "Visit museums, shrines, and enjoy cherry blossoms", duration: "3 hours", cost: "Varies by museum", location: "Ueno", image: "https://images.unsplash.com/photo-1570839495156-1fbd1b0a4db5?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Cafe with Japanese pastries", estimatedCost: "$10", cuisine: "Japanese" },
                    { type: "Lunch", suggestion: "Tempura restaurant", estimatedCost: "$20", cuisine: "Japanese" },
                    { type: "Dinner", suggestion: "Izakaya local pub", estimatedCost: "$25", cuisine: "Japanese" }
                ],
                accommodation: { type: "3-star hotel", priceRange: "$80-150 per night", area: "Ueno" }
            },
            {
                day: 3,
                title: "Shinjuku & Harajuku",
                activities: [
                    { name: "Meiji Shrine", description: "Visit Shinto shrine in lush forested area", duration: "1.5 hours", cost: "Free", location: "Harajuku", image: "https://images.unsplash.com/photo-1561484935-c6b39b37f1fa?w=400&q=80" },
                    { name: "Takeshita Street", description: "Trendy street with shops, sweets, and cosplay fashion", duration: "2 hours", cost: "Varies", location: "Harajuku", image: "https://images.unsplash.com/photo-1599755567333-cf430b6cb9f0?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel buffet", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Crepes on Takeshita Street", estimatedCost: "$10", cuisine: "Japanese snack" },
                    { type: "Dinner", suggestion: "Okonomiyaki restaurant", estimatedCost: "$25", cuisine: "Japanese" }
                ],
                accommodation: { type: "3-star hotel", priceRange: "$80-150 per night", area: "Shinjuku" }
            },
            {
                day: 4,
                title: "Odaiba & Tokyo Bay",
                activities: [
                    { name: "TeamLab Borderless", description: "Interactive digital art museum", duration: "2-3 hours", cost: "$25", location: "Odaiba", image: "https://images.unsplash.com/photo-1589343851067-4c0f1c97e58c?w=400&q=80" },
                    { name: "Odaiba Seaside Park", description: "Relax and enjoy views of Rainbow Bridge", duration: "1-2 hours", cost: "Free", location: "Odaiba", image: "https://images.unsplash.com/photo-1598300053578-f2db04f7d210?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel buffet", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Ramen or sushi in Odaiba mall", estimatedCost: "$20", cuisine: "Japanese" },
                    { type: "Dinner", suggestion: "Bay-view restaurant", estimatedCost: "$35", cuisine: "Japanese fusion" }
                ],
                accommodation: { type: "3-star hotel", priceRange: "$80-150 per night", area: "Odaiba" }
            },
            {
                day: 5,
                title: "Day Trip to Nikko",
                activities: [
                    { name: "Toshogu Shrine", description: "Visit ornate shrine complex in the mountains", duration: "3 hours", cost: "$10", location: "Nikko", image: "https://images.unsplash.com/photo-1576112816582-45f25fc2a8a6?w=400&q=80" },
                    { name: "Kegon Falls", description: "Photogenic waterfall in Nikko National Park", duration: "2 hours", cost: "$5", location: "Nikko", image: "https://images.unsplash.com/photo-1601117122753-98eeb7f67de4?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Local soba restaurant", estimatedCost: "$15", cuisine: "Japanese" },
                    { type: "Dinner", suggestion: "Return to Tokyo for dinner", estimatedCost: "$25", cuisine: "Japanese" }
                ],
                accommodation: { type: "3-star hotel", priceRange: "$80-150 per night", area: "Tokyo" }
            },
            {
                day: 6,
                title: "Shopping & Departure",
                activities: [
                    { name: "Ginza Shopping", description: "Luxury shopping and souvenirs", duration: "2-3 hours", cost: "Varies", location: "Ginza", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel buffet", estimatedCost: "$15", cuisine: "International" },
                    { type: "Lunch", suggestion: "Sushi or ramen in Ginza", estimatedCost: "$25", cuisine: "Japanese" }
                ],
                accommodation: { type: "Departure day", priceRange: "Check-out", area: "N/A" }
            }
        ],
        travelTips: [
            "Get a Suica or Pasmo card for easy train/bus travel",
            "Reserve sushi and ramen spots ahead of time",
            "Use luggage delivery services for day trips",
            "Respect temple etiquette and bow when entering shrines",
            "Learn basic Japanese phrases (Arigato, Sumimasen)",
            "Cherry blossom season is crowded, book hotels early"
        ],
        localInfo: {
            currency: "Japanese Yen (JPY) - $1 ≈ 150 JPY",
            language: "Japanese, English widely spoken in tourist areas",
            transport: "Trains, subways, buses; Japan Rail Pass for intercity travel",
            safety: "Very safe, but always follow pedestrian rules and etiquette"
        }
    },
    4: {
        destination: "Santorini, Greece",
        destinationImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
        duration: 5,
        bestTime: "April to October",
        estimatedBudget: {
            total: "$2,000 - $3,500",
            perPerson: "$2,000 - $3,500",
            breakdown: {
                accommodation: "$600 - $1,200",
                food: "$250 - $400",
                transportation: "$100 - $200",
                activities: "$300 - $500"
            }
        },
        highlights: [
            { name: "Oia Sunset", description: "Famous cliffside sunset views in Oia village", estimatedCost: "Free", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
            { name: "Fira Town", description: "Explore capital town with shops, restaurants, and views of the caldera", estimatedCost: "Free", image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80" },
            { name: "Red Beach", description: "Unique red sand beach ideal for swimming and photography", estimatedCost: "Free", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" }
        ],
        days: [
            {
                day: 1,
                title: "Arrival & Fira",
                activities: [
                    { name: "Fira Town Walk", description: "Explore shops, cafes, and caldera views", duration: "2-3 hours", cost: "Free", location: "Fira", image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$15", cuisine: "Mediterranean" },
                    { type: "Lunch", suggestion: "Local taverna", estimatedCost: "$20", cuisine: "Greek" },
                    { type: "Dinner", suggestion: "Cliffside restaurant with sunset view", estimatedCost: "$35", cuisine: "Greek fusion" }
                ],
                accommodation: { type: "3-star cliffside hotel", priceRange: "$100-180 per night", area: "Fira" }
            },
            {
                day: 2,
                title: "Oia & Sunset",
                activities: [
                    { name: "Oia Village", description: "Explore narrow streets and iconic white-blue buildings", duration: "3 hours", cost: "Free", location: "Oia", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
                    { name: "Oia Sunset", description: "Watch the breathtaking sunset over the caldera", duration: "1 hour", cost: "Free", location: "Oia", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$15", cuisine: "Mediterranean" },
                    { type: "Lunch", suggestion: "Cafe in Oia", estimatedCost: "$20", cuisine: "Greek" },
                    { type: "Dinner", suggestion: "Fine dining in Oia", estimatedCost: "$50", cuisine: "Greek fusion" }
                ],
                accommodation: { type: "3-star cliffside hotel", priceRange: "$100-180 per night", area: "Oia" }
            },
            {
                day: 3,
                title: "Beaches & Ancient Ruins",
                activities: [
                    { name: "Red Beach", description: "Relax and swim at unique red sand beach", duration: "2 hours", cost: "Free", location: "Akrotiri", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
                    { name: "Ancient Thera", description: "Visit ruins of ancient city with panoramic views", duration: "2 hours", cost: "$5", location: "Kamari", image: "https://images.unsplash.com/photo-1561295203-13f83246f99b?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$15", cuisine: "Mediterranean" },
                    { type: "Lunch", suggestion: "Seaside taverna", estimatedCost: "$20", cuisine: "Greek" },
                    { type: "Dinner", suggestion: "Fira caldera view restaurant", estimatedCost: "$35", cuisine: "Greek" }
                ],
                accommodation: { type: "3-star cliffside hotel", priceRange: "$100-180 per night", area: "Fira" }
            },
            {
                day: 4,
                title: "Santorini Wine & Villages",
                activities: [
                    { name: "Wine Tasting Tour", description: "Visit local wineries and taste famous Santorini wines", duration: "3 hours", cost: "$40", location: "Pyrgos / Megalochori", image: "https://images.unsplash.com/photo-1586099946351-1cb8c78b8f54?w=400&q=80" },
                    { name: "Explore Pyrgos Village", description: "Traditional village with beautiful views and architecture", duration: "2 hours", cost: "Free", location: "Pyrgos", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$15", cuisine: "Mediterranean" },
                    { type: "Lunch", suggestion: "Village taverna", estimatedCost: "$20", cuisine: "Greek" },
                    { type: "Dinner", suggestion: "Oia cliffside dinner", estimatedCost: "$50", cuisine: "Greek fusion" }
                ],
                accommodation: { type: "3-star cliffside hotel", priceRange: "$100-180 per night", area: "Oia" }
            },
            {
                day: 5,
                title: "Departure & Last Views",
                activities: [
                    { name: "Souvenir Shopping", description: "Pick up local crafts, olive oil, and jewelry", duration: "2 hours", cost: "$30", location: "Fira", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" }
                ],
                meals: [
                    { type: "Breakfast", suggestion: "Hotel breakfast", estimatedCost: "$15", cuisine: "Mediterranean" },
                    { type: "Lunch", suggestion: "Cafe near caldera", estimatedCost: "$20", cuisine: "Greek" }
                ],
                accommodation: { type: "Departure day", priceRange: "Check-out", area: "N/A" }
            }
        ],
        travelTips: [
            "Book hotels and sunset spots early, especially in high season",
            "Wear comfortable shoes for cobblestone streets",
            "Use local buses or rent ATVs for island transport",
            "Carry sunscreen and hat for daytime tours",
            "Respect local customs in churches and villages"
        ],
        localInfo: {
            currency: "Euro (EUR) - Cards widely accepted",
            language: "Greek, English spoken in tourist areas",
            transport: "Buses, ferries, taxis, ATV rentals",
            safety: "Very safe, watch cliff edges and strong sun exposure"
        }
    }
};

export const suggestedTrips: SuggestedTrip[] = [
    {
        id: 1,
        destination: "Bali, Indonesia",
        duration: "7 Days",
        budget: "Moderate",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        highlights: ["Beaches", "Temples", "Rice Terraces"]
    },
    {
        id: 2,
        destination: "Paris, France",
        duration: "5 Days",
        budget: "Luxury",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        highlights: ["Eiffel Tower", "Louvre", "Cuisine"]
    },
    {
        id: 3,
        destination: "Tokyo, Japan",
        duration: "6 Days",
        budget: "Moderate",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        highlights: ["Culture", "Food", "Technology"]
    },
    {
        id: 4,
        destination: "Santorini, Greece",
        duration: "5 Days",
        budget: "Luxury",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
        highlights: ["Sunsets", "Islands", "History"]
    }
];