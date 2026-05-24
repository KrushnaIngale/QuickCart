from fastapi import (APIRouter,Depends,HTTPException)
from sqlalchemy.orm import Session
from database.dependencies import (get_db,get_current_user)
from models.cart_model import Cart
from models.product_model import Product
from models.user_model import User
from schemas.cart_schema import CartCreate

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)

@router.post("/")
def add_to_cart(
    request: CartCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(
        Product.id == request.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    
    cart_item = db.query(Cart).filter(
        Cart.user_id == current_user.id,
        Cart.product_id == request.product_id
    ).first()

    if cart_item:
        cart_item.quantity += 1
    else:
        cart_item = Cart(
            user_id=current_user.id,
            product_id=request.product_id
        )
        db.add(cart_item)

    db.commit()

    return {
        "message":"Product added to cart"
    }


@router.get("/")
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)

):

    cart_items = db.query(Cart).filter(
        Cart.user_id == current_user.id
    ).all()

    data = []
    for item in cart_items:
        data.append({
            "cart_id": item.id,
            "quantity": item.quantity,
            "product": {
                "id": item.product.id,
                "title": item.product.title,
                "price": item.product.price,
                "image": item.product.image,
                "category": item.product.category
            }
        })

    return data


@router.delete("/{cart_id}")
def remove_from_cart(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cart_item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(cart_item)

    db.commit()

    return {
        "message":"Item removed from cart"
    }


@router.put("/{cart_id}")
def update_cart_quantity(
    cart_id: int,
    action: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()
    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )
    if action == "increase":
        cart_item.quantity += 1
    elif action == "decrease":
        if cart_item.quantity > 1:
            cart_item.quantity -= 1

    db.commit()

    db.refresh(cart_item)

    return {
        "message":"Quantity updated"
    }