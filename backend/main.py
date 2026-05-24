from fastapi import FastAPI
from database.db import engine,Base
from models.user_model import User
from routes.auth_route import router as auth_router

# products api design
from models.product_model import Product
from routes.product_route import (router as product_router)

from fastapi.middleware.cors import CORSMiddleware

from models.cart_model import Cart
from routes.cart_route import (router as cart_router)

from models.order_model import Order
from models.order_item_model import OrderItem
from routes.order_route import (router as order_router)


app = FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]

)

User.metadata.create_all(bind=engine)

app.include_router(auth_router)

app.include_router(product_router)

app.include_router(cart_router)

app.include_router(order_router)

@app.get("/")
def home():
    return {"message":"SmartCart API"}