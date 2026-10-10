import { Button } from "./Button";
import { eachDayOfInterval, endOfWeek, format, isFuture, startOfWeek } from "date-fns";

export type Habbit = {
  id: string;
  name: string;
  completedDates: string[];
};

type HabbitListProps = {
  habbits: Habbit[];
  weekOffset: number;
  onToggleDate: (habbitId: string, date: Date) => void;
  onDelete: (habbitId: string) => void;
};

type HabbitItemProps = {
  habbit: Habbit;
};

export function HabbitList({
  habbits,
  weekOffset,
  onToggleDate,
  onDelete,
}: HabbitListProps) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  weekStart.setDate(weekStart.getDate() + weekOffset * 7);
  const visibleDates = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 1 }),
  });

  if (habbits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No habbits yet, add one to get started!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habbits.map((habbit) => {
        return <HabbitItem key={habbit.id} habbit={habbit} />;
      })}
    </div>
  );


  function HabbitItem({ habbit }: HabbitItemProps) {
    return (
      <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <span className="font-medium">{habbit.name}</span>
            <span className="text-sm text-amber-400">
              {habbits.length > 0 ? habbit.completedDates.length : 0}
            </span>
          </div>
          <Button
            type="button"
            variant="ghost-destructive"
            onClick={() => onDelete(habbit.id)}
          >
            Delete
          </Button>
        </div>
        <div className="flex gap-1.5">
          {visibleDates.map((date) => (
            (() => {
              const isCompleted = habbit.completedDates.includes(
                format(date, "yyyy-MM-dd"),
              );
              const isDisabled = isFuture(date);

              return (
                <Button
                  key={date.toISOString()}
                  type="button"
                  aria-pressed={isCompleted}
                  className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg border text-xs ${
                    isCompleted
                      ? "border-emerald-300/50 bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.45)] hover:bg-emerald-400"
                      : "border-zinc-700 bg-zinc-700/60 text-zinc-400 hover:border-violet-400/60 hover:bg-zinc-700 hover:text-zinc-200"
                  } ${isDisabled ? "cursor-not-allowed opacity-40" : ""}`}
                  disabled={isDisabled}
                  onClick={() => onToggleDate(habbit.id, date)}
                >
              <span className="font-medium">{format(date, "EEE")}</span>
              <span>{format(date, "d")}</span>
                </Button>
              );
            })()
          ))}
        </div>
      </div>
    );
  }
}
