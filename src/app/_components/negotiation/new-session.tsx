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

// SECRET: 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

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

