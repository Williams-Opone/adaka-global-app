# In backend/routes/newsletter.py
from flask import Blueprint, request, jsonify
from extensions import db
from models import NewsletterSubscriber

newsletter_bp = Blueprint('newsletter_bp', __name__)

@newsletter_bp.route('/api/newsletter', methods=['POST'])
def subscribe():
    
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'message': 'Email is required'}), 400
        
    if NewsletterSubscriber.query.filter_by(email=email).first():
        return jsonify({'message': 'Already subscribed!'}), 409
        
    new_sub = NewsletterSubscriber(email=email)
    db.session.add(new_sub)
    db.session.commit()
    
    return jsonify({'message': 'Successfully subscribed!'}), 201