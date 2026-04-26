import { Equipment } from "@/types/inventory";

// If process.env.NEXT_PUBLIC_API_URL is missing, default to localhost for local testing
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export async function getEquipment(): Promise<Equipment[]> {
  const res = await fetch(`${API_BASE_URL}/api/equipment`, {
    next: { revalidate: 60 } 
  });
  
  if (!res.ok) {
    // Adding the status code helps you debug if it fails on the server
    throw new Error(`Failed to fetch equipment: ${res.statusText}`);
  }
  
  return res.json();
}