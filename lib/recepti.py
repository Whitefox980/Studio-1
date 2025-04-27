# lib/recepti.py
def generisi_recept(namirnice: list, vreme: str, budzet: str) -> dict:
    prompt = f"Recept sa {', '.join(namirnice)} za {budzet} ({vreme}):"
    return gemini.generate(prompt)