# **App Name**: GdeKako AI

## Core Features:

- Agent Selector: Displays a list of AI agents with their image, name and specialization, allowing the user to select one for their search.
- Search Bar: Provides a search bar with autocomplete functionality to help users quickly enter their search queries.
- Search Results Display: Uses the selected AI agent and the Tavily API to search for relevant information and display the results in a TripAdvisor-style card format. Each card includes images, ratings, and prices when available.
- AI-Powered Information Extraction: Leverages Gemini Flash 2.0 to analyze search queries and web results, extracting key information to provide accurate and useful responses in Serbian.
- User Interaction Tracking: Allows users to save their favorite search results and provide feedback on the performance and relevance of each AI agent.

## Style Guidelines:

- Primary color: Light gray (#F5F5F5) for a clean background.
- Secondary color: White (#FFFFFF) for content containers.
- Accent: Teal (#008080) for interactive elements and highlights.
- Clean and readable sans-serif fonts for headings and body text.
- Simple and modern icons for navigation and actions.
- Grid-based layout for consistent and responsive design.
- Subtle animations for transitions and user feedback.

## Original User Request:
# Kompletan Firebase + Genkit + Gemini Flash 2.0 Sistem za gde-kako.rs

## 🌟 Arhitektura Rešenja

### 1. Frontend (Next.js na Vercel)
```tsx
// app/page.tsx - Glavni interfejs
export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Sidebar sa agentima */}
      <AgentSelector onSelectAgent={setSelectedAgent} />
      
      {/* Glavni sadržaj */}
      <div className="col-span-3">
        <SearchBar onSearch={setSearchQuery} />
        {selectedAgent && <AgentProfile agent={selectedAgent} />}
        <SearchResults query={searchQuery} agent={selectedAgent} />
      </div>
    </div>
  );
}
```

### 2. Backend (Firebase Functions + Genkit)
```typescript
// functions/src/index.ts - Glavni endpoint
import * as functions from 'firebase-functions';
import { initializeGenkit } from '@genkit-ai/firebase';
import { defineFlow } from '@genkit-ai/core';

initializeGenkit({
  projectId: process.env.GCLOUD_PROJECT,
  location: "europe-central2",
});

export const searchFlow = defineFlow({
  name: "gdekakoSearch",
  inputSchema: z.object({
    query: z.string(),
    agentType: z.enum(["realEstate", "travel", "cooking", "tech", "health", "ev"])
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      description: z.string(),
      imageUrl: z.string().optional(),
      rating: z.number().optional(),
      price: z.string().optional(),
      location: z.string().optional()
    })),
    agent: z.object({
      name: z.string(),
      specialty: z.string(),
      avatar: z.string()
    })
  }),
  async run({query, agentType}) {
    // 1. Proveri Redis cache
    const cached = await checkCache(query);
    if (cached) return cached;

    // 2. Pozovi odgovarajućeg agenta
    const agent = getAgent(agentType);
    const results = await agent.search(query);

    // 3. Sačuvaj u cache
    await cacheResults(query, results);
    
    return { results, agent };
  }
});

exports.api = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  return searchFlow(data);
});
```

## 🧠 AI Agent Sistemi

### Primer Agent za Nekretnine
```typescript
// functions/src/agents/realEstateAgent.ts
export const realEstateAgent = {
  name: "Milan Prokić",
  specialty: "Stručnjak za nekretnine",
  avatar: "https://example.com/agents/milan.jpg",
  
  async search(query: string) {
    // 1. Tavily API za web pretragu
    const webResults = await tavilySearch(query, {
      include_raw_content: true,
      search_depth: "advanced"
    });

    // 2. Obrada sa Gemini Flash 2.0
    const prompt = `
      Korisnik traži: ${query}
      Analiziraj sledeće rezultate i ekstrahuj ključne informacije o nekretninama:
      ${webResults.results.map(r => r.content).join('\n')}
      
      Formatiraj odgovor kao listu sa:
      - Naslovom oglasa
      - Lokacijom
      - Kvadraturom
      - Cenom
      - Linkom ka oglasu
    `;

    const response = await generativeModel({
      model: "gemini-flash-2.0",
      prompt: prompt
    });

    return parseResults(response.text());
  }
};
```

## 🔥 Redis Keširanje
```typescript
// functions/src/cache.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});

export async function checkCache(query: string) {
  const cached = await redisClient.get(`search:${query}`);
  return cached ? JSON.parse(cached) : null;
}

export async function cacheResults(query: string, results: any) {
  await redisClient.setEx(
    `search:${query}`,
    3600, // 1 sat cache
    JSON.stringify(results)
  );
}
```

## 🎨 UI Komponente

### Agent Selector
```tsx
// components/AgentSelector.tsx
const AGENTS = [
  {
    id: "realEstate",
    name: "Milan Prokić",
    specialty: "Stručnjak za nekretnine",
    avatar: "/agents/milan.jpg"
  },
  {
    id: "travel",
    name: "Ana Putnik",
    specialty: "Putnički savetnik", 
    avatar: "/agents/ana.jpg"
  },
  // ...ostali agenti
];

export function AgentSelector({ onSelectAgent }: { onSelectAgent: (agent: Agent) => void }) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold">Izaberite agenta:</h3>
      {AGENTS.map(agent => (
        <div 
          key={agent.id}
          onClick={() => onSelectAgent(agent)}
          className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full" />
          <div>
            <h4 className="font-medium">{agent.name}</h4>
            <p className="text-sm text-gray-600">{agent.specialty}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 🚀 Deployment

### Firebase Setup
```bash
firebase init
# Izaberi: Functions, Firestore, Hosting
# Node.js 20
# TypeScript
```

### Vercel Deployment
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add TAVILY_API_KEY
vercel --prod
```

## 📊 Optimizacije

1. **Dinamičko učitavanje agenata**:
```tsx
// Učitavanje samo potrebnih agenta
const RealEstateAgent = dynamic(() => import('../agents/RealEstateAgent'), {
  loading: () => <Skeleton />
});
```

2. **ISR za česte upite**:
```tsx
// app/pretraga/[query]/page.tsx
export async function generateStaticParams() {
  return ['kako-otvoriti-firmu', 'gde-napuniti-auto'].map(query => ({ query }));
}

export const revalidate = 3600; // 1 sat
```

3. **Analitika korisničkih interakcija**:
```typescript
// functions/src/analytics.ts
export const logSearch = functions.firestore
  .document('searches/{searchId}')
  .onCreate(async (snap, context) => {
    const searchData = snap.data();
    await analytics.logEvent('search_triggered', {
      query: searchData.query,
      agent: searchData.agent,
      user_id: searchData.userId
    });
  });
```

## 💡 Dodatne Funkcionalnosti

1. **Personalizovane preporuke**:
```typescript
// functions/src/recommendations.ts
export const getRecommendations = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;
  if (!userId) throw new Error('Not authenticated');
  
  const userSearches = await db.collection('searches')
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(10)
    .get();
  
  // Analiza istorije sa Gemini
  const prompt = `Korisnik je pretraživao: ${userSearches.docs.map(d => d.data().query).join(', ')}. 
    Šta bi moglo biti korisno za preporučiti?`;
  
  const response = await model.generateContent(prompt);
  return response.text();
});
```

2. **Grupni chat sa agentima**:
```typescript
// functions/src/groupChat.ts
export const groupChatFlow = defineFlow({
  name: "groupChat",
  async run(queries: string[]) {
    const agents = selectAgentsForQueries(queries);
    const responses = await Promise.all(
      agents.map(agent => agent.process(queries))
    );
    
    return {
      summary: await generateSummary(responses),
      details: responses
    };
  }
});
```

Ovo rešenje kombinuje:
- Brzinu Firebase-a i Vercela
- Snagu Gemini Flash 2.0 za analizu
- Tavily za sveobuhvatnu pretragu
- Redis za ultra-brzo keširanje
- Personalizovane AI agente za svaku kategoriju# **Konačni Optimizovani Prompt za gde-kako.rs AI Sistem**

## **🔥 Kompletan Tehnički Spec + Biznis Logika**  
_"Kreiraj krajnje optimizovanu Next.js + Firebase + Gemini Flash 2.0 aplikaciju za **gde-kako.rs** sa sledećim karakteristikama:"_

### **🌐 Frontend (Next.js 14)**
1. **Interaktivni Dashboard**  
   - Leva traka: **Lista AI agenata** (slika + ime + specijalizacija)  
   - Glavni deo:  
     - Search bar sa autocomplete-om  
     - Rezultati u **TripAdvisor-style kartama** (slike, ocene, cene)  
     - Toggle za **mapu/listu** (integrirati Google Maps)  

2. **Korisnički Profil**  
   - Istorija pretraga  
   - Omiljeni rezultati (❤️)  
   - Feedback forma za ocenjivanje agenata  

```tsx
// Komponenta za prikaz rezultata
<ResultCard 
  title={result.title}
  rating={result.rating}
  image={result.imageUrl}
  onSave={() => addToFavorites(result.id)}
  onFeedback={(rating) => submitRating(result.id, rating)}
/>
```

### **🔙 Backend (Firebase)**
1. **Firebase Functions**  
   - Node.js 20  
   - Genkit za AI flow-ove  
   - Redis caching za česte upite  

2. **Agent Sistem**  
   - Svaki agent ima:  
     - **Unikatan ID** (npr. `agent_nekretnine`)  
     - **Gemini prompt template** prilagođen tematici  
     - **Tavily search parametre** (npr. prioritet lokalnih sajtova za Srbiju)  

```typescript
// Primer zdravstvenog agenta
const healthAgent = {
  id: "agent_zdravlje",
  name: "Dr. Jelena Petrović",
  promptTemplate: `
    Korisnik traži: {{QUERY}}
    Odgovori na srpskom sa:
    1. Kratak odgovor (max 2 rečenice)
    2. Lista preporučenih ustanova u Srbiji
    3. Kontakt telefoni (ako su dostupni)
    Koristi isključivo proverene medicinske izvore.
  `,
  tavilyParams: {
    include_sites: ["zdravlje.gov.rs", "b92.net/zdravlje"]
  }
};
```

### **🤖 AI Integracije**
1. **Gemini Flash 2.0**  
   - Konfigurisati za **srpski jezik**  
   - Safety settings: `harassment: BLOCK_MEDIUM_AND_ABOVE`  

2. **Tavily API**  
   - Fokus na **.rs domene** i lokalne izvore  
   - `search_depth: "advanced"` za kompleksnije upite  

3. **Redis Caching**  
   - Keširaj rezultate po:  
     - Lokaciji korisnika (Beograd vs. Novi Sad)  
     - Vremenskom periodu (npr. cene goriva - ažurno svakog dana)  

```typescript
// Firebase Function za pretragu
exports.search = functions
  .runWith({ memory: "1GB", timeoutSeconds: 60 })
  .https.onCall(async (data, context) => {
    // 1. Provera cache-a
    // 2. Poziv odgovarajućeg agenta
    // 3. Snimanje u Firestore za analitiku
  });
```

### **📊 Biznis Logika**
1. **Monetizacija**  
   - **Označeni rezultati** (npr. "Preporučeni partner")  
   - Premium pretplate za **napredne filtere**  

2. **SEO Optimizacija**  
   - Generisanje **JSON-LD** za Google snippet-e  
   - Dinamički meta tagovi za svaku pretragu  

```javascript
// next.config.js - OpenGraph optimizacija
module.exports = {
  async headers() {
    return [
      {
        source: '/pretraga/:query',
        headers: [
          {
            key: 'og:title',
            value: 'gde-kako.rs - Najbolji odgovori za :query'
          }
        ]
      }
    ]
  }
}
```

### **🔒 Sigurnosne Mere**
1. **App Check** za Firebase  
2. **Rate Limiting** (do 5 upita/min po korisniku)  
3. **Moderacija sadržaja** (automatska + manualna)  

```typescript
// Firebase Security Rules
match /searches/{searchId} {
  allow read, write: if request.auth != null && 
    request.auth.token.email_verified == true;
}
```

## **🚀 Deployment Workflow**
1. **Razvoj**  
   ```bash
   vercel dev  # Lokalni development
   ```

2. **Testiranje**  
   ```bash
   firebase emulators:start  # Testiranje funkcija
   ```

3. **Produkcija**  
   ```bash
   vercel --prod && firebase deploy
   ```

---

**🎯 Konačni Cilj:**  
_"Aplikacija koja korisnicima u Srbiji daje **najtačnije, najbrže i najkorisnije odgovore** uz pomoć personalizovanih AI agenata, sa fokusom na lokalne resurse i proverene informacije."_

Da li želiš da naglasimo neki specifični deo pre implementacije? (npr. detaljnije o mapi, integraciji sa eUpravom, itd.)
  