import os
import urllib.parse
import click
import jwt
import datetime
from flask_cors import CORS
import traceback
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask import Flask, request, jsonify,current_app
from extensions import db, mail
from config import Config
from models import  ContactInquiry, User,Asset
from routes.inventory import inventory_bp
from routes.leads import leads_bp
from routes.newsletter import newsletter_bp



app = Flask(__name__)
if os.environ.get('RAILWAY_ENVIRONMENT_NAME') is None:
    load_dotenv()
app.config.from_object(Config)
db_url = os.getenv('DATABASE_URL')

if not db_url:
    raise RuntimeError("DATABASE_URL is not set!")

app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
mail.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
CORS(app, resources={r"/api/*": {"origins": [
        "https://adaka-global.vercel.app" ,"https://adakaglobalinc.com"]}})


app.register_blueprint(inventory_bp)
app.register_blueprint(leads_bp)
app.register_blueprint(newsletter_bp)
# --- Database Configuration ---
# Switching to PostgreSQL as discussed for the 9+ years exp standard
# Replace 'username', 'password', and 'adaka_db' with your local Postgres credentials






@app.cli.command("create-admin")
@click.argument("email")
@click.password_option()
def create_admin(email, password):
    """Creates a new admin user."""
    # We are already inside the app context when running flask commands
    if User.query.filter_by(email=email).first():
        click.echo("Error: User already exists.")
        return

    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    click.echo(f"Admin user {email} created successfully!")
# --- Routes ---
@app.errorhandler(Exception)
def handle_exception(e):
    # This will print the full error details to your Railway logs
    traceback.print_exc() 
    return jsonify({"error": str(e)}), 500

@app.route('/create-admin-debug')
def create_admin_debug():
    from models import User
    admin_email = 'admin@adaka.com'
    if not User.query.filter_by(email=admin_email).first():
        user = User(email=admin_email)
        user.set_password('Adakaofficial100%')
        db.session.add(user)
        db.session.commit()
        return "Admin created!"
    return "Admin already exists."

@app.route('/api/admin/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email', '').lower()
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        # 1. Handle user not found
        if not user:
            return jsonify({'message': 'Invalid credentials'}), 401

        # 2. Handle wrong password
        if not user.check_password(password):
            return jsonify({'message': 'Invalid credentials'}), 401

        # 3. Success
        secret = current_app.config.get('SECRET_KEY')
        token = jwt.encode({
            'user': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, secret, algorithm="HS256")
        
        response = jsonify({'message': 'Login successful'})
        response.set_cookie('admin_token', token, httponly=True, secure=False, samesite='Lax')
        return response, 200
        
    except Exception as e:
        traceback.print_exc() # This will show the actual error in Railway logs
        return jsonify({'message': 'Server Error', 'details': str(e)}), 500




if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)