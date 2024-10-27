"use client";

import { GanttChart } from "lucide-react";
import { useState, useTransition } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"

const qanda: { q: string, a: string }[] = [];

export function SessionDialog() {
    const [userAnswer, setUserAnswer] = useState("");
    const [question, setQuestion] = useState("What is the session about?");
    const [loading, startTransition] = useTransition();

    const handleCreate = () => {
        startTransition(async () => {
            try {
                qanda.push({q: question, a: userAnswer });
                console.log(JSON.stringify(qanda));
                setQuestion("next");
                setUserAnswer("");
            } catch (error) {
                console.error("Failed to generate the next question", error);
            }
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full" variant="outline">Add new session</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>

                <AlertDialogHeader>
                    <AlertDialogTitle>Q&A</AlertDialogTitle>

                    <AlertDialogDescription className="flex flex-col gap-3">
                        <span>{question}</span>
                        <Textarea
                            onChange={(e) => setUserAnswer(e.target.value)}
                            value={userAnswer}
                            disabled={loading}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <Button onClick={handleCreate} disabled={loading || !userAnswer}>
                        {loading ? "Loading..." : "Next"}
                    </Button>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}

