// Konfiguracija za Upstash Redis
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

interface CacheResult {
  result: string | null;
}

export const cache = {
  get: async (key: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `${UPSTASH_REDIS_REST_URL}/get/${encodeURIComponent(key)}`,
        {
          headers: {
            Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`
          },
          next: { revalidate: 60 } // ISR cache
        }
      );
      
      const data: CacheResult = await response.json();
      return data.result;
    } catch (error) {
      console.error('Upstash GET error:', error);
      return null;
    }
  },

  set: async (key: string, value: string, ttlSeconds?: number): Promise<void> => {
    try {
      const url = ttlSeconds 
        ? `${UPSTASH_REDIS_REST_URL}/setex/${encodeURIComponent(key)}/${ttlSeconds}`
        : `${UPSTASH_REDIS_REST_URL}/set/${encodeURIComponent(key)}`;
      
      await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
          'Content-Type': 'application/json'
        },\
        body: JSON.stringify(value)
      });
    } catch (error) {
      console.error('Upstash SET error:', error);
    }
  }
};