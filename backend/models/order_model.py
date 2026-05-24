from sqlalchemy import (
    Column,
    Integer,
    Float,
    ForeignKey,
    String
)

from database.db import Base
from sqlalchemy.orm import relationship

class Order(Base):

    __tablename__ = "orders"

    id = Column(Integer,primary_key=True,index=True)

    user_id = Column(Integer,ForeignKey("users.id"))

    total_price = Column(Float,nullable=False)

    status = Column(String,default="Pending")

    items = relationship("OrderItem")