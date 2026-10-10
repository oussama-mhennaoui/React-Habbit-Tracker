import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "./Button";

type HabbitFormProps = {
    addHabbit: (name: string) => void;
};

export function HabbitForm({ addHabbit }: HabbitFormProps) {

    const [name, setName] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (name.trim() === "") return;
        setName("");
        addHabbit(name.trim());
    }

    
    return (
        <form className="flex gap-2" onSubmit={handleSubmit}>
            <input   
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                placeholder="New habit..."
            />
            <Button type="submit" disabled={name.trim() === ""}>
                Add Habit
            </Button>
        </form>
    )
}
