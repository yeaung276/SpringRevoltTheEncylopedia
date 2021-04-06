from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Timeline(BaseModel):
    title: str
    datetime: datetime
    timeline_type: int
    create_event: bool
    event_id: Optional[int]