from pydantic import BaseModel
# from typing import array
from datetime import datetime

class Event(BaseModel):
    title:str
    datetime: datetime
    location: str
    
    