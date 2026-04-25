export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  location: string;
  price: string;
  description: string;
  status: string;
  year?: string;
  equipment_class?: string;
  image_url: string;   // Add this
  images: string[];    // Add this (array of strings)
}
// Add this line so your api.ts can find "Equipment"
export type Equipment = InventoryItem;