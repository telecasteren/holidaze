export const getFormData = (data: FormData) => {
  const name = data.get("venue-name") as string;
  const description = data.get("venue-desc") as string;

  const mediaUrls = data.getAll("venue-media") as string[];
  const media = mediaUrls.filter(Boolean).map((url) => ({ url, alt: name }))

  const maxGuests = Number(data.get("venue-guests"));
  const price = Number(data.get("venue-price"));

  const meta = {
    wifi: data.get("venue-wifi") === "wifi",
    pets: data.get("venue-pets") === "pets",
    parking: data.get("venue-parking") === "parking",
    breakfast: data.get("venue-breakfast") === "breakfast",
  }

  const rawLat = (data.get("venue-lat") as string) || 0;
  const rawLong = (data.get("venue-long") as string) || 0;

  const location = {
    address: (data.get("venue-address") as string) || null,
    zip: (data.get("venue-zip") as string) || null,
    city: (data.get("venue-city") as string) || null,
    country: (data.get("venue-country") as string) || null,
    continent: (data.get("venue-continent") as string) || null,
    lat: rawLat ? Number(rawLat) : 0,
    lng: rawLong ? Number(rawLong) : 0,
  }
  return {name, description, media, maxGuests, price, meta, location,}
}
