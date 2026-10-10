import { useState } from "react";
import { useEffect } from "react";
import { HabbitForm } from "./components/HabbitForm";
import { HabbitList, type Habbit } from "./components/HabbitList";
import { Header } from "./components/Header";
import { format, isToday } from "date-fns";

const STORAGE_KEY = "habit-tracker-habbits";

export default function App() {
  const [habbits, setHabbits] = useState<Habbit[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as Habbit[] : [];
  });
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habbits));
  }, [habbits]);

  function addHabbit(name: string) {
    setHabbits((current) => [
      ...current,
      { id: crypto.randomUUID(), name, completedDates: [] },
    ]);
  }

  function toggleDate(habbitId: string, date: Date) {
    const dateKey = format(date, "yyyy-MM-dd");
    setHabbits((current) =>
      current.map((habbit) =>
        habbit.id !== habbitId
          ? habbit
          : {
              ...habbit,
              completedDates: habbit.completedDates.includes(dateKey)
                ? habbit.completedDates.filter((completedDate) => completedDate !== dateKey)
                : [...habbit.completedDates, dateKey],
            },
      ),
    );
  }

  function deleteHabbit(habbitId: string) {
    setHabbits((current) => current.filter((habbit) => habbit.id !== habbitId));
  }

  const completedToday = habbits.filter((habbit) =>
    habbit.completedDates.some((date) => isToday(new Date(`${date}T00:00:00`))),
  ).length;

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header
        weekOffset={weekOffset}
        completedToday={completedToday}
        onPreviousWeek={() => setWeekOffset((offset) => offset - 1)}
        onNextWeek={() => setWeekOffset((offset) => offset + 1)}
      />
      <HabbitForm addHabbit={addHabbit} />
      <HabbitList
        habbits={habbits}
        weekOffset={weekOffset}
        onToggleDate={toggleDate}
        onDelete={deleteHabbit}
      />
    </div>
  );
}
