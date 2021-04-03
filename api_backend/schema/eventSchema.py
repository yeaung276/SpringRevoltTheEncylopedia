from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Item(BaseModel):
    paragraph: Optional[str]
    title: Optional[str]
    link: Optional[str]

class Paragraph(Item):
    paragraph: str

class Media(Item):
    title: str
    link: str


class Event(BaseModel):
    title:str
    datetime: datetime
    location: str
    tags: List[str] = []
    items: List[Item] = []
    
    
    