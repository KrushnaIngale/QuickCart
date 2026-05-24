from database.db import SessionLocal

from models.product_model import Product

db = SessionLocal()

products = [

    {
        "title": "Apple Earphones",
        "description": "Noise-cancellation, 40-hour battery",
        "price": 29999,
        "image": "/assets/apple_earphone_image.png",
        "category": "Audio"
    },

    {
        "title": "Bose QuietComfort 45",
        "description": "Noise Cancellation, 24-hour battery",
        "price": 32999,
        "image": "/assets/bose_headphone_image.png",
        "category": "Audio"
    },

    {
        "title": "Samsung Galaxy S23",
        "description": "AMOLED Display, Snapdragon Performance",
        "price": 79999,
        "image": "/assets/samsung_s23phone_image.png",
        "category": "Smartphones"
    },

    {
        "title": "Garmin Venu 2",
        "description": "Fitness Tracking, AMOLED Display",
        "price": 34999,
        "image": "/assets/venu_watch_image.png",
        "category": "Smart Watches"
    },

    {
        "title": "PlayStation 5",
        "description": "Ultra-HD Gaming, 825GB SSD",
        "price": 49999,
        "image": "/assets/playstation_image.png",
        "category": "Gaming"
    },

    {
        "title": "Canon EOS R5",
        "description": "45MP Sensor, 8K Video Recording",
        "price": 389999,
        "image": "/assets/cannon_camera_image.png",
        "category": "Cameras"
    },

    {
        "title": "MacBook Pro 16",
        "description": "M2 Pro Chip, 16GB RAM",
        "price": 249999,
        "image": "/assets/macbook_image.png",
        "category": "Laptops"
    },

    {
        "title": "Sony WF-1000XM5",
        "description": "Hi-Res Audio, Noise Cancellation",
        "price": 29999,
        "image": "/assets/sony_airbuds_image.png",
        "category": "Audio"
    },

    {
        "title": "Samsung 4K Projector",
        "description": "4K Ultra HD, Built-In Speakers",
        "price": 149999,
        "image": "/assets/projector_image.png",
        "category": "Projectors"
    },

    {
        "title": "ASUS ROG Zephyrus G16",
        "description": "Intel i9, RTX 4070",
        "price": 199999,
        "image": "/assets/asus_laptop_image.png",
        "category": "Laptops"
    }
]

for product in products:

    existing_product = db.query(Product).filter(
        Product.title == product["title"]
    ).first()

    if not existing_product:

        new_product = Product(**product)

        db.add(new_product)

db.commit()

print("Products Seeded Successfully")