// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.adakaglobalinc.com";

  // 1. Define your static routes
  const staticRoutes = [
    "",
    "/about",
    "/inventory",
    "/contact",
    "/services",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === "" ? 1 : 0.8, // Home page is priority 1
  }));

  // 2. Fetch dynamic inventory routes from your Railway Backend
  let inventoryRoutes: any[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory/all`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const assets = await response.json();

    inventoryRoutes = assets.map((asset: any) => ({
      url: `${baseUrl}/inventory/${asset.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap fetch failed:", error);
  }

  return [...staticRoutes, ...inventoryRoutes];
}