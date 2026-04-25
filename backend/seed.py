from app import app, db
from models import Asset

def seed_data():
    with app.app_context():
        # Clear existing data
        Asset.query.delete()
        
        # Add a dummy asset
        sample_asset = Asset(
            name="CAT 320D EXCAVATOR",
            category="equipment",
            status="Available",
            location="Lagos, NG",
            price=45000.0,
            image_url="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000",
            specifications={"hp": "268", "weight": "22 tons"},
            description="High-performance excavator suitable for heavy construction."
        )
        
        db.session.add(sample_asset)
        db.session.commit()
        print("Database seeded with sample data!")

if __name__ == "__main__":
    seed_data()