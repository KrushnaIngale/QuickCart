from fastapi import APIRouter

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

from sqlalchemy.orm import Session
from fastapi import Depends
from database.dependencies import (get_db,get_current_user)
from schemas.product_schema import ProductCreate
from models.product_model import Product
from models.user_model import User

@router.post("/")
def create_product(
    request: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_product = Product(
        title=request.title,
        description=request.description,
        price=request.price,
        image=request.image,
        category=request.category
    )

    db.add(new_product)

    db.commit()

    db.refresh(new_product)

    return {
        "message":"Product created successfully"
    }


@router.get("/")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

from fastapi import HTTPException

@router.get("/{product_id}")
def get_single_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    return product