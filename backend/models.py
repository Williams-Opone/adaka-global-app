
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db



# 1. ADMIN USER: For secure login
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
    # Ensure this is using werkzeug.security
        return check_password_hash(self.password_hash, password)

# 2. CONTACT INQUIRY: Stores client leads
class ContactInquiry(db.Model):
    __tablename__ = 'contact_inquiries'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100))
    phone_number = db.Column(db.String(20), nullable=True)
    inquiry_type = db.Column(db.String(50))
    message = db.Column(db.Text, nullable=False)
    equipment_categories = db.Column(db.String(255)) # MAKE SURE THIS LINE EXISTS
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Asset(db.Model):
    __tablename__ = 'assets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), default="Available")
    location = db.Column(db.String(100))
    price = db.Column(db.Float, default=0.0)
    # Keeping image_url here for the "Hero/Thumbnail" is fine as a cache
    image_url = db.Column(db.String(500)) 
    specifications = db.Column(JSON) 
    description = db.Column(db.Text)
    
    # RELATIONSHIP: This links Asset to AssetImage
    images = db.relationship('AssetImage', backref='asset', lazy=True, cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "location": self.location,
            "price": self.price,
            "description": self.description,
            "status": self.status,
            "image_url": self.image_url, 
            # Match the field name 'image_url' from the AssetImage model
            "images": [img.image_url for img in self.images]
        }
    
class AssetImage(db.Model):
    __tablename__ = 'asset_images'
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey('assets.id'), nullable=False)
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url, # The frontend uses this for the card
            "gallery": [img.image_url for img in self.images] # The detail page uses this
        }
    
class NewsletterSubscriber(db.Model):
    __tablename__ = 'newsletter_subscribers'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    subscribed_at = db.Column(db.DateTime, default=datetime.utcnow)