// app/inventory/[id]/page.tsx
import AssetDetails from "@/components/features/AssetDetails";

// 1. Dynamic SEO (Server Side)
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory/${id}`);
  const asset = await res.json();

  return {
    title: `${asset.name} | ADAKA GLOBAL`,
    description: asset.description?.substring(0, 160),
    openGraph: {
      images: [asset.image_url],
    },
  };
}

// 2. The Page Component (Server Side)
export default async function InventoryItemPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // Fetch data on the server
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory/${id}`, {
    next: { revalidate: 60 } // Optional: Cache for 60 seconds
  });
  
  if (!res.ok) return <div>Asset not found</div>;
  
  const asset = await res.json();

  // Pass the data to the Client Component for display
  return <AssetDetails asset={asset} />;
}