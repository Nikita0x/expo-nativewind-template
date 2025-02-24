import { create } from "zustand";
import { persist } from "zustand/middleware";

enum RepeatOptions {
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    MONTHLY = "MONTHLY"
}

interface EventDate {
    date: string;
    time: string;
}

interface Event {
    name: string;
    startDate: EventDate;
    endDate: EventDate;
    repeat: RepeatOptions;
}

type EventStore = {
    eventStore: Event;
    setEventStore: (event: Partial<Event>) => void;
};

export const useEventStore = create<EventStore>()(
    persist(
        (set) => ({
            eventStore: {
                name: "",
                startDate: { date: "", time: "" },
                endDate: { date: "", time: "" },
                repeat: RepeatOptions.WEEKLY
            },
            setEventStore: (newEvent) =>
                set((state) => ({
                    eventStore: { ...state.eventStore, ...newEvent }
                }))
        }),
        {
            name: "event-storage", 
        }
    )
);
