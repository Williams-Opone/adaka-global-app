
from flask import Blueprint, jsonify, request,current_app
from flask_mail import  Message
from threading import Thread
from extensions import mail
from models import db, ContactInquiry


leads_bp = Blueprint('leads_bp', __name__)



from flask_mail import Message

def send_appreciation_email(data):
    # Using HTML format for a premium look
    html_body = f"""
    <div style="font-family: 'Helvetica', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0D1821;">
        <div style="background-color: #0D1821; padding: 30px; text-align: center;">
            <h1 style="color: #F0F4EF; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">ADAKA GLOBAL</h1>
        </div>
        <div style="padding: 40px 20px; background-color: #F0F4EF;">
            <h2 style="font-size: 20px;">Hello {data.get('full_name')},</h2>
            <p style="line-height: 1.6; color: #4a4a4a;">
                Thank you for reaching out to <strong>ADAKA GLOBAL</strong>. We have successfully received your inquiry regarding <em>{data.get('inquiry_type')}</em>.
            </p>
            <p style="line-height: 1.6; color: #4a4a4a;">
                Our team is currently reviewing your requirements. We pride ourselves on operational excellence, and we will get back to you within 24 hours.
            </p>
            <div style="margin-top: 30px; padding: 20px; border-left: 4px solid #0D1821; background: #e5e9e5;">
                <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Reference Inquiry</p>
                <p style="margin: 5px 0 0 0; font-weight: bold;">{data.get('inquiry_type')}</p>
            </div>
        </div>
        <div style="padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p>&copy; 2026 ADAKA GLOBAL INC. All rights reserved.</p>
        </div>
    </div>
    """
    
    msg = Message(
        subject="Your Inquiry - ADAKA GLOBAL",
        recipients=[data.get('email')],
        html=html_body  # Set 'html' instead of 'body'
    )
    return msg

def send_async_email(app, msg):
    with app.app_context():
        print("Attempting to connect to SMTP server...") # <--- ADD THIS
        try:
            mail.send(msg)
            print("Email sent successfully!") # <--- ADD THIS
        except Exception as e:
            print(f"ASYNC MAIL ERROR: {str(e)}")

@leads_bp.route('/api/contact', methods=['POST', 'OPTIONS'])
def post_inquiry():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        
        # 1. Save to Database
        new_inquiry = ContactInquiry(
            full_name=data.get('full_name'),
            email=data.get('email'),
            phone_number=data.get('phone_number'), 
            company=data.get('company'),
            inquiry_type=data.get('inquiry_type'),
            message=data.get('message'),
            equipment_categories=data.get('equipment_categories')
        )
        db.session.add(new_inquiry)
        db.session.commit()
        
        # 2. Prepare Email
        msg = send_appreciation_email(data)
        
        # 3. Fire and Forget: Send email in background
        thr = Thread(target=send_async_email, args=[current_app._get_current_object(), msg])
        thr.start()
        
        return jsonify({'message': 'Inquiry received and email sent'}), 201
        
    except Exception as e:
        print("BACKEND ERROR:", str(e)) 
        return jsonify({'message': str(e)}), 500

# Endpoint for your Admin Leads Dashboard
@leads_bp.route('/api/admin/leads', methods=['GET'])
def get_leads():
    leads = ContactInquiry.query.order_by(ContactInquiry.created_at.desc()).all()
    return jsonify([{
        "id": l.id,
        "date": l.created_at.strftime("%Y-%m-%d"),
        "full_name": l.full_name,
        "email": l.email,           # Add this
        "phone_number": l.phone_number, # Add this
        "company": l.company,       # Add this
        "type": l.inquiry_type,
        "message": l.message
    } for l in leads]), 200

@leads_bp.route('/api/admin/leads/delete/<int:id>', methods=['DELETE'])
def delete_lead(id):
    lead = ContactInquiry.query.get_or_404(id)
    db.session.delete(lead)
    db.session.commit()
    return jsonify({'message': 'Lead deleted'}), 200