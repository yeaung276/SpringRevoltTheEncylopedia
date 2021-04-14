from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from schema.contentSchema import Content

class Item(BaseModel):
    paragraph: Optional[str]
    title: Optional[str]
    link: Optional[str]

class Paragraph(Item):
    paragraph: str

class Media(Item):
    title: str
    link: str

class Date(BaseModel):
    datetime: datetime
    class Config():
        orm_mode = True

class Event(BaseModel):
    title:str
    title_img: str
    datetime: datetime
    location: str
    tags: List[int] = []
    

class eventGeneral(BaseModel):
    id: int
    title: str
    title_img: str
    datetime: Date
    class Config():
        orm_mode = True

class Tag(BaseModel):
    name: str
    class Config():
        orm_mode=True

class TagMapper(BaseModel):
    tag:Tag
    class Config():
        orm_mode=True

class eventDetail(eventGeneral):
    tags: List[TagMapper]
    contents: List[Content]

class eventTags(BaseModel):
    tags: List[TagMapper]
    class Config():
        orm_mode = True

def toEventModel(event:Event,id:int):
    return {
        'title': event.title,
        'title_img': event.title_img,
        'datetime_id': id,
        'location': event.location
    }
    
    
    