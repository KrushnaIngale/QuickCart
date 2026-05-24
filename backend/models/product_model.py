from sqlalchemy import (Column,Integer,String,Text,Float)

from database.db import Base

class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True,index=True)

    title = Column(String,nullable=False)

    description = Column(Text,nullable=False)

    price = Column(Float,nullable=False)

    image = Column(String,nullable=False)

    category = Column(String,nullable=False)