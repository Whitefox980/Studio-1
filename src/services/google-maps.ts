/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents information about a place.
 */
export interface Place {
  /**
   * The name of the place.
   */
  name: string;
  /**
   * The address of the place.
   */
  address: string;
  /**
   * The location of the place.
   */
  location: Location;
  /**
   * The rating of the place.
   */
  rating?: number;
  /**
   * The URL of an image of the place.
   */
  imageUrl?: string;
}

/**
 * Asynchronously retrieves a list of places near a given location using the Google Maps API.
 *
 * @param location The location to search near.
 * @param query The query to use when searching for places.
 * @returns A promise that resolves to an array of Place objects.
 */
export async function getPlacesNear(location: Location, query: string): Promise<Place[]> {
  // TODO: Implement this by calling the Google Maps API.

  return [
    {
      name: 'Stubbed Place',
      address: '123 Main St',
      location: { lat: 0, lng: 0 },
      rating: 4.5,
      imageUrl: 'https://example.com/image.jpg'
    }
  ];
}
