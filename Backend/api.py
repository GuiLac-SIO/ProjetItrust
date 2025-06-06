from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from EventStore import DatetimeEventStore

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_methods=["*"], 
)
store = DatetimeEventStore()

class StoreEvent(BaseModel):
    datesEvent: datetime
    event: str

class GetEvents(BaseModel):
    start: datetime
    end: datetime

@app.post("/events")
def store_event(data: StoreEvent):
    store.store_event(datesEvent=data.datesEvent, event=data.event)
    return {"message": "Event enregistré."}

@app.get("/events")
def get_events(start: datetime, end: datetime) -> List[str]:
    return store.get_events(start=start, end=end)
