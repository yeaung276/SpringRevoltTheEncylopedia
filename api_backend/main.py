from fastapi import FastAPI
import routers.events as Events

app = FastAPI()


app.include_router(Events.router)

@app.get('/')
def hello():
    about = 'This api is wirtten for the website to remember the fallen heros who lost their lives during spring revolution myanmar 2021. "What we can do is to remember our heros and our enemyes."'
    return about

