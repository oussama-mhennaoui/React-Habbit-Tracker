import { Button } from "./Button";
import { addDays, format, startOfWeek } from "date-fns";

type HeaderProps = {
  weekOffset: number;
  completedToday: number;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
};

export function Header({
  weekOffset,
  completedToday,
  onPreviousWeek,
  onNextWeek,
}: HeaderProps) {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const displayStart = addDays(weekStart, weekOffset * 7);
    const displayEnd = addDays(displayStart, 6);

    return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">{completedToday} completed today</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400 text-sm">
          {format(displayStart, "MMM d")} - {format(displayEnd, "MMM d")}
        </span>
        <div className="flex items-center gap-3">
          <Button type="button" variant="secondary" onClick={onPreviousWeek}>Prev</Button>
          <Button type="button" variant="secondary" onClick={onNextWeek}>Next</Button>
        </div>
      </div>
    </header>
)
}