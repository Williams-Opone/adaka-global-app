import os
import sys
import cloudinary
import cloudinary.uploader
from flask import Blueprint, jsonify, request
from sqlalchemy.dialects.postgresql import JSON
from models import db, Asset ,AssetImage,NewsletterSubscriber
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from .utils import send_newsletter_blast

inventory_bp = Blueprint('inventory_bp', __name__)

# Configure Cloudinary (Add these to your .env!)
cloudinary.config(
  cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
  api_key = os.getenv('CLOUDINARY_API_KEY'),
  api_secret = os.getenv('CLOUDINARY_API_SECRET')
)

@inventory_bp.route('/api/inventory/all', methods=['GET'])
def get_all_assets():
    assets = Asset.query.all()
    # Using list comprehension to convert to dict
    return jsonify([asset.to_dict() for asset in assets]), 200

@inventory_bp.route('/api/inventory/add', methods=['POST'])
def add_asset():
    # 1. Capture data from the form
    name = request.form.get('name')
    category = request.form.get('category')
    location = request.form.get('location')
    price = request.form.get('price', 0.0)
    description = request.form.get('description', '')

    # 2. Create the Asset
    new_asset = Asset(
        name=name,
        category=category,
        location=location,
        price=float(price),
        description=description
    )
    db.session.add(new_asset)
    db.session.commit() # Commit to get the ID

    # 3. Handle Images
    # In routes/inventory.py, inside the image loop:
    if 'images' in request.files:
        files = request.files.getlist('images')
        
        # Filter out empty entries (sometimes browsers send an empty file if none selected)
        files = [f for f in files if f.filename != '']
        
        for index, file in enumerate(files):
            upload = cloudinary.uploader.upload(file)
            url = upload.get('secure_url')
            
            # Always set the first image as the primary hero image
            if index == 0:
                new_asset.image_url = url
            
            # Add to gallery
            img = AssetImage(image_url=url, asset_id=new_asset.id)
            db.session.add(img)
        
        db.session.commit()
        subscribers = NewsletterSubscriber.query.all()
        if subscribers:
            try:
                # We use threading again so the admin doesn't have to wait 
                # for 50 emails to send before the success message appears
                from threading import Thread
                from flask import current_app
                
                thr = Thread(target=send_newsletter_blast, args=[subscribers, name])
                thr.start()
            except Exception as e:
                print(f"Blast failed: {e}")

    return jsonify({'message': 'Asset and Gallery created successfully'}), 201

@inventory_bp.route('/api/inventory/<int:id>', methods=['GET'])
def get_asset(id):
    asset = Asset.query.get_or_404(id)
    return jsonify(asset.to_dict()), 200

@inventory_bp.route('/api/inventory/edit/<int:id>', methods=['PUT'])
def edit_asset(id):
    asset = Asset.query.get_or_404(id)
    data = request.get_json()
    
    asset.name = data.get('name', asset.name)
    asset.category = data.get('category', asset.category)
    asset.location = data.get('location', asset.location)
    asset.price = float(data.get('price', asset.price))
    asset.description = data.get('description', asset.description)
    
    db.session.commit()
    return jsonify({'message': 'Asset updated successfully'}), 200

@inventory_bp.route('/api/inventory/delete/<int:id>', methods=['DELETE'])
def delete_asset(id):
    asset = Asset.query.get_or_404(id)
    db.session.delete(asset)
    db.session.commit()
    return jsonify({'message': 'Asset deleted successfully'}), 200