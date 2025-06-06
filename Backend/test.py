import datetime
import random
from EventStore import DatetimeEventStore

store = DatetimeEventStore()

start = datetime.datetime(2000, 1, 1).timestamp()
end = datetime.datetime(2020, 1, 1).timestamp()

for i in range(10000):
    dt = datetime.datetime.fromtimestamp(
        random.randint(int(start), int(end))
    )
    store.store_event(at=dt, event="Event number %d" %i)

print("Événements en janvier 2018 :")

for event in store.get_events(
    start=datetime.datetime(2018, 1, 1),
    end=datetime.datetime(2018, 2, 1)
):
    print(event)
