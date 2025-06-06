from datetime import datetime
from bisect import bisect_left, bisect_right, insort
from typing import List, Tuple

class DatetimeEventStore:
    def __init__(self): 
        self._events: List[Tuple[datetime, str]] = []

    def store_event(self, datesEvent: datetime, event: str): 
        insort(self._events, (datesEvent, event))

    def get_events(self, start: datetime, end: datetime) -> List[str]: 
        dates = [datetimeTuple[0] for datetimeTuple in self._events]
        dateStart = bisect_left(dates, start)
        dateEnd = bisect_right(dates, end)
        events = [event for (date,event) in self._events[dateStart:dateEnd]]
        return events