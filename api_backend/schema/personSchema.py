from pydantic import BaseModel

class PersonRequest(BaseModel):
    name:str = ''
    age:int = 0
    photo:str

class ContentUpdateRequest(BaseModel):
    content:str = ''