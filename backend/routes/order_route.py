from fastapi import (APIRouter,Depends,HTTPException)
from sqlalchemy.orm import Session
from database.dependencies import (get_db,get_current_user)
from models.user_model import User
from models.cart_model import Cart
from models.order_model import Order
from models.order_item_model import OrderItem

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/checkout")
def checkout(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_items = db.query(Cart).filter(
        Cart.user_id == current_user.id
    ).all()

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )
    
    total_price = 0
    for item in cart_items:
        total_price += (
            item.product.price * item.quantity
        )

    new_order = Order(
        user_id=current_user.id,
        total_price=total_price
    )
    db.add(new_order)

    db.commit()

    db.refresh(new_order)
    for item in cart_items:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product.id,
            quantity=item.quantity,
            price=item.product.price
        )
        db.add(order_item)
    for item in cart_items:
        db.delete(item)
    db.commit()
    return {
        "message":"Order placed successfully"
    }


@router.get("/")
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)

):
    orders = db.query(Order).filter(
        Order.user_id == current_user.id
    ).all()
    data = []
    for order in orders:
        order_data = {
            "order_id": order.id,
            "total_price": order.total_price,
            "status": order.status,
            "items": []
        }
        for item in order.items:
            order_data["items"].append({
                "product_title":
                item.product.title,
                "product_image":
                item.product.image,
                "quantity":
                item.quantity,
                "price":
                item.price
            })
        data.append(order_data)
    return data