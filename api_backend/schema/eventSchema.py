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
    title_img: str
    datetime: datetime
    location: str
    tags: List[str] = []
    # items: List[Item] = []

class eventGeneral(BaseModel):
    id: int
    title: str
    title_img: str
    datetime: datetime
    class Config():
        orm_mode = True

def toEventModel(event:Event):
    return {
        'title': event.title,
        'title_img': event.title_img,
        'datetime': event.datetime,
        'location': event.location
    }
    
    
    