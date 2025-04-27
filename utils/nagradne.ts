interface OpenDayEvent {
  name: string;
  date: string;
  location: string;
  category: 'fakultet'|'ambasada'|'muzej';
}

// Ručno uneti podaci (kasnije API)
const events: OpenDayEvent[] = [
  {
    name: "Dan otvorenih vrata ETF-a",
    date: "2024-10-15",
    location: "Beograd",
    category: "fakultet"
  }
];

// utils/nagradne.ts
export const getNagradneIgre = (filter: string, kategorija?: string) => {
  return db.nagradne.findMany({
    where: { 
      status: filter,
      kategorija: kategorija || undefined 
    }
  });
};