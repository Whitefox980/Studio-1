# lib/agriculture.py
def get_planting_advice(plant: str, region: str) -> str:
    """
    Povratni format:
    {
        "optimal_season": "proleće",
        "common_pests": ["plamenjača", "vaš"],
        "watering_frequency": "3x nedeljno"
    }
    """
    # Integracija sa OpenWeatherMap API
    weather = get_weather_data(region)
    
    return gemini.generate(f"""
    Daj savet za gajenje {plant} u {region}. 
    Trenutna vremenska prognoza: {weather}.
    Koristi isključivo podatke iz baze Poljoprivrednog fakulteta.
    """)