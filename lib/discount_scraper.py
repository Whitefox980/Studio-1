# Scraper za akcije (Maxi/Idea/DIS)
async def scrape_discounts():
    stores = {
        "maxi": "https://www.maxi.rs/akcije",
        "idea": "https://www.idea.rs/aktuelne-akcije",
        "dis": "https://dis.rs/akcije"
    }
    # Koristi BeautifulSoup ili ScrapingBee
    return {store: await scrape(link) for store, link in stores.items()}